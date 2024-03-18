import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { MainNav } from "../components/main-nav";
import { Button } from "@/components/ui/button";
import { Add } from "@/components/Add";
import { ResumeSelector } from "@/components/ResumeSelector";
import { useGetAllResumes } from "@/hooks/queries";
import { ResumesServerType } from "@/api/models/resumeModel";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, isSuccess } = useGetAllResumes(storedToken);
	const navigate = useNavigate();

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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 mx-2">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome!</h1>
            <p className="text-sm text-muted-foreground">
              Your current resumes are here!
            </p>
            <div
              className="w-full h-full grid gap-4 justify-center justify-items-center"
              style={{
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              }}
            >
							<Add onClick={()=>{navigate("/editor")}}></Add>
              {isSuccess &&
                data.map((resume: ResumesServerType) => {
                  return <ResumeSelector resume={resume}></ResumeSelector>;
                })}
              {/* <ResumeSelector></ResumeSelector> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
