import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import TextForm from "../components/resume-item";
import { Button } from "../components/ui/button"
import { MainNav } from "../../src/components/main-nav";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"




type User = {
  displayName: string | null;
  email: string | null;
};

const Profile: React.FC = () => {
  const { logout, getUser } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const currentUser = getUser();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleLogout = () => {
    void logout();
    navigate("/login");
  };

  return (
    
    <>
    <div className="md:hidden"></div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <Button
              className="absolute right-2 top-2 md:right-4 md:top-4"
              variant="ghost">
            </Button>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4"></div>
          </div>
        </div>
      </div>


    <div className="lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <Card>
            <CardHeader>
              <CardDescription>Enter email and password</CardDescription>
            </CardHeader>
            <CardContent>
            <div className="flex justify-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="pt-4 pl-4 pb-8 ...">
            </div>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <div>
                <p>
                  <strong>Name:</strong> {user?.displayName}
                </p>
                <p>
                  <strong>Email:</strong> {user?.email}
                </p>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
            </CardContent>
              </Card>
              <p className="text-sm text-muted-foreground">
              </p>
         </div>
      </div>
    </div>


    </> 
  );
};

export default Profile;
