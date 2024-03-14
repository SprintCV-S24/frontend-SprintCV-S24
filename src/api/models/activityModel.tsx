import { ActivitiesType } from "@/api/models/interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface ActivitiesServerType extends ActivitiesType {
  _id: string;
  user: string;
}

export interface ActivitiesServerExplicitType extends ActivitiesServerType {
	type: resumeItemTypes.ACTIVITY;
}