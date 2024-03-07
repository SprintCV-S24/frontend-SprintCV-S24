import { getAllActivities } from "./activityInterface";
import { getAllEducation } from "./educationInterface";
import { getAllExperience } from "./experienceInterface";
import { getAllHeadings } from "./headerInterface";
import { getAllProjects } from "./projectInterface";
import { getAllSectionHeadings } from "./sectionHeadingInterface";
import { getAllSkills } from "./skillInterface";

export const getAllItems = async (token: string) => {
  const results = await Promise.all([
    getAllActivities(token),
    getAllEducation(token),
    getAllExperience(token),
    getAllHeadings(token),
    getAllProjects(token),
    getAllSectionHeadings(token),
    getAllSkills(token),
  ]);

  // Combine all the arrays into one
  const combinedResults = results.flat();
  console.log("HEREEEEEE");
  console.log(combinedResults);

  return combinedResults;
};
