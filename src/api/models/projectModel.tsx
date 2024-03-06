import { BaseItem } from "./baseItem";

export interface ProjectType {
  _id: string;
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  technologies?: string;
  year: string;
}

export interface ProjectData extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle?: string;
  year: string;
}

