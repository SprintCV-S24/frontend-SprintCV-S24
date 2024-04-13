import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/AuthContext";
import { useAddSkill } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { SkillsType } from "@/api/models/interfaces";
import { formSubmissionTypes } from "./formSubmissionTypes";
import { useUpdateItem } from "@/hooks/mutations";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";

interface SkillItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: SkillsType; // Mark as optional with '?'
  originalId?: string;
}

export function SkillItem({
  setDropdownIsOpen,
  original,
  originalId,
}: SkillItemProps) {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  const [itemName, setItemName] = useState(original?.itemName || "");
  const [skill, setSkill] = useState(original?.title || "");
  const [desc, setDesc] = useState(original?.description || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddSkill(queryClient, storedToken);
  const mutation = useUpdateItem(queryClient, storedToken);

  const resetForm = () => {
    setSkill(""), setItemName(""), setDesc("");
    setErrorMessage("");
  };

  useEffect(() => {
    const updateToken = async () => {
      try {
        const token = await currentUser?.getIdToken();
        setStoredToken(token);
      } catch (err) {
        console.log(err);
      }
    };

    void updateToken();
  }, [currentUser]);

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = storedToken;

    const data: SkillsType = {
      user: token!,
      itemName: itemName,
      title: skill,
      description: desc,
    };

    console.log(data);

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.SKILL,
          itemId: originalId!,
          updatedFields: data,
        });

        setIsOpen(false);
        setDropdownIsOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        mutate(data, {
          onSuccess: (response) => {
            setIsOpen(false);
            setDropdownIsOpen(false);
            resetForm();
          },
          onError: (error) => {
            setErrorMessage(
              "Error: Unable to submit form. Please try again later.",
            );
          },
        });
      } catch (error) {
        setErrorMessage(
          "Error: Unable to submit form. Please try again later.",
        );
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={original ? "text-left" : "text-left w-full"}
          variant="ghost"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {original ? "Edit" : "Skill"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <div className="error-message text-red-400 font-bold">
            {errorMessage}
          </div>
        )}{" "}
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 flex">
            <div className="flex flex-col col-span-2">
              <Input
                className="mb-2 w-full"
                id="item-name"
                placeholder="Unique Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Input
                className="mb-2 w-full"
                id="skill-name"
                placeholder="Skill Category"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
              <Input
                className="mb-2 w-full"
                id="desc"
                placeholder="Add list of relevant skills"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            {!original && (
              <Button
                className="mt-2"
                type="submit"
                disabled={isPending || skill == "" || desc == ""}
              >
                {isPending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : skill == "" ? (
                  "Complete form"
                ) : (
                  "Add Item"
                )}
              </Button>
            )}
            {original && (
              <div className="flex justify-between w-full">
                <Button
                  className="mt-2"
                  type="submit"
                  disabled={isPending || skill == "" || desc == ""}
                  onClick={() => setSubmissionType(formSubmissionTypes.CLONE)}
                >
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : skill == "" || desc == "" ? (
                    "Complete form"
                  ) : (
                    "Save as Copy"
                  )}
                </Button>{" "}
                <Button
                  className="mt-2"
                  type="submit"
                  disabled={isPending || skill == "" || desc == ""}
                  onClick={() => setSubmissionType(formSubmissionTypes.EDIT)}
                >
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : skill == "" || desc == "" ? (
                    "Complete form"
                  ) : (
                    "Save and Replace"
                  )}
                </Button>{" "}
              </div>
            )}
            <DialogClose asChild onClick={() => setIsOpen(false)}></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
