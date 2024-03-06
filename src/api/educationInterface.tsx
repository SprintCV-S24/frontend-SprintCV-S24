import { EducationData } from "./models/educationModel";
import { handleJsonResponse } from "./responseHelpers";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/education`;

export const createEducation = async (
  education: EducationData,
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

export const getEducationById = async (fireID: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
