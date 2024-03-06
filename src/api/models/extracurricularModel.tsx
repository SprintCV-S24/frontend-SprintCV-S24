import { ActivitiesType } from "@/interfaces/interfaces";

export interface ActivitiesServerType extends ActivitiesType {
  _id: string;
  user: string;
}
