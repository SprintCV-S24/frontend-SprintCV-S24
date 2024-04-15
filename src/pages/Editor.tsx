import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { SkillItem } from "@/components/resume-items/skill-item";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactSortable } from "react-sortablejs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { DownloadIcon } from "@radix-ui/react-icons";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LatexImage } from "@/components/Latex";
import { ResumeName } from "@/components/ResumeName";
import { ResumeSaved } from "@/components/ResumeSaved";
import { PageCount } from "@/components/PageCount";
import { BaseItem, ResumesType } from "@/api/models/interfaces";
import { useGetAllItems, useGetResume } from "@/hooks/queries";
import { generateLatex } from "@/latexUtils/latexString";
import { useUpdateResume } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { createCustomSetItemsInResume } from "@/hooks/mutations";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { generateFullResume } from "@/latexUtils/latexString";
import { useDeleteItem } from "@/hooks/mutations";
import ECHelper from "@/components/ec-helper";

const Editor: React.FC = () => {
  const { currentUser } = useAuth();
  const [resumeName, setResumeName] = useState<string | undefined>(undefined);
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);

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

  const [selected, setSelected] = useState(false);

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
      // TODO: This is likely unnecessary. Don't have time to check but can probably be removed later.
      if (itemsInResume) {
        itemsInResume.forEach((item) => {
          initialEditOpenMap[item.id] = false;
        });
      }
      return initialEditOpenMap;
    },
  );

  const [loadingMap, setLoadingMap] = useState<{ [key: string]: boolean }>(
    () => {
      const intialLoadingmap: { [key: string]: boolean } = {};
      // Initialize all items' edit state to false
      if (itemsInBank) {
        itemsInBank.forEach((item) => {
          intialLoadingmap[item.id] = false;
        });
      }
      if (itemsInResume) {
        itemsInResume.forEach((item) => {
          intialLoadingmap[item.id] = false;
        });
      }
      return intialLoadingmap;
    },
  );

  useEffect(() => {
    setResumeName(resume?.itemName);
  }, [resume]);

  const handleClearResume = () => {
    if (itemsInBank && itemsInResume && id && resume) {
      const combinedItems: Array<BaseItem & { id: string }> = [
        ...itemsInBank,
        ...itemsInResume,
      ];

      const clearResumeHelper = createCustomSetItemsInResume(
        id,
        mutate,
        setItemsInResume,
        () => {
          setIsSaved(false);
        },
        () => {
          setIsSaved(true);
        },
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

  function isSubstringInFields(item: any, searchString: string): boolean {
    const lowerCaseString = searchString.toLowerCase();
    const fields = Object.values(item);
    for (const field of fields) {
      if (typeof field === "string" && field != "item.id" && field.toLowerCase().includes(lowerCaseString)) {
        console.log(field.toLowerCase());
        return true;
      }
      if (Array.isArray(field)) {
        for (const item of field) {
          if (typeof item === "string" && item != "item.id" && item.toLowerCase().includes(lowerCaseString)) {
            console.log(item.toLowerCase())
            return true;
          }
        }
      }
    }
    return false;
  }

  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter items in the bank based on the search query
  const filteredItemsInBank = itemsInBank?.filter(item => isSubstringInFields(item, searchQuery));
  
  // Handle search query change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toString());
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
      } catch (err) {
        console.log(err);
      }
    };

    void fetchFact();
  }, [currentUser, storedToken]);

  return (
    <>
      <div className="flex-col">
        <div className="flex w-full h-[3rem] items-center px-4 relative shadow-xl">
          <MainNav className="mx-6" />
          <Button variant="ghost">
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-row bg-[#E7ECEF] h-screen overflow-y-auto">
        <div className="w-1/2 p-4 flex-col">
          <Card className="w-full h-12 white mb-4 flex items-center justify-between p-2 min-w-64">
              <DropdownMenu
                open={dropdownIsOpen}
                onOpenChange={setDropdownIsOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    disabled={exceedsMaximumItems()}
                  >
                    <PlusIcon className="mr-2"></PlusIcon>
                    Add Resume Item
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel className="text-center">
                    Item Type
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <HeadingItem
                    setDropdownIsOpen={setDropdownIsOpen}
                  ></HeadingItem>
                  <DropdownMenuSeparator />
                  <SubheadingItem
                    setDropdownIsOpen={setDropdownIsOpen}
                  ></SubheadingItem>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <EducationItem
                    setDropdownIsOpen={setDropdownIsOpen}
                  ></EducationItem>
                  <DropdownMenuSeparator />
                  <ExperienceItem
                    setDropdownIsOpen={setDropdownIsOpen}
                  ></ExperienceItem>
                  <DropdownMenuSeparator />
                  <ExtracurricularItem
                    setDropdownIsOpen={setDropdownIsOpen}
                  ></ExtracurricularItem>
                  <DropdownMenuSeparator />
                  <ProjectItem
                    setDropdownIsOpen={setDropdownIsOpen}
                  ></ProjectItem>
                  <SkillItem setDropdownIsOpen={setDropdownIsOpen}></SkillItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                  className="w-[1/2] center"
                  placeholder="Search Items..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
          </Card>
          <ScrollArea className="h-[91%] w-full rounded-md mt-4 mb-4 border bg-white shadow-xl">
            <div className="p-4 w-full h-full">
              <div className="flex justify-between">
                <h4 className="mb-4 text-sm flex-none font-medium leading-none mr-4">
                  Resume Items
                </h4>
              </div>
              <Separator className="mb-2"></Separator>
              {itemsInBank && (
                <ReactSortable
                  animation={150}
                  list={itemsInBank}
                  setList={setItemsInBank}
                  group="ResumeItems"
                  className="h-[500px] w-full mb-2"
                >
                  {filteredItemsInBank &&
                    filteredItemsInBank.map((item) => (
                      <Card
                        className="w-full p-2 mb-2 bg-grey border border-grey flex flex-col items-center justify-between"
                        key={item._id}
                      >
                        <div className="w-full flex justify-between items-center p-2 mb-2">
                          {<p className="text-sm">{item.itemName}</p>}
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
                              >
                                Delete Item
                              </Button>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="flex w-full h-full">
                          <div
                            className={
                              loadingMap[item._id]
                                ? "hidden"
                                : "pt-1 pb-1 bg-white border border-gray"
                            }
                          >
                            <LatexImage
                              onRenderStart={() =>
                                setLoadingMap((prevState: any) => ({
                                  ...prevState,
                                  [item.id]: true,
                                }))
                              }
                              onRenderEnd={() =>
                                setLoadingMap((prevState: any) => ({
                                  ...prevState,
                                  [item.id]: false,
                                }))
                              }
                              latexCode={generateLatex(item)}
                              itemId={item._id}
                            ></LatexImage>
                          </div>
                          <Skeleton
                            className={
                              loadingMap[item._id]
                                ? "w-full h-[40px] text-center"
                                : "hidden"
                            }
                          >
                            Loading Document...
                          </Skeleton>
                        </div>
                      </Card>
                    ))}
                </ReactSortable>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="w-[calc(50%-4rem)] ml-8 mt-4">
          <Card className="w-full h-12 white mb-4 flex items-center justify-between p-2 min-w-64">
            <ResumeName
              token={storedToken}
              resumeId={id as string}
              resumeName={resumeName}
              setResumeName={setResumeName}
              setSaving={() => {
                setIsSaved(false);
              }}
              setSaved={() => {
                setIsSaved(true);
              }}
            ></ResumeName>
            <ResumeSaved isSaved={isSaved}></ResumeSaved>
            <Button
              className="text-red-500 font-bold px-[.5rem] mx-[.5rem]"
              variant="ghost"
              onClick={handleClearResume}
            >
              Clear
            </Button>
            <PageCount items={itemsInResume}></PageCount>
						<Button
							className={"px-[.5rem] mx-[.5rem]"}
              variant="ghost"
              disabled={!isResumeValid()}
              onClick={() => {
                generatePdfAndOpen(itemsInResume);
              }}
            >
              <DownloadIcon stroke="#394c74" strokeWidth="1"></DownloadIcon>
            </Button>
            <PageCount items={itemsInResume}></PageCount>
          </Card>
          <div className="bg-white h-[90%] w-full min-w-6 shadow-xl">
            {itemsInResume && id && (
              <ReactSortable
                animation={150}
                list={itemsInResume}
                setList={createCustomSetItemsInResume(
                  id,
                  mutate,
                  setItemsInResume,
                  () => {
                    setIsSaved(false);
                  },
                  () => {
                    setIsSaved(true);
                  },
                )}
                group="ResumeItems"
                className="h-full w-full bg-white"
              >
                {itemsInResume &&
                  itemsInResume.map((item) => (
                    <div className="w-full" key={item._id}>
                      <div className={loadingMap[item._id] ? "hidden" : ""}>
                        <LatexImage
                          onRenderStart={() =>
                            setLoadingMap((prevState: any) => ({
                              ...prevState,
                              [item.id]: true,
                            }))
                          }
                          onRenderEnd={() =>
                            setLoadingMap((prevState: any) => ({
                              ...prevState,
                              [item.id]: false,
                            }))
                          }
                          latexCode={generateLatex(item)}
                          itemId={item._id}
                        ></LatexImage>
                      </div>
                      <Skeleton
                        className={
                          loadingMap[item._id]
                            ? "w-full h-[40px] text-center"
                            : "hidden"
                        }
                      >
                        Loading Document...
                      </Skeleton>
                    </div>
                  ))}
              </ReactSortable>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
