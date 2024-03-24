import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "@/api/resumeItemInterface";
import { getAllResumes, getResumeById } from "@/api/resumeInterface";

export const useGetAllItems = (token: string | undefined) => {
  console.log("This is being called.")
  return useQuery({
    queryKey: ["items"],
    enabled: !!token,
    queryFn: async () => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await getAllItems(token);
    },
  });
};

export const useGetAllResumes = (token: string | undefined) => {
  return useQuery({
    queryKey: ["resumes"],
    enabled: !!token,
    queryFn: async () => {
      if (token === undefined) {
        throw new Error("Token is undefined");
      }
      return await getAllResumes(token);
    },
  });
};

export const useGetResume = (token: string | undefined, resumeId: string | undefined) => {
  return useQuery({
    queryKey: ["resumes", { id: resumeId }],
    enabled: !!token,
    queryFn: async () => {
      if (token === undefined || resumeId === undefined) {
        throw new Error("Token is undefined");
      }
      return await getResumeById(resumeId, token);
    },
  });
};
