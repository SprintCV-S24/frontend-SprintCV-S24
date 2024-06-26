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
import Filter from "@/assets/filter.png";
import showErrorToast from "@/components/resume-items/ErrorToast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LatexImage } from "@/components/Latex";
import { ResumeName } from "@/components/ResumeName";
import { ResumeSaved } from "@/components/ResumeSaved";
import { PageCount } from "@/components/PageCount";
import { BaseItem, ResumesType } from "@/api/models/interfaces";
import { useGetAllItems, useGetResume } from "@/hooks/queries";
import {
  generateLatexGeneric,
  generateFullResumeGeneric,
} from "@/latexUtils/genericLatexString";
import { useUpdateResume } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { createCustomSetItemsInResume } from "@/hooks/mutations";
import { generatePdfBlobSafe } from "@/latexUtils/latexUtils";
import { useDeleteItem } from "@/hooks/mutations";
import ECHelper from "@/components/ec-helper";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import ResumeItemTypeDropdown from "@/components/ResumeItemDropdown";
import NewItemDropdown from "@/components/NewItemDropdown";
import { templates } from "@/api/models/templates";

const Editor: React.FC = () => {
  const { currentUser } = useAuth();
  const [resumeName, setResumeName] = useState<string | undefined>(undefined);
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const [isSaved, setIsSaved] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const [typeDropdown, setTypeDropdown] = useState<boolean>(false);
  const [downloadDropdownIsOpen, setDownloadDropdownIsOpen] =
    useState<boolean>(false);

  const [selectedItemType, setSelectedItemType] =
    useState<resumeItemTypes | null>(null);

  const [itemsInBank, setItemsInBank] = useState<
    Array<BaseItem & { id: string }> | undefined
  >(undefined);

  const [itemsInResume, setItemsInResume] = useState<
    Array<BaseItem & { id: string }> | undefined
  >(undefined);

  const [templateDropdownIsOpen, setTemplateDropdownIsOpen] =
    useState<boolean>(false);

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
  // const exceedsMaximumItems = () => {
  //   if (allItems && allItems.length > 50) {
  //     return true;
  //   }
  //   return false;
  // };

  // Used to make sure resume has some items in it before downloading
  const isResumeValid = () => {
    if (itemsInResume != undefined) {
      return itemsInResume.length > 0;
    }
    return false;
  };

  const generatePdfAndOpen = async (items: BaseItem[] | undefined) => {
    if (items && resume) {
      const latexString = generateFullResumeGeneric(items, resume.templateId);
      if (latexString != null) {
        const blob = await generatePdfBlobSafe(latexString);
        const url = URL.createObjectURL(blob);
        // window.open(url, "_blank");
        let fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = resume.itemName;
        fileLink.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const generateTexAndOpen = async (items: BaseItem[] | undefined) => {
    if (items && resume) {
      const filename = `${resume.itemName}.tex`;
      const latexString = generateFullResumeGeneric(items, resume.templateId);
      if (latexString != null) {
        const blob = new Blob([latexString], {
          type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        // window.open(url, "_blank");
        let fileLink = document.createElement("a");
        fileLink.href = url;
        fileLink.download = filename;
        fileLink.click();
        URL.revokeObjectURL(url);
      }
    }
  };

  const isSubstringInFields = (item: any, searchString: string): boolean => {
    const lowerCaseString = searchString.toLowerCase();
    const fields = Object.values(item);
    for (const field of fields) {
      if (
        typeof field === "string" &&
        field != "item.id" &&
        field.toLowerCase().includes(lowerCaseString)
      ) {
        return true;
      }
      if (Array.isArray(field)) {
        for (const item of field) {
          if (
            typeof item === "string" &&
            item != "item.id" &&
            item.toLowerCase().includes(lowerCaseString)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const filterByItemType = (item: BaseItem): boolean => {
    if (selectedItemType === null) return true; // If no filter selected, return true for all items
    return item.type == selectedItemType; // Customize the condition based on your item type property
  };

  // Filter items in the bank based on the search query
  const filteredItemsInBank = itemsInBank?.filter(
    (item) =>
      isSubstringInFields(item, searchQuery) && // Filter by search query
      filterByItemType(item), // Filter by item type
  );

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

  const handleTemplateUpdate = (templateId: templates) => {
    if (templateId != null && resume != null) {
      mutate({ updatedFields: { templateId }, resumeId: resume._id });
    }
  };

  return (
    <>
      <div className="flex-col">
        <div className="flex w-full h-[3rem] items-center px-4 relative">
          <MainNav className="mx-6" />
          <Button className="mr-4" variant="secondary">
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex items-center bg-white p-1">
        <Card className="w-full mr-3 ml-3 bg-[#e7ecef] flex flex-col lg:flex-row p-1">
          <div className="flex items-center h-[2rem] justify-start justify-between w-full lg:w-1/2 lg:ml-8 mb-1 lg:mb-0">
            <NewItemDropdown
              dropdownIsOpen={dropdownIsOpen}
              setDropdownIsOpen={setDropdownIsOpen}
              templateId={resume?.templateId}
            ></NewItemDropdown>
            <div className="flex items-center">
              <Input
                className="lg:w-[1/2] w-full h-full"
                placeholder="Search Items..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <ResumeItemTypeDropdown
                typeDropdown={typeDropdown}
                setTypeDropdown={setTypeDropdown}
                setSelectedItemType={setSelectedItemType}
              ></ResumeItemTypeDropdown>
            </div>
            <Select
              value={resume?.templateId}
              onValueChange={handleTemplateUpdate}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Templates</SelectLabel>
                  <SelectItem value={templates.JAKES}>Jake's Resume</SelectItem>
                  <SelectItem value={templates.BLUE}>Blue Theme</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className=""></div>
          </div>
          <div className="flex items-center h-[2rem] justify-start w-full lg:w-1/2">
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
              className="text-red-500 font-bold px-[.5rem]"
              variant="ghost"
              onClick={handleClearResume}
            >
              Clear
            </Button>
            <PageCount
              items={itemsInResume}
              templateId={resume?.templateId}
            ></PageCount>
            <DropdownMenu
              open={downloadDropdownIsOpen}
              onOpenChange={setDownloadDropdownIsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  className={"px-[.5rem]"}
                  variant="ghost"
                  onClick={() => {
                    if (!isResumeValid()) {
                      showErrorToast("Error!", "Resume is Empty!");
                    } else {
                      generatePdfAndOpen(itemsInResume);
                    }
                  }}
                >
                  <DownloadIcon stroke="#394c74" strokeWidth="1"></DownloadIcon>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    if (!isResumeValid()) {
                      showErrorToast("Error!", "Resume is Empty!");
                    } else {
                      generatePdfAndOpen(itemsInResume);
                    }
                  }}
                >
                  Pdf
                </DropdownMenuItem>
                <DropdownMenuSeparator></DropdownMenuSeparator>
                <DropdownMenuItem
                  onClick={() => {
                    if (!isResumeValid()) {
                      showErrorToast("Error!", "Resume is Empty!");
                    } else {
                      generateTexAndOpen(itemsInResume);
                    }
                  }}
                >
                  Tex
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      </div>
      <div className="flex flex-row bg-[#E7ECEF] h-screen overflow-y-auto">
        <div className="w-1/2 p-4 flex-col">
          <ScrollArea className="h-[91%] w-full rounded-md mb-4 border bg-white shadow-xl">
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
                        <div className="w-full flex justify-between items-center p-2">
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
                                templateId={resume?.templateId}
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
                              latexCode={generateLatexGeneric(
                                item,
                                resume?.templateId,
                              )}
                              cacheKey={`${item._id}${resume?.templateId}`}
                              showMessage
                            ></LatexImage>
                          </div>
                          <Skeleton
                            className={
                              loadingMap[item._id]
                                ? "w-full h-[40px] text-center"
                                : "hidden"
                            }
                          >
                            Loading Item...
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
                          latexCode={generateLatexGeneric(
                            item,
                            resume?.templateId,
                          )}
                          cacheKey={`${item._id}${resume?.templateId}`}
                          showMessage
                        ></LatexImage>
                      </div>
                      <Skeleton
                        className={
                          loadingMap[item._id]
                            ? "w-full h-[40px] text-center"
                            : "hidden"
                        }
                      >
                        Loading Item...
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
