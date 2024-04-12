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
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import DeleteImage from "../../assets/delete.png";
import { ExperienceType } from "@/api/models/interfaces";
import { useAuth } from "@/AuthContext";
import { useAddExperience, useUpdateItem } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { formSubmissionTypes } from "./formSubmissionTypes";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import { ReactSortable } from "react-sortablejs";

interface ExperienceItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: ExperienceType; // Mark as optional with '?'
  originalId?: string;
}

export function ExperienceItem({
  setDropdownIsOpen,
  original,
  originalId,
}: ExperienceItemProps) {
  // Global context(s)
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  const [itemName, setItemName] = useState(original?.itemName || "");
  const [companyName, setCompanyName] = useState(original?.subtitle || "");
  const [date, setDate] = useState(original?.year || "");
  const [location, setLocation] = useState(original?.location || "");
  const [jobTitle, setjobTitle] = useState(original?.title || "");
  const [bullets, setBullets] = useState<string[]>(original?.bullets || []);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isOpen, setIsOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddExperience(
    queryClient,
    storedToken,
  );

  const mutation = useUpdateItem(queryClient, storedToken);

  const resetForm = () => {
    setCompanyName("");
    setjobTitle("");
    setDate("");
    setItemName("");
    setBullets([""]); // Reset bullets
    setLocation("");
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

  const MAX_BULLETS = 8;

  // Functions for handing bullet addition/subtraction
  const handleAddBullet = () => {
    if (bullets.length < MAX_BULLETS) {
      setBullets([...bullets, ""]);
    }
  };

  const handleBulletChange = (index: number, value: string) => {
    setBullets((prev) => prev.map((resp, i) => (i === index ? value : resp)));
  };

  const resetBullets = () => {
    setBullets([""]);
    setErrorMessage("");
  };

  const handleDeleteBullet = (index: number) => {
    setBullets((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index),
    );
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = storedToken;

    const filteredBullets = bullets.filter((bullet) => /\S/.test(bullet));

    const data: ExperienceType = {
      user: token!,
      bullets: filteredBullets,
      itemName: itemName,
      title: jobTitle,
      subtitle: companyName,
      year: date,
      location: location,
    };

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.EXPERIENCE,
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
            console.log(error);
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
            if (!original) {
              resetBullets();
            }
            setIsOpen(true);
          }}
        >
          {original ? "Edit" : "Experience"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
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
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Unique Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <Input
              className="col-span-2"
              id="job-title"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setjobTitle(e.target.value)}
            />
            <div className="col-span-2">
              <div className="flex items-center space-x-4">
                <Input
                  className="flex-1"
                  id="location"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Input
                  className="flex-1"
                  id="date"
                  placeholder="Date Range"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col col-span-2">
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
                    <div key={index} className="ml-1 mt-2 flex">
                      {" "}
                      <AutosizeTextarea
                        className="mb-2 resize-none h-[35px]"
                        placeholder="Description"
                        value={bullet}
                        onChange={(e) =>
                          handleBulletChange(index, e.target.value)
                        }
                      />
                      <Button
                        className="ml-[5px] flex items-center justify-center"
                        variant="secondary"
                        type="button"
                        disabled={bullets.length <= 1}
                        onClick={() => handleDeleteBullet(index)}
                      >
                        <img
                          src={DeleteImage}
                          alt="deleteimg"
                          className="h-[40px] w-[40px]"
                        ></img>
                      </Button>
                      <div className="h-[40px] w-[40px]">
                        <DragHandleHorizontalIcon className="handle w-full h-full"></DragHandleHorizontalIcon>
                      </div>
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
                {bullets.length >= MAX_BULLETS ? "MAX" : "Add Bullet"}
              </Button>
            </div>
          </div>
          <DialogFooter>
            {!original && (
              <Button
                className="mt-2"
                type="submit"
                disabled={isPending || companyName == "" || date == ""}
              >
                {isPending ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : companyName == "" || date == "" ? (
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
                  disabled={isPending || companyName == "" || date == ""}
                  onClick={() => setSubmissionType(formSubmissionTypes.CLONE)}
                >
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : companyName == "" || date == "" ? (
                    "Complete form"
                  ) : (
                    "Save as Copy"
                  )}
                </Button>{" "}
                <Button
                  className="mt-2"
                  type="submit"
                  disabled={isPending || companyName == "" || date == ""}
                  onClick={() => setSubmissionType(formSubmissionTypes.EDIT)}
                >
                  {isPending ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : companyName == "" || date == "" ? (
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
