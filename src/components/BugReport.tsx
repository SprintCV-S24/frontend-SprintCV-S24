import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { BugType } from "@/api/models/interfaces";
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
import { useAuth } from "@/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import showErrorToast from "@/components/resume-items/ErrorToast";

import { Textarea } from "./ui/textarea";

interface BugReportProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export function BugReport({ setDialogOpen }: BugReportProps) {
  // Global context(s)
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const validationSchema = Yup.object().shape({
    bugTitle: Yup.string().required("Bug Title is required"),
    browser: Yup.string().required("Browser is required"),
    bugDescription: Yup.string().required("Bug Description is required"),
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  const resetForm = () => {
    setIsOpen(false);
    reset({
      bugTitle: "",
      browser: "",
      bugDescription: "",
    });
  };

  const handleFormSubmit = async (data: any) => {
    // event.preventDefault();

    const token = storedToken;

    const bugData: BugType = {
      bugTitle: data.bugTitle,
      bugDesc: data.bugDescription,
      bugBrowser: data.browswer,
    };

    // console.log("Bug Data");

    try {
      console.log("Bug Report Submitted!");
      resetForm();
      setIsOpen(false);
      showErrorToast("Bug Report", "Report successfully submitted!");
    } catch (error) {
      console.log("ERROR! Can't submit bug report");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          resetForm(); // Reset the form when dialog is closed
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          className="text-left w-full"
          variant="ghost"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Report Bug
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Report Bug</DialogTitle>
          <DialogDescription>
            Fill in the following information
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-2 gap-4 flex max-h-[70vh]">
            <Input
              className="col-span-2"
              id="item-name"
              placeholder="Title for Bug"
              {...register("bugTitle")}
            />
            {errors.bugTitle && (
              <div className="error-message text-red-400 font-bold">
                {errors.bugTitle.message}
              </div>
            )}
            <Input
              className="col-span-2"
              id="browser-name"
              placeholder="Enter your browser"
              {...register("browser")}
            />
            {errors.browser && (
              <div className="error-message text-red-400 font-bold">
                {errors.browser.message}
              </div>
            )}
            <Textarea
              className="col-span-2"
              placeholder="Type your bug description here..."
              {...register("bugDescription")}
            />
            {errors.bugDescription && (
              <div className="error-message text-red-400 font-bold">
                {errors.bugDescription.message}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button className="mt-2" type="submit">
              Submit Bug Report
            </Button>
            <DialogClose asChild onClick={() => setIsOpen(false)}></DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
