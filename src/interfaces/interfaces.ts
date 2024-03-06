interface HeadingItem {
  item: string;
  href: string | null;
}

// Interface for Contact details document
export interface HeadingsType {
  user: string;
  itemName: string;
  name: string;
  items: HeadingItem[];
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
  date: string;
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
