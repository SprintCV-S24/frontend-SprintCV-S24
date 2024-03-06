import { BaseItem } from "./baseItem";


export interface SectionHeadingType {
  _id: string;
  user: string;
  itemName: string;
  title: string;
}

export interface SectionHeadingData extends BaseItem {
  user: string;
  itemName: string;
  title: string;
}