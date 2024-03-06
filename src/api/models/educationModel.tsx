import { EducationType } from "@/interfaces/interfaces";

export interface EducationServerType extends EducationType{
  _id: string;
  user: string;
}