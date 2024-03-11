import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EducationItem } from "@/components/resume-items/education-item";
import { ExperienceItem } from "@/components/resume-items/experience-item";
import { ExtracurricularItem } from "@/components/resume-items/activity";
import { HeadingItem } from "@/components/resume-items/heading-item";
import { SubheadingItem } from "@/components/resume-items/subheading-item";
import { ProjectItem } from "@/components/resume-items/project-item";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadIcon } from "@radix-ui/react-icons";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeItem } from "types";
import HeadingScrollItem from "../components/scrollarea-items/heading-scroll";
import { LatexImage } from "@/components/Latex";
import { BaseItem, ResumesType } from "@/api/models/interfaces";
import { useGetAllItems, useGetResume } from "@/hooks/queries";
import { generateLatex } from "@/latexUtils/latexString";
import { useUpdateResume } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { createCustomSetItemsInBank } from "@/hooks/mutations";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { deleteItem } from "@/api/resumeItemInterface";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { generateFullResume } from "@/latexUtils/latexString";
import { useDeleteItem } from "@/hooks/mutations";

const Editor: React.FC = () => {
  const [fact, setFact] = useState<string>("");
  const { currentUser } = useAuth();
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, isSuccess } = useGetAllItems(storedToken);

  const [itemsInBank, setItemsInBank] = useState<
    Array<BaseItem & { id: string }> | undefined
  >(undefined);

  const [itemsInResume, setItemsInResume] = useState<
    Array<BaseItem & { id: string }> | undefined
  >(undefined);

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: allItems,
    isLoading: allItemsIsLoading,
    isError: allItemsIsError,
    isSuccess: allItemsIsSuccess,
  } = useGetAllItems(storedToken);

  const {
    data: resume,
    isLoading: resumeIsLoading,
    isError: resumeIsError,
    isSuccess: resumeIsSuccess,
    error: resumeError,
  } = useGetResume(storedToken, id);

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useUpdateResume(
    queryClient,
    storedToken,
  );

  const {
    mutate: deleteItem,
    isPending: deleteItemPending,
    isError: deleteItemError,
  } = useDeleteItem(queryClient, storedToken);

  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const [editOpenMap, setEditOpenMap] = useState<{ [key: string]: boolean }>(
    () => {
      const initialEditOpenMap: { [key: string]: boolean } = {};
      // Initialize all items' edit state to false
      if (itemsInBank) {
        itemsInBank.forEach((item) => {
          initialEditOpenMap[item.id] = false;
        });
      }
      if (itemsInResume) {
        itemsInResume.forEach((item) => {
          initialEditOpenMap[item.id] = false;
        });
      }
      return initialEditOpenMap;
    },
  );

  const handleClearResume = () => {
    if (itemsInBank && itemsInResume && id && resume) {
      const combinedItems: Array<BaseItem & { id: string }> = [
        ...itemsInBank,
        ...itemsInResume,
      ];

      const clearResumeHelper = createCustomSetItemsInBank(
        id,
        mutate,
        setItemsInResume,
      );

      clearResumeHelper([]);
      setItemsInBank(combinedItems);
    }
  };

  // Used to disable add resume item button if too many bullets are present.
  const exceedsMaximumItems = () => {
    if (allItems && allItems.length > 50) {
      return true;
    }
    return false;
  };

  // Used to make sure resume has some items in it before downloading
  const isResumeValid = () => {
    if (itemsInResume != undefined) {
      return itemsInResume.length > 0;
    }
    return false;
  };

  const generatePdfAndOpen = async (items: BaseItem[] | undefined) => {
    if (items && resume) {
      const latexString = generateFullResume(items);
      const blob = await generatePdfBlobSafe(latexString);
      const url = URL.createObjectURL(blob);
      // window.open(url, "_blank");
      let fileLink = document.createElement("a");
      fileLink.href = url;
      fileLink.download = resume.itemName;
      fileLink.click();
    }
  };

  useEffect(() => {
    if (id != null && allItems != null) {
      // this means no resume had that id
      if (resume == null) {
        // TODO: home page needs to check for and display messages like these
      } else {
        // This extracts the resumeItems in the specific order provided
        const resumeResult = resume.itemIds.reduce(
          (accumulator, itemId) => {
            const item = allItems.find((item) => item._id === itemId);
            if (item) {
              accumulator.resumeItems.push({ ...item, id: item._id });
            } else {
              console.log(`Item with ID ${itemId} not found in allItems.`);
            }
            return accumulator;
          },
          { resumeItems: [] } as {
            resumeItems: Array<BaseItem & { id: string }>;
          },
        );

        // This extracts the rest of the items, represented as bankItems
        const bankResult = allItems.reduce(
          (accumulator, item) => {
            if (!resume.itemIds.includes(item._id)) {
              accumulator.bankItems.push({ ...item, id: item._id });
            }
            return accumulator;
          },
          { bankItems: [] } as { bankItems: Array<BaseItem & { id: string }> },
        );

        console.log(itemsInBank);
        // Sets the items in the respective fields
        setItemsInBank(bankResult.bankItems);
        setItemsInResume(resumeResult.resumeItems);
      }
    }
  }, [id, allItems, resume]);

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const token = await currentUser?.getIdToken();
        setStoredToken(token);

        const payloadHeader = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        // below, the /api is replaced with the server url defined in vite.config.ts
        // so, if the server is defined as "localhost:3001" in that file,
        // the fetch url will be "localhost:3001/example"
        //const res = await fetch("/api/example", payloadHeader);
        // setFact(await res.text());
      } catch (err) {
        console.log(err);
      }
    };

    void fetchFact();
  }, [currentUser, storedToken]);

  // TODO: Make this type safe, make some other changes.
  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 shadow-xl">
            <Button
              className="absolute right-2 top-2 md:right-4 md:top-4"
              variant="ghost"
            >
              <Link to="/profile">Profile</Link>
            </Button>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-row bg-[#E7ECEF] h-[1000px]">
        <div className="w-1/2 p-4 flex-col">
          <Card className="h-12">
            <div className="flex items-center justify-between">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button className="mt-1 ml-1" variant="outline">
                    Add Resume Item
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="text-center">
                    Item Type
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <HeadingItem></HeadingItem>
                  <DropdownMenuSeparator />
                  <SubheadingItem></SubheadingItem>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <EducationItem></EducationItem>
                  <DropdownMenuSeparator />
                  <ExperienceItem></ExperienceItem>
                  <DropdownMenuSeparator />
                  <ExtracurricularItem></ExtracurricularItem>
                  <DropdownMenuSeparator />
                  <ProjectItem></ProjectItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </Card>
          <ScrollArea className="h-[600px] w-full rounded-md mt-4 border bg-white shadow-md">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Resume Items
              </h4>
              <Separator className="mb-2"></Separator>
              {itemsInBank && (
                <ReactSortable
                  animation={150}
                  list={itemsInBank}
                  setList={setItemsInBank}
                  group="ResumeItems"
                  className="h-[500px] w-full mb-2"
                >
                  {itemsInBank &&
                    itemsInBank.map((item) => (
                      <Card
                        className="w-full p-1 mb-2 bg-grey border border-grey flex items-center justify-between"
                        key={item._id}
                      >
                        <div>
                          <LatexImage
                            onRenderStart={() => setDummy(dummy)}
                            onRenderEnd={() => setDummy(dummy)}
                            latexCode={generateLatex(item)}
                          ></LatexImage>
                        </div>
                        <DropdownMenu
                          open={editOpenMap[item.id]}
                          onOpenChange={(isOpen) =>
                            setEditOpenMap((prevState) => ({
                              ...prevState,
                              [item.id]: isOpen,
                            }))
                          }
                        >
                          <DropdownMenuTrigger>
                            <DotsVerticalIcon></DotsVerticalIcon>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <ECHelper
                              object={item}
                              setDropdownIsOpen={(isOpen) =>
                                setEditOpenMap((prevState: any) => ({
                                  ...prevState,
                                  [item.id]: isOpen,
                                }))
                              }
                              itemId={item.id}
                            />
                            <Button
                              className="text-red-500 font-bold"
                              variant="ghost"
                              onClick={(e) => {
                                deleteItem({
                                  itemType: item.type,
                                  itemId: item._id,
                                });
                              }}
                            >Delete Item</Button>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Card>
                    ))}
                </ReactSortable>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="w-1/2 p-4">
          {isPdfRendering && (
            <Skeleton className="h-[663px] w-[600px] ml-6 rounded-xl" />
          )}{" "}
          <div className="flex items-center justify-center">
            <LatexImage
              onRenderStart={() => setIsPdfRendering(true)}
              onRenderEnd={() => setIsPdfRendering(false)}
              latexCode={testLatex2}
            ></LatexImage>
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
