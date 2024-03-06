import { BaseItem } from "./baseItem";

export interface ExperienceType {
  _id: string;
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}

export interface ExperienceData extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}