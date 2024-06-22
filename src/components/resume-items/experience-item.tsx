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
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { checkForDuplicate } from "@/api/itemInterface";
import { templates } from "@/api/models/templates";

interface ExperienceItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: ExperienceType; // Mark as optional with '?'
  originalId?: string;
	templateId: templates | undefined;
}

export function ExperienceItem({
  setDropdownIsOpen,
  original,
  originalId,
	templateId,
}: ExperienceItemProps) {
  // Global context(s)
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  // const [itemName, setItemName] = useState(original?.itemName || "");
  // const [companyName, setCompanyName] = useState(original?.subtitle || "");
  // const [date, setDate] = useState(original?.year || "");
  // const [location, setLocation] = useState(original?.location || "");
  // const [jobTitle, setjobTitle] = useState(original?.title || "");
  const [bullets, setBullets] = useState<string[]>(original?.bullets || [""]);
  // const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isOpen, setIsOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);

  const defaultCompany = original?.title || "";
  const defaultTitle = original?.subtitle || "";
  const defaultItemName = original?.itemName || "";
  const defaultLocation = original?.location || "";
  const defaultDate = original?.year || "";

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddExperience(
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
    companyName: Yup.string().required("Company name is required"),
    jobTitle: Yup.string().required("Job Title is required"),
    date: Yup.string().required("Date is required"),
    location: Yup.string().required("Location is required"),
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
    setBullets([""]); // Reset bullet
    setIsOpen(false);
    reset({
      itemName: defaultItemName,
      companyName: defaultCompany,
      jobTitle: defaultTitle,
      date: defaultDate,
      location: defaultLocation,
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

    const filteredBullets = bullets.filter((bullet) => /\S/.test(bullet));

    const experienceData: ExperienceType = {
      user: token!,
      bullets: filteredBullets,
      itemName: data.itemName,
      title: data.companyName,
      subtitle: data.jobTitle,
      year: data.date,
      location: data.location,
    };

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.EXPERIENCE,
          itemId: originalId!,
          updatedFields: experienceData,
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
        mutate(experienceData, {
          onSuccess: (response) => {
            setIsOpen(false);
            setDropdownIsOpen(false);
            resetForm();
          },
          onError: (error) => {
            console.log(error);
          },
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
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-4 flex max-h-[70vh]">
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Unique Item Name"
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
              className="col-span-2"
              id="item-name"
              placeholder="Company Name"
              defaultValue={defaultCompany}
              {...register("companyName")}
              // value={companyName}
              // onChange={(e) => setCompanyName(e.target.value)}
            />
            {errors.companyName && (
              <div className="error-message text-red-400 font-bold">
                {errors.companyName.message}
              </div>
            )}
            <Input
              className="col-span-2"
              id="job-title"
              placeholder="Job Title"
              defaultValue={defaultTitle}
              {...register("jobTitle")}
              // value={jobTitle}
              // onChange={(e) => setjobTitle(e.target.value)}
            />
            {errors.jobTitle && (
              <div className="error-message text-red-400 font-bold">
                {errors.jobTitle.message}
              </div>
            )}
            <div className="col-span-2">
              <div className="flex items-center space-x-4">
                <Input
                  className="flex-1"
                  id="location"
                  placeholder="Location"
                  defaultValue={defaultLocation}
                  {...register("location")}
                  // value={location}
                  // onChange={(e) => setLocation(e.target.value)}
                />
                <Input
                  className="flex-1"
                  id="date"
                  placeholder="Date Range"
                  defaultValue={defaultDate}
                  {...register("date")}
                  // value={date}
                  // onChange={(e) => setDate(e.target.value)}
                />
              </div>
              {errors.location && (
                <div className="error-message text-red-400 font-bold">
                  {errors.location.message}
                </div>
              )}
              {errors.date && (
                <div className="error-message text-red-400 font-bold">
                  {errors.date.message}
                </div>
              )}
            </div>
            <div className="flex flex-col col-span-2">
              <div className="flex-grow overflow-y-auto">
                <ReactSortable
                  animation={150}
                  list={bullets as any}
                  setList={setBullets as any}
                  group="Acitivties"
                  handle=".handle"
                  className="h-full max-h-[15vh] w-full mb-2"
                >
                  {bullets.map((bullet, index) => (
                    <div key={index} className="mt-2 flex">
                      <div className="h-[40px] w-[40px]">
                        <DragHandleHorizontalIcon className="handle w-full h-full mr-1"></DragHandleHorizontalIcon>
                      </div>
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
