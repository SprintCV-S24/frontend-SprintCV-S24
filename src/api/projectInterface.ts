import { ProjectsType } from "@/interfaces/interfaces";
import { handleJsonResponse } from "./responseHelpers";

// TODO: Check this route
const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/projects`;

// POST a project item
export const createProject = async (
  project: ProjectsType,
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

// GET all projects
export const getAllProjects = async (token: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET one project item
export const getProjectById = async (itemId: string, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};
