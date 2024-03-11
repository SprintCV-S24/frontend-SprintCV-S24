import { getAllActivities, updateActivity } from "./activityInterface";
import { getAllEducation, updateEducation } from "./educationInterface";
import { getAllExperience, updateExperience } from "./experienceInterface";
import { getAllHeadings, updateHeading } from "./headerInterface";
import { getAllProjects, updateProject } from "./projectInterface";
import {
  getAllSectionHeadings,
  updateSectionHeading,
} from "./sectionHeadingInterface";
import { deleteSkill, getAllSkills, updateSkill } from "./skillInterface";
import {
  ActivitiesType,
  BaseItem,
  EducationType,
  ExperienceType,
  HeadingsType,
  ProjectsType,
  SectionHeadingsType,
  SkillsType,
} from "./models/interfaces";
import { resumeItemTypes } from "./models/resumeItemTypes";
import { deleteActivity } from "./activityInterface";
import { deleteEducation } from "./educationInterface";
import { deleteExperience } from "./experienceInterface";
import { deleteHeading } from "./headerInterface";
import { deleteSectionHeading } from "./sectionHeadingInterface";
import { deleteProject } from "./projectInterface";

export const getAllItems = async (token: string) => {
  const results = await Promise.all([
    getAllHeadings(token),
    getAllSectionHeadings(token),
    getAllActivities(token),
    getAllEducation(token),
    getAllExperience(token),
    getAllProjects(token),
  ]);

  // Combine all the arrays into one
  const combinedResults = results.flat();

  return combinedResults;
};

export type itemUpdatedFields =
  | Partial<ActivitiesType>
  | Partial<EducationType>
  | Partial<ExperienceType>
  | Partial<HeadingsType>
  | Partial<ProjectsType>
  | Partial<SectionHeadingsType>
  | Partial<SkillsType>;

export const updateItem = async (
  itemType: resumeItemTypes,
  itemId: string,
  updatedFields: itemUpdatedFields,
  token: string,
) => {
  try {
    console.log(updatedFields);
    if (token === undefined) {
      throw new Error("Token is undefined");
    }

    console.log("updateItem token: ", token);
    switch (itemType) {
      case resumeItemTypes.HEADING:
        await updateHeading(updatedFields, itemId, token);
        break;
      case resumeItemTypes.SECTIONHEADING:
        await updateSectionHeading(updatedFields, itemId, token);
        break;
      case resumeItemTypes.EXPERIENCE:
        await updateExperience(updatedFields, itemId, token);
        break;
      case resumeItemTypes.EDUCATION:
        await updateEducation(updatedFields, itemId, token);
        break;
      case resumeItemTypes.ACTIVITY:
        await updateActivity(updatedFields, itemId, token);
        break;
      case resumeItemTypes.PROJECT:
        await updateProject(updatedFields, itemId, token);
        break;
      case resumeItemTypes.SKILL:
        await updateSkill(updatedFields, itemId, token);
        break;
      default:
        throw new Error("Invalid item type");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

export const deleteItem = async (
  itemType: resumeItemTypes,
  itemId: string,
  token: string,
) => {
  try {
    if (token === undefined) {
      throw new Error("Token is undefined");
    }

    switch (itemType) {
      case resumeItemTypes.HEADING:
        await deleteHeading(itemId, token);
        break;
      case resumeItemTypes.SECTIONHEADING:
        await deleteSectionHeading(itemId, token);
        break;
      case resumeItemTypes.EXPERIENCE:
        await deleteExperience(itemId, token);
        break;
      case resumeItemTypes.EDUCATION:
        await deleteEducation(itemId, token);
        break;
      case resumeItemTypes.ACTIVITY:
        await deleteActivity(itemId, token);
        break;
      case resumeItemTypes.PROJECT:
        await deleteProject(itemId, token);
        break;
      case resumeItemTypes.SKILL:
        await deleteSkill(itemId, token);
        break;
      default:
        throw new Error("Invalid item type");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
