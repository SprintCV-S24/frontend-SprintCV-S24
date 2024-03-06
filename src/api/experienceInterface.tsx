import { ExperienceType } from "@/interfaces/interfaces";
import { handleJsonResponse } from "./responseHelpers";


// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/experience`;

export const createExperience = async (
  experience: ExperienceType,
  token: string,
) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(experience),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

export const getExperienceById = async (fireID: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
