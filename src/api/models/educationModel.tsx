import { EducationType } from "@/api/models/interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface EducationServerType extends EducationType {
  _id: string;
  user: string;
}

export interface EducationServerExplicitType extends EducationServerType {
	type: resumeItemTypes.EDUCATION;
}