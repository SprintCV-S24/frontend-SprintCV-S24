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
import { ResumesType } from "@/api/models/interfaces";
import { useQueryClient } from "@tanstack/react-query";
import { useAddResume } from "@/hooks/mutations";
import { generateFullResume, generatedLatexCode } from "../latexUtils/latexString";
import { headerLatex, mockEducationEntry2, experMock, projectDataMock, skillsMock, activityMock } from "../latexUtils/latexStringTwo";

const Home: React.FC = () => {
  const { currentUser } = useAuth();
  const [storedToken, setStoredToken] = useState<string | undefined>(undefined);
  const { data, isLoading, isError, isSuccess } = useGetAllResumes(storedToken);
  const navigate = useNavigate();
	const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    isError: isAddResumeError,
  } = useAddResume(queryClient, storedToken);

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

    // console.log(generatedLatexCode);
    // console.log(headerLatex);
  //   console.log(experMock); // double checked and works as wanted 
     console.log(activityMock);
    //console.log(testHeaderLatex2);
    // console.log(headerLatex); double checked behaves correctly 
  //  console.log(mockEducationEntry2); //double checked behaves correctly 
     // console.log(projectDataMock); //double checked behaves correctly 
    // console.log(skillsMock); //double checked behaves correctly 
    
  }, [currentUser]);

	const onClickAddResume = () => {
    const blankResume: ResumesType = {
      itemName: "Untitled resume",
			itemIds: [],
			templateId: null,
    };

    mutate(blankResume, {
			onSuccess: (response) => {
				console.log("response:", response);
				navigate(`/editor/${response._id}`);
			},
			onError: () => {
				//TODO
			}
		});
  };

  return (
    <>
      <div className="md:hidden"></div>
      <div className="flex-col">
        <div className="flex w-full h-16 items-center px-4 relative shadow-xl">
          <Button className="absolute right-4 top-4" variant="ghost">
            <Link to="/profile">Profile</Link>
          </Button>
          <MainNav className="mx-6" />
          <div className="ml-auto flex items-center space-x-4"></div>
        </div>
      </div>

      <div className="lg:p-8 bg-[#E7ECEF] h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
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
              <Add
                onClick={onClickAddResume}
              ></Add>
              {isSuccess &&
                data.map((resume: ResumesServerType) => {
                  return (
                    <ResumeSelector
                      resume={resume}
                      key={resume._id}
                    ></ResumeSelector>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
