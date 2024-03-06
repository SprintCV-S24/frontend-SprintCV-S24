import { HeadingsType } from "@/interfaces/interfaces";

export interface HeaderItem {
  item: string;
  href: string | null;
}

export interface HeadingServerType extends HeadingsType { 
  _id: string;
  user: string;
}
