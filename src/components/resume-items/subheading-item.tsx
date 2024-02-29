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
import { useState } from "react"; // Import useState


export function SubheadingItem() {
  const [subtitle, setSubtitle] = useState("");

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const experienceData = {
      subtitle,
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
        <Button
          className="text-left h-full w-full"
          variant="ghost"
        >
          Subheading
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Subheading</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="gap-4 flex">
            <Input
              className="w-full"
              id="item-name"
              placeholder="Enter Subheading Title"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="mt-2"
                type="submit"
                disabled={subtitle == ""}
              >
                {(subtitle == "")? "Complete form" : "Add Item"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
