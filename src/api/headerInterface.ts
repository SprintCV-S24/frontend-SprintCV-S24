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

// update an header item
export const updateHeading = async (
	updatedFields: Partial<HeadingsType>,
	itemId: string,
	token: string,
  ): Promise<HeadingServerExplicitType> => {
	const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
	  method: "PUT",
	  body: JSON.stringify(updatedFields),
	  headers: {
		Authorization: `Bearer ${token}`,
	  },
	});
	const header = await handleJsonResponse(response);
	return {
	  ...header,
	  type: resumeItemTypes.HEADING,
	};
  };

// Delete heading item
export const deleteHeading = async (itemId: string, token: string): Promise<HeadingServerExplicitType | null> => {
	const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
		method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
}