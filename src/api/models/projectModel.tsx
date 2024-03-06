import { ProjectsType } from "@/api/models/interfaces";

export interface ProjectServerType extends ProjectsType {
  _id: string;
  user: string;
}
