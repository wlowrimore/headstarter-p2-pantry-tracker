export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expirationDate: Date;
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}
