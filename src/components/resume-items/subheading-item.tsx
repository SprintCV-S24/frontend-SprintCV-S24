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
import React, { useState, useContext } from 'react';
import ResumeContext from '../../components/resumecontext';
import { useAuth } from "@/AuthContext";
import { SectionHeadingsType } from "@/interfaces/interfaces";

export function SubheadingItem() {
  const { addResumeItem } = useContext(ResumeContext);
  const { currentUser } = useAuth();

  const [subtitle, setSubtitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message


  const resetError = () => {
    setErrorMessage("");
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = await currentUser?.getIdToken();

    const data: SectionHeadingsType = {
      user: token!,
      itemName: "TESTING", // TODO: Modify this!
      title: subtitle,
    }

    // TOOD: Add to try/catch blcok
    console.log(data);
    addResumeItem(data);

    // API call to save data (replace placeholder with your actual implementation)
    try {
  
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
          onClick={resetError}
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
        {errorMessage && <div className="error-message">{errorMessage}</div>}{" "}
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
            <Button className="mt-2" type="submit" disabled={subtitle == ""}>
              {subtitle == "" ? "Complete form" : "Add Item"}
            </Button>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
