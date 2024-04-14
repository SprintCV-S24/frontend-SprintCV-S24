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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { checkForDuplicate } from "@/api/itemInterface";

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

  // const [itemName, setItemName] = useState(original?.itemName || "");
  // const [skill, setSkill] = useState(original?.title || "");
  // const [desc, setDesc] = useState(original?.description || "");
  // const [errorMessage, setErrorMessage] = useState("");

  const defaultSkillName = original?.title || "";
  const defaultDescription = original?.description || "";
  const defaultItemName = original?.itemName || "";

  const [isOpen, setIsOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddSkill(queryClient, storedToken);
  const mutation = useUpdateItem(queryClient, storedToken);

  const validationSchema = Yup.object().shape({
    itemName: Yup.string()
      .required("Item Name is required")
      .test("unique-item-name", "Item Name already exists", async (value) => {
        // This code is a bit sloppy but works for now.
        if (submissionType !== formSubmissionTypes.EDIT) {
          try {
            const response = await checkForDuplicate(value, storedToken!);
            return !response; // Return true if item name doesn't exist
          } catch (error) {
            console.error("Error checking item name existence:", error);
            return false; // Return false to indicate validation failure
          }
        } else {
          return true;
        }
      }),
    skillName: Yup.string().required("Skill is required"),
    description: Yup.string().required("Description is required"),
  });

  const {
    handleSubmit,
    register,
    reset, // Destructure reset function
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () => {
    setIsOpen(false);
    setSubmissionType(undefined);
    reset({
      itemName: defaultItemName,
      skillName: defaultSkillName,
      description: defaultDescription,
    });
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

  const handleFormSubmit = async (data: any) => {
    // event.preventDefault();

    const token = storedToken;

    const skillsData: SkillsType = {
      user: token!,
      itemName: data.itemName,
      title: data.skillName,
      description: data.description,
    };

    console.log(skillsData);

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.SKILL,
          itemId: originalId!,
          updatedFields: skillsData,
        });

        setIsOpen(false);
        setDropdownIsOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        mutate(skillsData, {
          onSuccess: (response) => {
            setIsOpen(false);
            setDropdownIsOpen(false);
            resetForm();
          },
          onError: (error) => {},
        });
      } catch (error) {}
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm(); // Reset the form when dialog is closed
        }
      }}
    >
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-4 flex">
            <div className="flex flex-col col-span-2">
              <Input
                className="mb-2 w-full"
                id="item-name"
                placeholder="Unique Item Name"
                // value={itemName}
                // onChange={(e) => setItemName(e.target.value)}
                defaultValue={defaultItemName}
                {...register("itemName")}
              />
              {errors.itemName && (
                <div className="error-message text-red-400 font-bold">
                  {errors.itemName.message}
                </div>
              )}
              <Input
                className="mb-2 w-full"
                id="skill-name"
                placeholder="Skill Category"
                // value={skill}
                // onChange={(e) => setSkill(e.target.value)}
                defaultValue={defaultSkillName}
                {...register("skillName")}
              />
              {errors.skillName && (
                <div className="error-message text-red-400 font-bold">
                  {errors.skillName.message}
                </div>
              )}
              <Input
                className="mb-2 w-full"
                id="desc"
                placeholder="Add list of relevant skills"
                // value={desc}
                // onChange={(e) => setDesc(e.target.value)}
                defaultValue={defaultDescription}
                {...register("description")}
              />
              {errors.description && (
                <div className="error-message text-red-400 font-bold">
                  {errors.description.message}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            {!original && (
              <Button className="mt-2" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
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
                  disabled={isPending}
                  onClick={() => setSubmissionType(formSubmissionTypes.CLONE)}
                >
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    "Save as Copy"
                  )}
                </Button>{" "}
                <Button
                  className="mt-2"
                  type="submit"
                  disabled={isPending}
                  onClick={() => setSubmissionType(formSubmissionTypes.EDIT)}
                >
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
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
