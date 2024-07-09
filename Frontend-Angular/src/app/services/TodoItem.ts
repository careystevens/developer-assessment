// Using a type for the todo item rather than any

// Could generate types from swagger api, but just coding for the purposes of this demo

export interface TodoItem {
  id?: string;
  description: string;
  isCompleted?: boolean;
}