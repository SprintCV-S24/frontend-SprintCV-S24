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
import Filter from "@/assets/filter.png";


export const ResumeItemTypeDropdown: React.FC<{
    typeDropdown: boolean;
    setTypeDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedItemType: (item: resumeItemTypes | null) => void;
}> = ({ typeDropdown, setTypeDropdown, setSelectedItemType }) => {
  return (
    <DropdownMenu open={typeDropdown} onOpenChange={setTypeDropdown}>
      <DropdownMenuTrigger asChild>
        <Button className="h-full" variant="ghost">
          <img src={Filter} alt="filterimg" className="min-w-[1rem] min-h-[1rem] w-[1rem] h-[1rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => setSelectedItemType(null)}>All</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.HEADING)}>Heading</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.SECTIONHEADING)}>Subheading</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.EDUCATION)}>Education</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.EXPERIENCE)}>Experience</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.ACTIVITY)}>Extracurricular</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.PROJECT)}>Project</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => setSelectedItemType(resumeItemTypes.SKILL)}>Skill</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResumeItemTypeDropdown;