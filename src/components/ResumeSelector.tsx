import { Card } from "./ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { FileTextIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { ResumesServerType } from "@/api/models/resumeModel";
import { ItemFrame } from "./ItemFrame";

const MAX_LENGTH_DISPLAYED_NAME = 22;

export const ResumeSelector: React.FC<{ resume: ResumesServerType }> = ({
  resume,
}) => {
  const navigate = useNavigate();

  const processedItemName =
    resume.itemName.length > MAX_LENGTH_DISPLAYED_NAME
      ? resume.itemName.substring(0, MAX_LENGTH_DISPLAYED_NAME + 1) + "..."
      : resume.itemName;

  return (
		<ItemFrame onClick={() => {
        navigate(`/editor/${resume._id}`);
      }}>
      <div className="flex items-center justify-between p-1">
        <div className="flex items-center space-x-2 ml-3">
          <h2 className="text-xs text-wrap break-all text-left font-bold">
            {processedItemName}
          </h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-10 h-10 p-0">
              <DotsVerticalIcon></DotsVerticalIcon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Rename</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 font-bold">
              Delete Resume
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex justify-center ">
        <FileTextIcon className="w-24 h-20 text-[#274c77]"></FileTextIcon>
      </div>
			</ItemFrame>
  );
};
