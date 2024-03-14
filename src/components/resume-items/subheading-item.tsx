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
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/AuthContext";
import { SectionHeadingsType } from "@/api/models/interfaces";
import { useAddSectionHeading } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";

export function SubheadingItem({setDropdownIsOpen}: {setDropdownIsOpen: Dispatch<SetStateAction<boolean>>}) {
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

    const token = storedToken;

    const data: SectionHeadingsType = {
      user: token!,
      itemName: itemName,
      title: subtitle,
    };

    try {
      mutate(data, {
        onSuccess: (response) => {
          setIsOpen(false);
					setDropdownIsOpen(false);
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
        {errorMessage && (
          <div className="error-message text-red-400 font-bold">
            {errorMessage}
          </div>
        )}{" "}
        <form onSubmit={handleFormSubmit}>
          <div className="gap-4 flex">
            <Input
              className="w-full"
              id="item-name"
              placeholder="Unique Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Input
              className="w-full"
              id="item-name"
              placeholder="Title"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              className="mt-2"
              type="submit"
              disabled={isPending || subtitle == ""}
            >
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : subtitle == "" ? (
                "Complete form"
              ) : (
                "Add Item"
              )}
            </Button>
            <DialogClose asChild></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
