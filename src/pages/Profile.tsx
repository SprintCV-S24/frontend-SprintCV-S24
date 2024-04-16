import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { BugReport } from "@/components/BugReport";

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
  const [bugOpen, setBugOpen] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      setIsLoading(false);
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <div className="md:hidden"></div>
      <div className="flex-col">
        <div className="flex w-full h-[3rem] items-center px-4 relative shadow-xl">
          <MainNav className="mx-6" />
          <Button className="mr-4" variant="secondary">
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-center min-h-screen space-y-6 w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Account Information</h1>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold"> </h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <p>
                    <strong>Name:</strong> {user?.displayName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <BugReport setDropdownIsOpen={setBugOpen}></BugReport>
                  <Button
                    className="mt-4"
                    variant="secondary"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Profile;