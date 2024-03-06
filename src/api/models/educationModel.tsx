import { BaseItem } from "./baseItem";

export interface EducationType {
  _id: string;
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  location: string;
  year: string;
}

export interface EducationData extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  location: string;
  year: string;
}