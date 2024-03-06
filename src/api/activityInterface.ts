import { ActivitiesType } from "@/interfaces/interfaces";
import { handleJsonResponse } from "./responseHelpers";

// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/activities`;

// POST an activity item
export const createActivity = async (
  activity: ActivitiesType,
  token: string,
) => {
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

// GET all activity
export const getAllActivity = async (token: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET one activity item
export const getActivityById = async (itemId: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

