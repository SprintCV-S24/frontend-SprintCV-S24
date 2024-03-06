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
import { AutosizeTextarea } from "../ui/autosize-textarea";
import DeleteImage from "../../assets/delete.png";
import React, { useState, useContext } from "react";
import ResumeContext from "../../components/resumecontext";
import { createEducation } from "@/api/educationInterface";
import { useAuth } from "@/AuthContext";
import { EducationType } from "@/interfaces/interfaces";

export function EducationItem() {
  // Global context(s)
  const { currentUser } = useAuth();
  const { addResumeItem } = useContext(ResumeContext);

  const [universityName, setUniversityName] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [majorMinor, setMajorMinor] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const MAX_BULLETS = 8; // Arbitrary Max for UI

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

  // Handling for submission: calls createEducation to add to MongoDB.
  // TODO: Allow for form to close upon submission.
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = await currentUser?.getIdToken();

    const data: EducationType = {
      user: token!,
      itemName: "Testing", // TODO: Modify this!
      bullets: bullets,
      title: universityName,
      year: date,
      location: location,
      subtitle: majorMinor,
    };

    console.log(data);

    // TODO: Modify this to be within try block! Should only add upon successful back-end submission.
    addResumeItem(data);

    // API call to save data (replace placeholder with your actual implementation)
    try {
      const response = await createEducation(data, token!);
    } catch (error) {
      setErrorMessage("Error: Unable to submit form. Please try again later.");
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
          Education
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Education</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 flex">
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="University Name"
              value={universityName}
              onChange={(e) => {
                setUniversityName(e.target.value);
              }}
            />
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Major, Minor, etc."
              value={majorMinor}
              onChange={(e) => {
                setMajorMinor(e.target.value);
              }}
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
                  placeholder="Set Date Range"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col col-span-2">
              <div className="flex-grow overflow-y-auto">
                {bullets.map((bullet, index) => (
                  <div key={index} className="ml-1 mt-2 flex">
                    {" "}
                    <AutosizeTextarea
                      className="mb-2 resize-none h-[35px]"
                      placeholder="Enter Responsibility"
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
              disabled={universityName == "" || majorMinor == "" || date == ""}
            >
              {universityName == "" || date == "" || majorMinor == ""
                ? "Complete form"
                : "Add Item"}
            </Button>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
