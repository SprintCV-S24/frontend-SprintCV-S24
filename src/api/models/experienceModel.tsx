import { ExperienceType } from "@/api/models/interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface ExperienceServerType extends ExperienceType {
  _id: string;
  user: string;
}

export interface ExperienceServerExplicitType extends ExperienceServerType {
	type: resumeItemTypes.EXPERIENCE;
}
