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
import React, { useState, useContext } from 'react';
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { ResumeItem } from './types';
import ResumeContext from '../../components/resumecontext';


interface Bullet {
  description: string;
  link: string;
}

export function HeadingItem() {
  const [heading, setHeading] = useState("");
  const [bullets, setBullets] = useState<Bullet[]>([
    { description: "", link: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const { addResumeItem } = useContext(ResumeContext);

  const MAX_BULLETS = 5;

  const handleAddBullet = () => {
    if (bullets.length < MAX_BULLETS) {
      setBullets([...bullets, { description: "", link: "" }]);
    }
  };

  const handleBulletChange = (
    index: number,
    field: "description" | "link",
    value: string,
  ) => {
    setBullets((prev) =>
      prev.map((resp, i) => (i === index ? { ...resp, [field]: value } : resp)),
    );
  };

  const resetBullets = () => {
    setBullets([{ description: "", link: "" }]);
    setErrorMessage("");
  };

  const handleDeleteBullet = (index: number) => {
    setBullets((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index),
    );
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const data = {
      heading,
      bullets,
    };

    const headingItem: ResumeItem = {
      type: "heading",
      title: heading,
      description: bullets,
    };

    console.log(data);

    // Change location later on; should only add in case of succesfull api call./
    addResumeItem(headingItem);

    // API call to save data (replace placeholder with your actual implementation)
    try {
      const response = await fetch("/api/save-education-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setErrorMessage("Successfully Submitted!");
      } else {
        setErrorMessage(
          "Error: Unable to submit form. Please try again later.",
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="text-left h-full w-full"
          variant="ghost"
          onClick={resetBullets}
        >
          Heading
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Heading</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        {errorMessage && <div className="error-message text-red-400 font-bold">{errorMessage}</div>}{" "}
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 flex">
            <div className="flex flex-col w-[550px]">
              <Input
                className="mb-2 w-full"
                id="item-name"
                placeholder="Your Name"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
              />
              <div className="flex-grow overflow-y-auto">
                {bullets.map((bullet, index) => (
                  <div key={index} className="ml-1 mt-2 flex">
                    {" "}
                    <AutosizeTextarea
                      className="mb-2 resize-none h-[35px]"
                      placeholder="Enter Description"
                      value={bullet.description}
                      onChange={(e) =>
                        handleBulletChange(index, "description", e.target.value)
                      }
                    />
                    <AutosizeTextarea
                      className="mb-2 resize-none h-[35px] ml-2" // Add margin for spacing
                      placeholder="Enter Link"
                      value={bullet.link}
                      onChange={(e) =>
                        handleBulletChange(index, "link", e.target.value)
                      }
                    />
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
            <Button className="mt-2" type="submit" disabled={heading == ""}>
              {heading == "" ? "Complete form" : "Add Item"}
            </Button>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
