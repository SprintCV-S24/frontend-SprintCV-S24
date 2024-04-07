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
import { AutosizeTextarea } from "../ui/autosize-textarea";
import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuth } from "@/AuthContext";
import { ActivitiesType } from "@/api/models/interfaces";
import { useAddActivity } from "@/hooks/mutations";
import { useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";

interface ActivityItemsProps {
  setDropdownIsOpen: Dispatch<SetStateAction<boolean>>;
  original?: ActivitiesType; // Mark as optional with '?'
  formType?: string;
  onSuccess?: () => void; // Define onSuccess prop
}

export function ExtracurricularItem({
  setDropdownIsOpen,
  original,
  formType,
  onSuccess,
}: ActivityItemsProps) {
  // Global context(s)
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);

  const [orgName, setOrgName] = useState(original?.subtitle || "");
  const [role, setRole] = useState(original?.title || "");
  const [date, setDate] = useState(original?.year || "");
  const [itemName, setItemName] = useState(original?.itemName || "");
  const [bullets, setBullets] = useState<string[]>(original?.bullets || []);
  const [location, setLocation] = useState(original?.location || "");
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const queryClient = useQueryClient();

  const { mutate, isPending, isError } = useAddActivity(
    queryClient,
    storedToken,
  );

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

  const MAX_BULLETS = 8;

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

  const resetForm = () => {
    setOrgName("");
    setRole("");
    setDate("");
    setItemName("");
    setBullets([""]); // Reset bullets
    setLocation("");
    setErrorMessage("");
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();

    const token = storedToken;

    const filteredBullets = bullets.filter((bullet) => /\S/.test(bullet));

    const data: ActivitiesType = {
      user: token!,
      itemName: itemName,
      subtitle: orgName,
      title: role,
      bullets: filteredBullets,
      year: date,
      location: location,
    };

    // TODO: Add to try/catch block!
    console.log(data);
    try {
      mutate(data, {
        onSuccess: (response) => {
          setIsOpen(false);
          setDropdownIsOpen(false);
          resetForm();
          if (onSuccess) {
            onSuccess(); // Call onSuccess callback
          }
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
            if (!original) {
              resetBullets();
            };
            setIsOpen(true);
          }}
        >
          {formType === "clone"
            ? "Clone"
            : formType === "edit"
              ? "Edit"
              : "Heading"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Extracurricular</DialogTitle>
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
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Unique Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Input
              className="col-span-2"
              id="org-name"
              placeholder="Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
                  placeholder="Date Range"
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
                      placeholder="Description"
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
              disabled={isPending || orgName == "" || date == ""}
            >
              {isPending ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : orgName == "" || date == "" ? (
                "Complete form"
              ) : (
                "Add Item"
              )}
            </Button>
            <DialogClose asChild onClick={() => setIsOpen(false)}></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
