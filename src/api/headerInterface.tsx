import { HeadingData, HeaderItem } from "./models/headingModel";
import { handleJsonResponse } from "./responseHelpers";

// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/headings`;

export const createHeading = async (
  heading: HeadingData,
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

export const getHeadingById = async (fireID: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};