import type { Item } from "./item";

export interface Company extends Item {
  name?: string;
  type?: string;
  owner?: string;
}
