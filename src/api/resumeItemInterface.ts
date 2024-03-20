import { getAllActivities } from "./activityInterface";
import { getAllEducation } from "./educationInterface";
import { getAllExperience } from "./experienceInterface";
import { getAllHeadings } from "./headerInterface";
import { getAllProjects } from "./projectInterface";
import { getAllSectionHeadings } from "./sectionHeadingInterface";
import { getAllSkills } from "./skillInterface";

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
