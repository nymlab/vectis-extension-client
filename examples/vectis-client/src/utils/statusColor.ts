import { TodoStatus } from "../interfaces/TodoStatus";

export const statusColor = {
  [TodoStatus.pending]: "indigo",
  [TodoStatus.in_progress]: "amber",
  [TodoStatus.done]: "teal",
  [TodoStatus.cancelled]: "pink",
};
