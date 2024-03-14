import { ProjectsType } from "@/api/models/interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface ProjectServerType extends ProjectsType {
  _id: string;
  user: string;
}

export interface ProjectServerExplicitType extends ProjectServerType {
	type: resumeItemTypes.PROJECT;
}
