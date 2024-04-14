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
        <CheckCircledIcon className="w-12 h-12 pr-[2px]"></CheckCircledIcon>
        <span className="text-sm">Saved</span>
      </>
    );
  } else {
    return (
      <>
        <ReloadIcon className="w-12 h-12 pr-[2px]"></ReloadIcon>
        <span className="text-sm">Saving...</span>
      </>
    );
  }
};
