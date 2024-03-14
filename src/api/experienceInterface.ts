import { ExperienceType } from "@/api/models/interfaces";
import { ExperienceServerExplicitType } from "./models/experienceModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

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
export const getAllExperience = async (token: string): Promise<ExperienceServerExplicitType[]> => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const experiences = await handleJsonResponse(response);
	return experiences.map((experience: ExperienceType) => ({
    ...experience,
    type: resumeItemTypes.EXPERIENCE,
  }));
};

// GET one experience item
export const getExperienceById = async (itemId: string, token: string): Promise<ExperienceServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const experience = await handleJsonResponse(response);
	return {
		...experience,
		type: resumeItemTypes.EXPERIENCE,
	};
};
