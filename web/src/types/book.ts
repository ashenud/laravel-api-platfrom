import type { Item } from "./item";

export interface Book extends Item {
  book?: string;
  condition?: string;
  title?: string;
  author?: string;
  rating?: number;
}
