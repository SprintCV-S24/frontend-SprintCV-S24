import { SectionHeadingsType } from "@/api/models/interfaces";
import { SectionHeadingServerExplicitType } from "./models/subheadingModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/sectionHeadings`;

// POST an section heading item
export const createSectionHeading = async (
  sectionHeading: SectionHeadingsType,
  token: string,
) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(sectionHeading),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET all section headings
export const getAllSectionHeadings = async (token: string): Promise<SectionHeadingServerExplicitType[]> => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const sectionHeadings = await handleJsonResponse(response);
	return sectionHeadings.map((sectionHeading: SectionHeadingsType) => ({
    ...sectionHeading,
    type: resumeItemTypes.SECTIONHEADING,
  }));
};

// GET one section heading item
export const getSectionHeadingById = async (itemId: string, token: string): Promise<SectionHeadingServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const sectionHeading = await handleJsonResponse(response);
	return {
		...sectionHeading,
		type: resumeItemTypes.SECTIONHEADING,
	};
};

// Delete section heading item
export const deleteSectionHeading = async (itemId: string, token: string): Promise<SectionHeadingServerExplicitType | null> => {
	const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
		method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
}