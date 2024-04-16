import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { EducationItem } from "@/components/resume-items/education-item";
import { ExperienceItem } from "@/components/resume-items/experience-item";
import { ExtracurricularItem } from "@/components/resume-items/activity";
import { HeadingItem } from "@/components/resume-items/heading-item";
import { SubheadingItem } from "@/components/resume-items/subheading-item";
import { ProjectItem } from "@/components/resume-items/project-item";
import { SkillItem } from "@/components/resume-items/skill-item";
import { PlusIcon } from "@radix-ui/react-icons";
import { templates } from "@/api/models/templates";

export const NewItemDropdown: React.FC<{
  dropdownIsOpen: boolean;
  setDropdownIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  templateId: templates | undefined;
}> = ({ dropdownIsOpen, setDropdownIsOpen, templateId }) => {
	console.log("templateId in newitemdropdown:", templateId);
  return (
    <DropdownMenu open={dropdownIsOpen} onOpenChange={setDropdownIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="h-full" variant="ghost">
          <PlusIcon className="mr-2"></PlusIcon>
          Add Resume Item
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-center">Item Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <HeadingItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></HeadingItem>
        <DropdownMenuSeparator />
        <SubheadingItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></SubheadingItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <EducationItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></EducationItem>
        <DropdownMenuSeparator />
        <ExperienceItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></ExperienceItem>
        <DropdownMenuSeparator />
        <ExtracurricularItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></ExtracurricularItem>
        <DropdownMenuSeparator />
        <ProjectItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></ProjectItem>
        <SkillItem
          setDropdownIsOpen={setDropdownIsOpen}
          templateId={templateId}
        ></SkillItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NewItemDropdown;
