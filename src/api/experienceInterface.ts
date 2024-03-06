import { ExperienceType } from "@/interfaces/interfaces";
import { handleJsonResponse } from "./responseHelpers";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/experience`;

// POST an experience item
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

// GET all experience
export const getAllExperience = async (token: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET one experience item
export const getExperienceById = async (itemId: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
