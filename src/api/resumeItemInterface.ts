import { getAllActivities } from "./activityInterface";
import { getAllEducation } from "./educationInterface";
import { getAllExperience } from "./experienceInterface";
import { getAllHeadings } from "./headerInterface";
import { getAllProjects } from "./projectInterface";
import { getAllSectionHeadings } from "./sectionHeadingInterface";
import { getAllSkills } from "./skillInterface";
import { BaseItem } from "./models/interfaces";
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

export const deleteItem = async (itemType: resumeItemTypes, itemId: string, token: string) => {
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
      default:
        throw new Error("Invalid item type");
    }
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};
