import { HeadingsType } from "@/api/models/interfaces";
import { resumeItemTypes } from "./resumeItemTypes";

export interface HeaderItem {
  item: string;
  href: string | null;
}

export interface HeadingServerType extends HeadingsType {
  _id: string;
  user: string;
}

export interface HeadingServerExplicitType extends HeadingServerType {
	type: resumeItemTypes.HEADING;
}
