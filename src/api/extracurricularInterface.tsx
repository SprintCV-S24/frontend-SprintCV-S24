import { ActivitiesType } from "@/interfaces/interfaces";
import { handleJsonResponse } from "./responseHelpers";

// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/activities`;

export const createActivity = async (activity: ActivitiesType, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
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
  const response = await fetch(`${BACKEND_ROUTE}/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
