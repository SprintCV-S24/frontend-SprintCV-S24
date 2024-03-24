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
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import HeadingScrollItem from "../components/scrollarea-items/heading-scroll";
import { LatexImage } from "@/components/Latex";
import { BaseItem } from "@/api/models/interfaces";
import {
  generateEducationLatex,
  generateExperienceLatex,
  generateProjectLatex,
} from "@/latexUtils/latexString";
import { useGetAllItems, useGetResume } from "@/hooks/queries";
import { generateLatex } from "@/latexUtils/latexString";
import { testLatex2 } from "@/tests/dummyData";

const DOCUMENT_WIDTH = 420;

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
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);

  const handleBulletRenderingChange = (newRenderingState: boolean) => {
    setIsPdfRendering(newRenderingState);
  };

  useEffect(() => {
    if (id != null && resume !== undefined && allItems != null) {
      //this means no resume had that id
      if (resume === null) {
        //TODO: home page needs to check for and display messages like these
        navigate("/", { state: { from: "editor", error: "Resume not found" } });
      } else {
        const bankItems: Array<BaseItem & { id: string }> = [];
        const resumeItems: Array<BaseItem & { id: string }> = [];
        console.log("itemids:", resume.itemIds);
        for (let item of allItems) {
          if (resume.itemIds.includes(item._id)) {
            resumeItems.push({ ...item, id: item._id });
          } else {
            bankItems.push({ ...item, id: item._id });
          }
        }
        setItemsInBank(bankItems);
        setItemsInResume(resumeItems);
        console.log("bank items:", bankItems);
        console.log("resume items:", resumeItems);
      }
    }
  }, [id, resume, allItems]);

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

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `Resume Item ${a.length - i}`,
  );

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
            </div>
          </Card>
          <ScrollArea className="h-[600px] w-full rounded-md mt-4 border bg-white shadow-md">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">
                Resume Items
              </h4>
              <Separator className="mb-2"></Separator>
              {allItemsIsSuccess &&
                allItems.map((item) => (
                  <Card className="w-full p-2 mb-2 bg-grey" key={item._id}>
                    <LatexImage
                      onRenderStart={() => setDummy(dummy)}
                      onRenderEnd={() => setDummy(dummy)}
                      latexCode={generateLatex(item)}
                    ></LatexImage>
                  </Card>
                ))}
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
