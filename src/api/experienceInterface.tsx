import { ExperienceType } from "./models/experienceModel";
import { handleJsonResponse } from "./responseHelpers";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/forms`;

export const createEvent = async (
  experience: ExperienceType,
  token: string,
) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/events`, {
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
  const response = await fetch(`${BACKEND_ROUTE}/byID/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
