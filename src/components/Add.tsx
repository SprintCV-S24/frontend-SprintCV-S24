import { ItemFrame } from "./ItemFrame";
import { PlusIcon } from "@radix-ui/react-icons";

export const Add: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <ItemFrame onClick={onClick}>
			<div className="flex items-center justify-between p-1">
        <div className="flex items-center space-x-2 ml-3 h-[40px]">
          <h2 className="text-xs text-wrap break-all text-left font-bold">Blank Resume</h2>
        </div>
      </div>
      <div className="flex justify-center ">
        <PlusIcon className="w-24 h-20 text-[#6096ba]"></PlusIcon>
      </div>
    </ItemFrame>
  );
};
