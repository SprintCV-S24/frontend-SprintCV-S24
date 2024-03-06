import { SectionHeadingsType } from "@/api/models/interfaces";
import { handleJsonResponse } from "./responseHelpers";

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
export const getAllSectionHeadings = async (token: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET one section heading item
export const getSectionHeadingById = async (itemId: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
