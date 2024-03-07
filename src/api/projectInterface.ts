import { ProjectsType } from "@/api/models/interfaces";
import { ProjectServerExplicitType } from "./models/projectModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

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
export const getAllProjects = async (token: string): Promise<ProjectServerExplicitType[]> => {
  console.log("GETTING PROJECTS");

  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const projects = await handleJsonResponse(response);
  console.log(projects);
	return projects.map((project: ProjectsType) => ({
    ...project,
    type: resumeItemTypes.PROJECT,
  }));
};

// GET one project item
export const getProjectById = async (itemId: string, token: string): Promise<ProjectServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const project = await handleJsonResponse(response);
	return {
		...project,
		type: resumeItemTypes.PROJECT,
	};
};
