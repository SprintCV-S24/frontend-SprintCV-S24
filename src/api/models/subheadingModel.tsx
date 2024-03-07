import { SectionHeadingsType } from "@/api/models/interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface SectionHeadingServerType extends SectionHeadingsType {
  _id: string;
  user: string;
}

export interface SectionHeadingServerExplicitType extends SectionHeadingServerType {
  type: resumeItemTypes.SECTIONHEADING;
}
