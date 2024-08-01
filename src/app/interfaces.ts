export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface Ingredients {
  id: string;
  name: string;
  unit: string;
  quantity: string;
  notes: string;
}

export interface EditingModalProps {
  item: Ingredients | null;
  onClose: () => void;
  onSave: (updatedItem: Ingredients) => void;
}

export interface Column {
  id: "name" | "unit" | "quantity" | "notes";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
