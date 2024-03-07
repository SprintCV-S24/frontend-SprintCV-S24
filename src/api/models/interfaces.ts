export interface HeadingComponent {
  item: string;
  href: string | null;
}

export interface BaseItem {}

// Interface for Contact details document
export interface HeadingsType extends BaseItem {
  user: string;
  itemName: string;
  name: string;
  items: HeadingComponent[];
}

// Interface for Education document
export interface EducationType extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  location: string;
  year: string;
}

// Interface for Experience document
export interface ExperienceType extends BaseItem  {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  date: string;
  location: string;
}

// Interface for Project document
export interface ProjectsType extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  technologies?: string;
  year: string;
}

// Interface for Skills document
export interface SkillsType extends BaseItem {
  user: string;
  itemName: string;
  title: string;
  description: string;
}

// Interface for Activities document
export interface ActivitiesType extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}

// Interface for Section Heading document
export interface SectionHeadingsType extends BaseItem {
  user: string;
  itemName: string;
  title: string;
}

export interface SkillsType extends BaseItem {
	user: string;
	itemName: string;
  title: string;
  description: string;
}
