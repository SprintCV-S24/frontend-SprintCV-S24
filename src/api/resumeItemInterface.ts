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

export const deleteItem = (item: BaseItem, itemId: string, token: string) => {
  console.log("DELETING AN ITEM");
  if (item.type == resumeItemTypes.HEADING) {
    console.log("DELETING HEADING");
    deleteHeading(itemId, token);
  }
  if (item.type == resumeItemTypes.SECTIONHEADING) {
    deleteSectionHeading(itemId, token);
  }
  if (item.type == resumeItemTypes.EXPERIENCE) {
    deleteExperience(itemId, token);
  }
  if (item.type == resumeItemTypes.EDUCATION) {
    deleteEducation(itemId, token);
  }
  if (item.type == resumeItemTypes.ACTIVITY) {
    deleteActivity(itemId, token);
  }
  if (item.type == resumeItemTypes.PROJECT) {
    deleteProject(itemId, token);
  }
};