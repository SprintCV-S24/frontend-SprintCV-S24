import { Card } from "./ui/card";
import ResumeLogo from "../assets/resume-logo.png";
import Select from "../assets/selector.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ResumeSelector: React.FC = () => {
  return (
    <Card className="w-[150px] h-[150px]">
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center space-x-2 ml-3">

          <h2 className="text-xs">Resume Name</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="w-10 h-10">
              <img
                src={Select}
                alt={"SelectIcon"}
                className="w-4 h-4 cursor-pointer"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 font-bold">Delete Resume</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-center mt-3">
        <img src={ResumeLogo} alt="ResumeLogo" className="w-24 h-16" />{" "}
      </div>
    </Card>
  );
};
