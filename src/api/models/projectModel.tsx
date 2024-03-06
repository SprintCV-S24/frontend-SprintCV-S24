import { ProjectsType } from "@/interfaces/interfaces";

export interface ProjectServerType extends ProjectsType{
  _id: string;
  user: string;
}