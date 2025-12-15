export type Task = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
  status?: string[];
  dueDate?: string;
};
