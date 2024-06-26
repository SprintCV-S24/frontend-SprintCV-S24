import { SkillsType } from "@/api/models/interfaces";
import { SkillServerExplicitType } from "./models/skillModel";
import { handleJsonResponse } from "./responseHelpers";
import { resumeItemTypes } from "./models/resumeItemTypes";

const BACKEND_ROUTE = `${import.meta.env.VITE_BACKEND_ROUTE}/skills`;

// POST an skill item
export const createSkill = async (skill: SkillsType, token: string) => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    method: "POST",
    body: JSON.stringify(skill),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
};

// GET all skills
export const getAllSkills = async (token: string): Promise<SkillServerExplicitType[]> => {
  const response = await fetch(`${BACKEND_ROUTE}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const skills = await handleJsonResponse(response);
  return skills.map((skill: SkillsType) => ({
    ...skill,
    type: resumeItemTypes.SKILL,
  }));
};

// GET one skill item
export const getSkillById = async (itemId: string, token: string): Promise<SkillServerExplicitType> => {
  const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const skill = await handleJsonResponse(response);
	return {
		...skill,
		type: resumeItemTypes.SKILL,
	};
};

// update a skill item
export const updateSkill = async (
	updatedFields: Partial<SkillsType>,
	itemId: string,
	token: string,
  ): Promise<SkillServerExplicitType> => {
	const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
	  method: "PUT",
	  body: JSON.stringify(updatedFields),
	  headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	  },
	});
	const skill = await handleJsonResponse(response);
	return {
	  ...skill,
	  type: resumeItemTypes.SKILL,
	};
  };

// Delete skill item
export const deleteSkill = async (itemId: string, token: string): Promise<SkillServerExplicitType | null> => {
	const response = await fetch(`${BACKEND_ROUTE}/${itemId}`, {
		method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await handleJsonResponse(response);
}