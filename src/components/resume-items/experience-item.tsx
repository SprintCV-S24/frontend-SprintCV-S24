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
import React, { useState, useEffect } from "react";
import DeleteImage from "../../assets/delete.png";
import { ExperienceType } from "@/api/models/interfaces";
import { useAuth } from "@/AuthContext";
import { createExperience } from "@/api/experienceInterface";
import { useAddExperience } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";

export function ExperienceItem() {
  // Global context(s)
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  const [itemName, setItemName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [jobTitle, setjobTitle] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddExperience(
    queryClient,
    storedToken,
  );

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

    const token = await currentUser?.getIdToken();

		const filteredBullets = bullets.filter(bullet => /\S/.test(bullet));

    const data: ExperienceType = {
      user: token!,
      bullets: filteredBullets,
      itemName: itemName,
      title: jobTitle,
      subtitle: companyName,
      year: date,
      location: location,
    };

    console.log(data);

    try {
      mutate(data, {
        onSuccess: (response) => {
          setIsOpen(false);
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
      setErrorMessage("Error: Unable to submit form. Please try again later.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="text-left h-full w-full"
          variant="ghost"
          onClick={() => {
            resetBullets();
            setIsOpen(true);
          }}
        >
          Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Experience</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        {errorMessage && <div className="error-message text-red-400 font-bold">{errorMessage}</div>}{" "}
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
            <div className="flex flex-col w-[550px]">
              <div className="flex-grow overflow-y-auto">
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
                  </div>
                ))}
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
            <Button
              className="mt-2"
              type="submit"
              disabled={companyName == "" || date == ""}
            >
              {companyName == "" || date == "" ? "Complete form" : "Add Item"}
            </Button>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
