import {
  HeadingsType,
  EducationType,
  ExperienceType,
  ProjectsType,
  SkillsType,
  ActivitiesType,
  SectionHeadingsType,
} from "@/api/models/interfaces";

export const fakeHeading: HeadingsType = {
  user: "John",
  itemName: "DOE",
  name: "Some Student",
  items: [
    { item: "Hello", href: null },
    { item: "meow", href: null },
    { item: "dog.com", href: "http://dog.com" },
  ],
};

export const fakeEducation: EducationType = {
  user: "", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [],
  title: "Some High school",
  subtitle: "BS CS",
  year: "Exp 2023",
  location: "Los Angeles, CA",
};

export const fakeExperience: ExperienceType = {
  user: "Jane Doe", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [
    "Developed and implemented efficient algorithms i am the experience",
    "Collaborated with a cross-functional team",
    "Improved system performance by 20%",
  ],
  title: "Software Engineer",
  subtitle: "Acme Corporation",
  date: "2022 - 2023",
  location: "Los Angeles, CA",
};

export const fakeProject: ProjectsType = {
  user: "Jane Doe", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [
    "This is the project section part of resume aalkjdf;lksjd;aja;dskja;kdj;falskjdf;laksjdf;lkasjdf",
    "Collaborated with a cross-functional team",
    "Improved system performance by 20%",
  ],
  title: "Resume Builder",
  technologies: "React node express json",
  year: "2023",
};

export const fakeSkill: SkillsType = {
  user: "string",
  itemName: "string",
  title: "Langauges",
  description: "Arabic, Persian, Kurdish",
};

export const fakeActivity: ActivitiesType = {
  user: "Jane Doe", // Irrelevant for our test
  itemName: "Resume Item", // Irrelevant for our test
  bullets: [
    "I amm the activity section i am working correctly",
    "have you live your life ",
    "Or been lived by it",
  ],
  title: "This is the actiity i am tired of fixing this bug ",
  subtitle: "GDP",
  year: "2022",
  location: "Los Angeles, CA",
};

// Fake Object for the purpose of testing.
export const fakeHeadr: SectionHeadingsType = {
  user: "Mine",
  itemName: "Yours",
  title: "KickBoxing",
};
