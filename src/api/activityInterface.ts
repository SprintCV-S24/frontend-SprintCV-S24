import { ActivitiesType } from "@/api/models/interfaces";
import { ActivitiesServerExplicitType } from "./models/activityModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

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

// GET all activities
export const getAllActivities = async (token: string): Promise<ActivitiesServerExplicitType[]> => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const activities = await handleJsonResponse(response);
	return activities.map((activity: ActivitiesType) => ({
    ...activity,
    type: resumeItemTypes.ACTIVITY,
  }));
};

// GET one activity item
export const getActivityById = async (itemId: string, token: string): Promise<ActivitiesServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const activity = await handleJsonResponse(response);
	return {
		...activity,
		type: resumeItemTypes.ACTIVITY,
	};
};

