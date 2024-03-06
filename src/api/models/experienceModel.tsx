import { ExperienceType } from "@/interfaces/interfaces";

export interface ExperienceServerType extends ExperienceType {
  _id: string;
  user: string;
}