import { EducationType } from "@/api/models/interfaces";
import { EducationServerExplicitType } from "./models/educationModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/education`;

// POST an education item
export const createEducation = async (
  education: EducationType,
  token: string,
) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(education),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET all education
export const getAllEducation = async (token: string): Promise<EducationServerExplicitType[]> => {

  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const educations = await handleJsonResponse(response);

	return educations.map((education: EducationType) => ({
    ...education,
    type: resumeItemTypes.EDUCATION,
  }));
};

// GET one education item
export const getEducationById = async (itemId: string, token: string): Promise<EducationServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const education = await handleJsonResponse(response);
	return {
		...education,
		type: resumeItemTypes.EDUCATION,
	};
};
