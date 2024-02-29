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
import { useState, useEffect } from "react";

export function EducationItem() {
  const [universityName, setUniversityName] = useState("");
  const [date, setDate] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);

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

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const educationData = {
        universityName,
        date,
        major,
        minor,
        bullets,
      };
      console.log(educationData);
    } catch (err: any) {}
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
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 flex">
            <Input
              className="w-[300px]"
              id="item-name"
              placeholder="University Name"
              value={universityName}
              onChange={(e) => {
                setUniversityName(e.target.value);
              }}
            />
            <div className="flex justify-end">
              <Input
                className="w-[200px]"
                id="date"
                placeholder="Start Date - End Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <Input
              className="w-[300px]"
              id="major"
              placeholder="Select Major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
            ></Input>
            <div className="flex justify-end">
              <Input
                className="w-[200px]"
                id="Minor"
                placeholder="Minor (Optional)"
                value={minor}
                onChange={(e) => setMinor(e.target.value)}
              ></Input>
            </div>
            <div className="flex flex-col w-[550px]">
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
            <DialogClose asChild>
              <Button
                className="mt-2"
                type="submit"
                disabled={universityName == "" || major == "" || date == ""}
              >
                Add Item
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
