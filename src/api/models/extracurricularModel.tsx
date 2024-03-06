import { BaseItem } from "./baseItem";


export interface ActivitiesType {
  _id: string;
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}

export interface ActivitiesData extends BaseItem {
  user: string;
  itemName: string;
  bullets: string[];
  title: string;
  subtitle: string;
  year: string;
  location: string;
}