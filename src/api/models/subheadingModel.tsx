import { SectionHeadingsType } from "@/api/models/interfaces";

export interface SectionHeadingServerType extends SectionHeadingsType {
  _id: string;
  user: string;
}
