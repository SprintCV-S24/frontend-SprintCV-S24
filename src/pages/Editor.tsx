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
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactSortable } from "react-sortablejs";
import { Skeleton } from "@/components/ui/skeleton";
import { FileTextIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LatexImage } from "@/components/Latex";
import { BaseItem } from "@/api/models/interfaces";
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


const Editor: React.FC = () => {
  const { currentUser } = useAuth();
  const [isPdfRendering, setIsPdfRendering] = useState(false);
  const [dummy, setDummy] = useState(false);
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

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

  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  const handleItemDeletion = (item: BaseItem, itemId: string, token: string) => {
    // Calls a generalization of delete that is type agnostic.
    deleteItem(item, itemId, token);

    // Update if necessary
    if (itemsInBank) {
      const updatedItemsInBank = itemsInBank.filter(item => item._id !== itemId); // Add this for item removal 
      setItemsInBank(updatedItemsInBank);
    }
  };


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

      console.log("Clearing Resume");
      console.log(itemsInBank);
      console.log(itemsInResume);
    }
  };

  useEffect(() => {
    // TODO: Remove debugging logging.
    console.log(id);
    console.log(resume);
    console.log(allItems);

    if (id != null && allItems != null) {
      console.log("In loop");
      // this means no resume had that id
      if (resume == null) {
        // TODO: home page needs to check for and display messages like these
        console.log("HERE");
      } else {
        console.log("itemids:", resume.itemIds);

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

        // TODO: Remove logging for debugging
        console.log("bank items:", bankResult.bankItems);
        console.log("resume items:", resumeResult.resumeItems);
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

  // TODO: Make this type safe, make some other changes.
  return (
    <>
      <div className="md:hidden"></div>
      <div className="flex-col">
        <div className="flex w-full h-16 items-center px-4 relative shadow-xl">
          <Button className="absolute right-4 top-4" variant="ghost">
            <Link to="/profile">Profile</Link>
          </Button>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4"></div>
        </div>
      </div>
      <div className="flex flex-row bg-[#E7ECEF] h-[1000px]">
        <div className="w-1/2 p-4 flex-col">
          <Card className="h-12 ">
            <div className="flex items-center justify-between">
              <DropdownMenu
                open={dropdownIsOpen}
                onOpenChange={setDropdownIsOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button className="mt-1 ml-1" variant="outline">
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
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                className="mt-1 mr-1 text-red-500 font-bold"
                variant="outline"
                onClick={handleClearResume}
              >
                Clear Resume
              </Button>
            </div>
          </Card>
          <ScrollArea className="h-[600px] w-full rounded-md mt-4 mb-4 border bg-white shadow-md">
            <div className="p-4 w-full h-full">
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
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <DotsVerticalIcon></DotsVerticalIcon>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Clone Item</DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-500 font-bold"
                              onClick={() => handleItemDeletion(item, item._id, storedToken!)}
                            >
                              Delete Item
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </Card>
                    ))}
                </ReactSortable>
              )}
            </div>
          </ScrollArea>
        </div>
        <div className="w-[calc(50%-4rem)] bg-white ml-8 mt-4">
          {isPdfRendering && (
            <Skeleton className="h-[663px] w-[600px] ml-6 rounded-xl" />
          )}{" "}
          {itemsInResume && id && (
            <ReactSortable
              animation={150}
              list={itemsInResume}
              setList={createCustomSetItemsInBank(id, mutate, setItemsInResume)}
              group="ResumeItems"
              className="h-full w-full bg-white"
            >
              {itemsInResume &&
                itemsInResume.map((item) => (
                  <div className="w-full" key={item._id}>
                    <LatexImage
                      onRenderStart={() => setDummy(dummy)}
                      onRenderEnd={() => setDummy(dummy)}
                      latexCode={generateLatex(item)}
                    ></LatexImage>
                  </div>
                ))}
            </ReactSortable>
          )}
        </div>
      </div>
    </>
  );
};

export default Editor;
