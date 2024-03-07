import { HeadingsType } from "@/api/models/interfaces";
import { HeadingServerExplicitType } from "./models/headingModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/headings`;

// POST an heading item
export const createHeading = async (
  heading: HeadingsType,
  token: string,
) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(heading),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET all headings
export const getAllHeadings = async (token: string): Promise<HeadingServerExplicitType[]> => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const headings = await handleJsonResponse(response);
	return headings.map((heading: HeadingsType) => ({
    ...heading,
    type: resumeItemTypes.HEADING,
  }));
};

// GET one heading item
export const getHeadingById = async (itemId: string, token: string): Promise<HeadingServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const heading = await handleJsonResponse(response);
	return {
		...heading,
		type: resumeItemTypes.HEADING,
	};
};