import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
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
import { SectionHeadingsType } from "@/api/models/interfaces";
import { useAddSectionHeading } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { formSubmissionTypes } from "./formSubmissionTypes";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { useUpdateItem } from "@/hooks/mutations";
import { checkForDuplicate } from "@/api/itemInterface";

interface SubheadingItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: SectionHeadingsType; // Mark as optional with '?'
  originalId?: string;
}

export function SubheadingItem({
  setDropdownIsOpen,
  original,
  originalId,
}: SubheadingItemProps) {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  // const [itemName, setItemName] = useState(original?.itemName || "");
  // const [subtitle, setSubtitle] = useState(original?.title || "");
  // const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const defaultItemName = original?.itemName || "";
  const defaultSubtitle = original?.title || "";

  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddSectionHeading(
    queryClient,
    storedToken,
  );
  const mutation = useUpdateItem(queryClient, storedToken);

  const validationSchema = Yup.object().shape({
    itemName: Yup.string()
      .required("Item Name is required")
      .test(
        "unique-item-name",
        "Item Name already exists",
        async value => {
          // This code is a bit sloppy but works for now.
          if (submissionType !== formSubmissionTypes.EDIT)
            try {
              const response = await checkForDuplicate(value, storedToken!);
              return !response; // Return true if item name doesn't exist
            } catch (error) {
              console.error("Error checking item name existence:", error);
              return false; // Return false to indicate validation failure
            }
          else {
            return true;
          }
        },
      ),
    subtitle: Yup.string().required("Title is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () => {
    setIsOpen(false);
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

    const headingData: SectionHeadingsType = {
      user: token!,
      itemName: data.itemName,
      title: data.subtitle,
    };

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.SECTIONHEADING,
          itemId: originalId!,
          updatedFields: headingData,
        });

        setIsOpen(false);
        setDropdownIsOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        mutate(headingData, {
          onSuccess: (response) => {
            setIsOpen(false);
            setDropdownIsOpen(false);
            resetForm();
          },
          onError: (error) => {
            // setErrorMessage(
            //   "Error: Unable to submit form. Please try again later.",
            // );
          },
        });
      } catch (error) {
        // setErrorMessage(
        //   "Error: Unable to submit form. Please try again later.",
        // );
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
          {original ? "Edit" : "Subheading"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Subheading</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="gap-4 flex flex-col">
            <Input
              className="w-full"
              id="item-name"
              placeholder="Unique Item Name"
              defaultValue={defaultItemName}
              {...register("itemName")}
            />
            {errors.itemName && (
              <div className="error-message text-red-400 font-bold">
                {errors.itemName.message}
              </div>
            )}
            <Input
              className="w-full"
              id="item-name"
              placeholder="Title"
              defaultValue={defaultSubtitle}
              {...register("subtitle")}
            />
            {errors.subtitle && (
              <div className="error-message text-red-400 font-bold">
                {errors.subtitle.message}
              </div>
            )}
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
