import { ResumesType } from "./interfaces";

export interface ResumesServerType extends ResumesType {
  _id: string;
  user: string;
}