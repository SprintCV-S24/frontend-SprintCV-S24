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
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { useAuth } from "@/AuthContext";
import { HeadingsType, HeadingComponent } from "@/api/models/interfaces";
import { useAddHeading } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";

interface HeadingItemProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  initialHeading?: HeadingsType; // Mark as optional with '?'
}

export function HeadingItem({
  setDropdownIsOpen,
  initialHeading,
}: HeadingItemProps) {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  const [itemName, setItemName] = useState(initialHeading?.itemName || "");
  const [heading, setHeading] = useState(initialHeading?.name || "");
  console.log(initialHeading?.items);
  const [bullets, setBullets] = useState<HeadingComponent[]>(
    initialHeading?.items || [{ item: "", href: "" }],
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useAddHeading(
    queryClient,
    storedToken,
  );

  const resetForm = () => {
    setHeading(""), setItemName("");
    setBullets([]); // Reset bullets
    setErrorMessage("");
  };

  useEffect(() => {
    const updateToken = async () => {
      try {
        console.log("Maybe?");
        console.log(open);
        const token = await currentUser?.getIdToken();
        setStoredToken(token);
      } catch (err) {
        console.log(err);
      }
    };

    void updateToken();
  }, [currentUser]);

  const MAX_BULLETS = 5;

  const handleAddBullet = () => {
    if (bullets.length < MAX_BULLETS) {
      setBullets([...bullets, { item: "", href: "" }]);
    }
  };

  const handleBulletChange = (
    index: number,
    field: "item" | "href",
    value: string,
  ) => {
    setBullets((prev) =>
      prev.map((resp, i) => (i === index ? { ...resp, [field]: value } : resp)),
    );
  };

  const resetBullets = () => {
    setBullets([{ item: "", href: "" }]);
    setErrorMessage("");
  };

  const handleDeleteBullet = (index: number) => {
    setBullets((prevResponsibilities) =>
      prevResponsibilities.filter((_, i) => i !== index),
    );
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = storedToken;

    const data: HeadingsType = {
      user: token!,
      itemName: itemName,
      name: heading,
      items: bullets,
    };

    console.log(data);

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

  // TODO: Modify href to be optional!
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
          <Button
            className="left-aligned-text h-full w-full"
            variant="ghost"
            onClick={() => {
              if (!initialHeading) {
                resetBullets();
              }
              setIsOpen(true);
            }}
          >
            {!initialHeading? "Heading": "Edit"}
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Heading</DialogTitle>
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
          <div className="grid grid-cols-2 gap-4 flex">
            <div className="flex flex-col col-span-2">
              <Input
                className="mb-2 w-full"
                id="item-name"
                placeholder="Unique Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
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
                      placeholder="Contact Item"
                      value={bullet.item}
                      onChange={(e) =>
                        handleBulletChange(index, "item", e.target.value)
                      }
                    />
                    <AutosizeTextarea
                      className="mb-2 resize-none h-[35px] ml-2" // Add margin for spacing
                      placeholder="Enter Link"
                      value={bullet.href!}
                      onChange={(e) =>
                        handleBulletChange(index, "href", e.target.value)
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
                {bullets.length >= MAX_BULLETS ? "MAX" : "Add Contact Item"}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="mt-2"
              type="submit"
              disabled={isPending || heading == ""}
            >
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : heading == "" ? (
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
