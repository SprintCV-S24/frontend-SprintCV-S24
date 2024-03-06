import { ExperienceType } from "@/api/models/interfaces";

export interface ExperienceServerType extends ExperienceType {
  _id: string;
  user: string;
}
