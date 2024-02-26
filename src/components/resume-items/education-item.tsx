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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react"; // Import useState

export function EducationItem() {
  const [universityName, setUniversityName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [major, setMajor] = useState("");
  const [minor, setMinor] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const educationData = {
      universityName,
      startDate,
      endDate,
      major,
      minor,
      description,
    };

    console.log(educationData);

    // API call to save data (replace placeholder with your actual implementation)
    try {
      const response = await fetch("/api/save-education-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(educationData),
      });

      if (response.ok) {
        // Handle successful submission (e.g., close dialog, clear inputs, display feedback)
      } else {
        // Handle error from API
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-left h-full w-full" variant="ghost">
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
              onChange={(e) => setUniversityName(e.target.value)}
            />
            <div className="flex justify-end">
              <Input
                className="w-[90px] mr-[15px]"
                id="start-date"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                className="w-[90px]"
                id="end-date"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></Input>
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
                className="w-[195px]"
                id="Minor"
                placeholder="Minor (Optional)"
                value={minor}
                onChange={(e) => setMinor(e.target.value)}
              ></Input>
            </div>
            <div className="w-[550px]">
              <Textarea
                id="description"
                placeholder="Relevant Course Work, Awards, Etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
            <Button className="mt-2" type="submit">
              Add Item
            </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
