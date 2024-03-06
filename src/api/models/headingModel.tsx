export interface HeaderItem {
  item: string;
  href: string | null;
}

export interface HeadingData {
  _id: string;
  user: string;
  itemName: string;
  name: string;
  items: HeaderItem[];
}
