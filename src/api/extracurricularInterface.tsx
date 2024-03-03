import { ActivitiesType } from "./models/extracurricularModel";
import { handleJsonResponse } from "./responseHelpers";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/forms`;

export const createActivity = async (
  activity: ActivitiesType,
  token: string,
) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}/events`, {
    method: "POST",
    body: JSON.stringify(activity),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

export const getActivityById = async (fireID: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/byID/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
