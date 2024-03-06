import { ProjectData } from "./models/projectModel";
import { handleJsonResponse } from "./responseHelpers";

// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/project`;

export const createProject = async (
  project: ProjectData,
  token: string,
) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(project),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

export const getProjectById = async (fireID: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${fireID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
