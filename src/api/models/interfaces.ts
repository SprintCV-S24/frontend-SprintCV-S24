import { ActivitiesServerExplicitType } from "./activityModel";
import { EducationServerExplicitType } from "./educationModel";
import { ExperienceServerExplicitType } from "./experienceModel";
import { HeadingServerExplicitType } from "./headingModel";
import { ProjectServerExplicitType } from "./projectModel";
import { SkillServerExplicitType } from "./skillModel";
import { SectionHeadingServerExplicitType } from "./subheadingModel";

export type BaseItem =
  | ActivitiesServerExplicitType
  | EducationServerExplicitType
  | ExperienceServerExplicitType
  | HeadingServerExplicitType
  | ProjectServerExplicitType
  | SkillServerExplicitType
  | SectionHeadingServerExplicitType;

export interface HeadingComponent {
  item: string;
  href: string | null;
}

// Interface for Contact details document
export interface HeadingsType {
  user: string;
  itemName: string;
  name: string;
  items: HeadingComponent[];
}

// Interface for Education document
export interface EducationType {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  location: string;
  year: string;
}

// Interface for Experience document
export interface ExperienceType {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}

// Interface for Project document
export interface ProjectsType {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  technologies?: string;
  year: string;
}

// Interface for Skills document
export interface SkillsType {
  user: string;
  itemName: string;
  title: string;
  description: string;
}

// Interface for Activities document
export interface ActivitiesType {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}

// Interface for Section Heading document
export interface SectionHeadingsType {
  user: string;
  itemName: string;
  title: string;
}

export interface SkillsType {
  user: string;
  itemName: string;
  title: string;
  description: string;
}

export interface ResumesType {
	itemName: string;
  itemIds: string[];
  templateId: string | null;
}

export interface BugType {
  bugTitle: string;
  bugDesc: string,
  bugBrowser: string,
}