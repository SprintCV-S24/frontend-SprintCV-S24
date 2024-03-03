import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EducationItem } from "@/components/resume-items/education-item";
import { ExperienceItem } from "@/components/resume-items/experience-item";
import { ExtracurricularItem } from "@/components/resume-items/extracurricular-item";
import { HeadingItem } from "@/components/resume-items/heading-item";
import { SubheadingItem } from "@/components/resume-items/subheading-item";
import { ProjectItem } from "@/components/resume-items/project-item";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResumeItem } from "types";
import ResumeContext from '../components/resumecontext';
import  HeadingScrollItem from "../components/scrollarea-items/heading-scroll";

const Editor: React.FC = () => {
  const [fact, setFact] = useState<string>("");
  const { currentUser } = useAuth();
  const { resumeItems } = useContext(ResumeContext);


  useEffect(() => {
    const fetchFact = async () => {
      console.log("called");
      try {
        const token = await currentUser?.getIdToken();

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
  }, [currentUser]);

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `Resume Item ${a.length - i}`,
  );

  return (
    <>
        <div className="md:hidden"></div>
        <div className="hidden flex-col md:flex">
          <div className="border-b">
            <div className="flex h-16 items-center px-4">
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
        <div className="flex flex-row bg-[#E7ECEF] h-screen">
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
            <ScrollArea className="h-[525px] w-full rounded-md mt-4 border bg-white">
              <div className="p-4">
                <h4 className="mb-4 text-sm font-medium leading-none">
                  Resume Items
                </h4>
                {resumeItems.map((item, index) => (
                  <div key={index}>
                    <div><HeadingScrollItem heading={item.title} descriptions={item.description} /></div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="w-1/2 p-4">
            <Card className="h-full"></Card>
          </div>
        </div>
    </>
  );
};

export default Editor;
