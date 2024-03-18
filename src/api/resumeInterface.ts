import { ResumesType } from "./models/interfaces";
import { ResumesServerType } from "./models/resumeModel";
import { handleJsonResponse } from "./responseHelpers";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/resumes`;

export const getAllResumes = async (token: string): Promise<ResumesServerType[]> => {
	const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
}

export const getResumeById = async (itemId: string, token: string): Promise<ResumesServerType> => {
	const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
}

export const createResume = async (itemName: string, token: string): Promise<ResumesServerType> => {
  const resume = {
    itemName,
    itemIds: [],
  };

  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(resume),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

export const updateResume = async (
  updatedFields: Partial<ResumesType>,
  resumeId: string,
  token: string,
): Promise<ResumesServerType> => {

  const response = await fetch(`${BACKEND_ROUTE}/${resumeId}`, {
    method: "PUT",
    body: JSON.stringify(updatedFields),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
