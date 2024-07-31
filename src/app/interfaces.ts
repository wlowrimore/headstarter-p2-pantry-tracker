export interface Ingredients {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  notes: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Column {
  id: "name" | "unit" | "quantity" | "notes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
