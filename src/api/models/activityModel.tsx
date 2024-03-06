import { ActivitiesType } from "@/api/models/interfaces";

export interface ActivitiesServerType extends ActivitiesType {
  _id: string;
  user: string;
}
