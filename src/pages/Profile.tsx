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
import { BackgroundBeams } from "@/components/ui/background-beams";


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
      <div className="flex-col">
        <div className="flex w-full h-[3rem] items-center px-4 relative shadow-xl">
          <MainNav className="mx-6" />
          <Button variant="ghost">
            <Link to="/profile">Profile</Link>
          </Button>
        </div>
      </div>
      <div className="mx-auto flex flex-col justify-center space-y-6 w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">User Information</h2>
            </CardHeader>
            <CardContent>
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
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="mt-4"
                  >
                    Logout
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
};

export default Profile;