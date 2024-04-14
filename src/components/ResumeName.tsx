import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateResume } from "@/hooks/mutations";

export const ResumeName: React.FC<{
  token: string | undefined;
  resumeId: string;
  resumeName: string | undefined;
  setResumeName: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSaving: () => void;
  setSaved: () => void;
}> = ({ token, resumeId, resumeName, setResumeName, setSaving, setSaved }) => {
  const queryClient = useQueryClient();
  const { mutate } = useUpdateResume(queryClient, token);
  const currName = useRef<string | undefined>(resumeName); //this is so it knows the previous name to revert to if it needs to
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currName.current == null) {
      currName.current = resumeName;
    }
  }, [resumeName]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setResumeName(event.target.value);
  };

  const handleSubmit = (): void => {
    if (currName.current != null && resumeName == "") {
      setResumeName(currName.current);
    } else if (resumeName != currName.current) {
      const updatedFields = { itemName: resumeName };
      setSaving();
      currName.current = resumeName;
      mutate(
        { updatedFields, resumeId },
        {
          onSuccess: () => {
            setSaved();
          },
          onError: () => {
            setSaved(); //TODO: not great
          },
        },
      );
    }
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event,
  ) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    handleSubmit();
  };

  return (
    <Input
      className="m-2 min-w-[50px]"
      type="text"
      value={resumeName}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
      ref={inputRef}
    />
  );
};
