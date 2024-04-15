import React, { useState, useEffect } from "react";
import { ReloadIcon, CheckCircledIcon } from "@radix-ui/react-icons";

export const ResumeSaved: React.FC<{
  isSaved: boolean;
}> = ({ isSaved }) => {
  const [inSavingTimeout, setInSavingTimeout] = useState<boolean>(false);

  useEffect(() => {
    if (!isSaved) {
      setInSavingTimeout(true); // Start showing "Saving..."
      // Set a minimum display time for "Saving..."
      setTimeout(() => {
        setInSavingTimeout(false);
      }, 1500);
    }
  }, [isSaved]);

  if (isSaved && !inSavingTimeout) {
    return (
      <>
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <CheckCircledIcon className="pr-[2px]"></CheckCircledIcon>
        </div>
        <span className="text-sm">Saved</span>
      </>
    );
  } else {
    return (
      <>
        <div className="w-[30px] h-[30px] flex items-center justify-center">
          <ReloadIcon className="pr-[2px]"></ReloadIcon>
        </div>
        <span className="text-sm">Saving...</span>
      </>
    );
  }
};
