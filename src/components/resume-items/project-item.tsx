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
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { checkForDuplicate } from "@/api/itemInterface";
import DeleteImage from "../../assets/delete.png";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { ProjectsType } from "@/api/models/interfaces";
import { useAuth } from "@/AuthContext";
import { useAddProject } from "@/hooks/mutations";
import { ReloadIcon } from "@radix-ui/react-icons";
import { formSubmissionTypes } from "./formSubmissionTypes";
import { resumeItemTypes } from "@/api/models/resumeItemTypes";
import { useUpdateItem } from "@/hooks/mutations";
import { DragHandleHorizontalIcon } from "@radix-ui/react-icons";
import { ReactSortable } from "react-sortablejs";
import { useQueryClient } from "@tanstack/react-query";

interface ProjectItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: ProjectsType; // Mark as optional with '?'
  originalId?: string;
}

export function ProjectItem({
  setDropdownIsOpen,
  original,
  originalId,
}: ProjectItemProps) {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  // const [itemName, setItemName] = useState(original?.itemName || "");
  // const [projectName, setProjectName] = useState(original?.title || "");
  // const [date, setDate] = useState(original?.year || "");
  const [bullets, setBullets] = useState<string[]>(original?.bullets || []);
  // const [technologies, setTechnologies] = useState(
  //   original?.technologies || "",
  // );
  // const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isOpen, setIsOpen] = useState(false);
  const [submissionType, setSubmissionType] = useState<
    formSubmissionTypes | undefined
  >(undefined);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddProject(
    queryClient,
    storedToken,
  );

  const defaultProjectName = original?.title || "";
  const defaultTechnologies = original?.technologies || "";
  const defaultItemName = original?.itemName || "";
  const defaultDate = original?.year || "";

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
    projectName: Yup.string().required("Project name is required"),
    technologies: Yup.string().required("Technologies is required"),
    date: Yup.string().required("Date is required"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
  };

  const handleDeleteBullet = (index: number) => {
    setBullets((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index),
    );
  };

  const resetForm = () => {
    // setProjectName("");
    // setTechnologies("");
    // setDate("");
    // setItemName("");
    setBullets([""]); // Reset bullets
    setIsOpen(false);
    // setErrorMessage("");
  };

  const handleFormSubmit = async (data: any) => {
    // event.preventDefault();

    const token = storedToken;

    const filteredBullets = bullets.filter((bullet) => /\S/.test(bullet));

    const projectData: ProjectsType = {
      user: token!,
      itemName: data.itemName,
      title: data.projectName,
      technologies: data.technologies,
      bullets: filteredBullets,
      year: data.date,
    };

    if (submissionType == formSubmissionTypes.EDIT) {
      try {
        // Call the mutation function with necessary parameters
        mutation.mutate({
          itemType: resumeItemTypes.PROJECT,
          itemId: originalId!,
          updatedFields: projectData,
        });

        setIsOpen(false);
        setDropdownIsOpen(false);
        resetForm();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    } else {
      try {
        mutate(projectData, {
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
          {original ? "Edit" : "Project"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Project</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-4 flex">
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
              placeholder="Project Name"
              defaultValue={defaultProjectName}
              {...register("projectName")}
              // value={projectName}
              // onChange={(e) => setProjectName(e.target.value)}
            />
            {errors.projectName && (
              <div className="error-message text-red-400 font-bold">
                {errors.projectName.message}
              </div>
            )}
            <div className="col-span-2">
              <div className="flex items-center space-x-4">
                <Input
                  className="flex-1"
                  id="tech"
                  placeholder="Technologies"
                  defaultValue={defaultTechnologies}
                  {...register("technologies")}
                  // value={technologies}
                  // onChange={(e) => setTechnologies(e.target.value)}
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
              {errors.technologies && (
                <div className="error-message text-red-400 font-bold">
                  {errors.technologies.message}
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
