import { BaseItem } from "./baseItem";

export interface HeaderItem {
  item: string;
  href: string | null;
}

export interface HeadingType {
  _id: string;
  user: string;
  itemName: string;
  name: string;
  items: HeaderItem[];
}

export interface HeadingData extends BaseItem {
  user: string;
  itemName: string;
  name: string;
  items: HeaderItem[];
}

