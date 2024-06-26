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
import DeleteImage from "../../assets/delete.png";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { useAuth } from "@/AuthContext";
import { HeadingsType, HeadingComponent } from "@/api/models/interfaces";
import { useAddHeading } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useUpdateItem } from "@/hooks/mutations";
import { formSubmissionTypes } from "./formSubmissionTypes";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import { ReactSortable } from "react-sortablejs";
import { checkForDuplicate } from "@/api/itemInterface";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { templates } from "@/api/models/templates";

interface HeadingItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: HeadingsType; // Mark as optional with '?'
  originalId?: string;
	templateId: templates | undefined;
}

export function HeadingItem({
  setDropdownIsOpen,
  original,
  originalId,
	templateId,
}: HeadingItemProps) {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  // const [itemName, setItemName] = useState(original?.itemName || "");
  // const [heading, setHeading] = useState(original?.name || "");
  const [bullets, setBullets] = useState<HeadingComponent[]>(
    original?.items || [{ item: "", href: "" }],
  );
  // const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);

  const defaultHeading = original?.name || "";
  const defaultItemName = original?.itemName || "";

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddHeading(
    queryClient,
    storedToken,
  );

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
    heading: Yup.string().required("Heading is required"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () => {
    setIsOpen(false);
    setSubmissionType(undefined);
    resetBullets();
    reset({
      itemName: defaultItemName,
      heading: defaultHeading,
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

  const MAX_BULLETS = 5;

  const handleAddBullet = () => {
    if (bullets.length < MAX_BULLETS) {
      setBullets([...bullets, { item: "", href: "" }]);
    }
  };

  const handleBulletChange = (
    index: number,
    field: "item" | "href",
    value: string,
  ) => {
    setBullets((prev) =>
      prev.map((resp, i) => (i === index ? { ...resp, [field]: value } : resp)),
    );
  };

  const resetBullets = () => {
    setBullets([{ item: "", href: "" }]);
    // setErrorMessage("");
  };

  const handleDeleteBullet = (index: number) => {
    setBullets((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index),
    );
  };

  const handleFormSubmit = async (data: any) => {
    // event.preventDefault();

    const token = storedToken;

    const headingData: HeadingsType = {
      user: token!,
      itemName: data.itemName,
      name: data.heading,
      items: bullets,
    };

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.HEADING,
          itemId: originalId!,
          updatedFields: headingData,
					templateId,
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
          {original ? "Edit" : "Heading"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Heading</DialogTitle>
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
                placeholder={"Unique Item Name"}
                defaultValue={defaultItemName}
                {...register("itemName")}
                // value={itemName}
                // onChange={(e) => setItemName(e.target.value)}
              />
              {errors.itemName && (
                <div className="error-message text-red-400 font-bold">
                  {errors.itemName.message}
                </div>
              )}
              <Input
                className="mb-2 w-full"
                id="item-name"
                placeholder="Your Name"
                defaultValue={defaultHeading}
                {...register("heading")}
                // value={heading}
                // onChange={(e) => setHeading(e.target.value)}
              />
              {errors.heading && (
                <div className="error-message text-red-400 font-bold">
                  {errors.heading.message}
                </div>
              )}
              <div className="flex-grow overflow-y-auto">
                <ReactSortable
                  animation={150}
                  list={bullets as any}
                  setList={setBullets as any}
                  group="Acitivties"
                  handle=".handle"
                  className="h-full w-full mb-2"
                >
                  {bullets.map((bullet, index) => (
                    <div key={index} className="mt-2 flex">
                      <div className="h-[40px] w-[40px]">
                        <DragHandleHorizontalIcon className="handle mr-1 w-full h-full"></DragHandleHorizontalIcon>
                      </div>
                      <div className="flex w-full">
                        <AutosizeTextarea
                          className="mb-2 resize-none h-[35px]"
                          placeholder="Contact Item"
                          value={bullet.item}
                          onChange={(e) =>
                            handleBulletChange(index, "item", e.target.value)
                          }
                        />
                        <AutosizeTextarea
                          className="mb-2 resize-none h-[35px] ml-2" // Add margin for spacing
                          placeholder="Enter Link"
                          value={bullet.href!}
                          onChange={(e) =>
                            handleBulletChange(index, "href", e.target.value)
                          }
                        />
                      </div>
                      <Button
                        className="ml-[5px] flex items-center justify-center w-[110px]"
                        variant="secondary"
                        type="button"
                        disabled={bullets.length <= 1}
                        onClick={() => handleDeleteBullet(index)}
                      >
                        <img
                          src={DeleteImage}
                          alt="deleteimg"
                          className="h-[35px] w-[35px]"
                        ></img>
                      </Button>
                    </div>
                  ))}
                </ReactSortable>
              </div>
              <Button
                type="button"
                variant="ghost"
                onClick={handleAddBullet}
                disabled={bullets.length >= MAX_BULLETS}
              >
                {bullets.length >= MAX_BULLETS ? "MAX" : "Add Contact Item"}
              </Button>
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
                </Button>
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
                </Button>
              </div>
            )}
            <DialogClose asChild onClick={() => setIsOpen(false)}></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
