interface HeadingItem {
  item: string;
  href: string | null;
}

export interface HeadingType {
  _id: string;
  user: string;
  itemName: string;
  name: string;
  items: HeadingItem[];
}
