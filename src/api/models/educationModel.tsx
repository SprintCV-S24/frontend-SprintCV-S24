import { EducationType } from "@/api/models/interfaces";

export interface EducationServerType extends EducationType {
  _id: string;
  user: string;
}
