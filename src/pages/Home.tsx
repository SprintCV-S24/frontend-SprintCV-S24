import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResumeSelector } from "@/components/ResumeSelector";


const Home: React.FC = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 shadow-xl">
            <Button
              className="absolute right-2 top-2 md:right-4 md:top-4"
              variant="ghost"
            >
              <Link to="/profile">Profile</Link>
            </Button>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
      </div>
      <div className="lg:p-8 bg-[#E7ECEF] h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
            <p className="text-sm text-muted-foreground">
              Your current resumes are here!
            </p>
            <Link to="/editor">
              <ResumeSelector></ResumeSelector>
              </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
