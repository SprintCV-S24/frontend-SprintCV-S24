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

export function ExperienceItem() {
  const [companyName, setCompanyName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const experienceData = {
      companyName,
      startDate,
      endDate,
      description,
    };

    console.log(experienceData);

    // API call to save data (replace placeholder with your actual implementation)
    try {
      const response = await fetch("/api/save-education-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(experienceData),
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
        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-2 gap-4 flex">
            <Input
              className="w-[300px]"
              id="item-name"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
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
            <div className="w-[550px]">
              <Textarea
                id="description"
                placeholder="Job Description"
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
