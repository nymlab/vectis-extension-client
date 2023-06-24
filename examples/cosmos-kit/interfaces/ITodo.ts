import { TodoStatus } from "./TodoStatus";

export interface ITodo {
  id: number;
  description: string;
  status: TodoStatus;
}
