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
import React, { useState, useEffect } from "react";
import { useAuth } from "@/AuthContext";
import { SectionHeadingsType } from "@/api/models/interfaces";
import { useAddSectionHeading } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";


export function SubheadingItem() {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  const [itemName, setItemName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddSectionHeading(
    queryClient,
    storedToken,
  );

  const resetForm = () => {
    setSubtitle("");
    setItemName("");
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

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = await currentUser?.getIdToken();

    const data: SectionHeadingsType = {
      user: token!,
      itemName: itemName,
      title: subtitle,
    };

    try {
      mutate(data, {
        onSuccess: (response) => {
          setIsOpen(false);
          resetForm();
        },
        onError: (error) => {
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
            setIsOpen(true);
          }}
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
              placeholder="Choose an Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
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
