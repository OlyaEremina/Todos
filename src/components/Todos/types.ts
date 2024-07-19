export type TodoType = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoTypeId = TodoType["id"];

export type Context = {
  todos: TodoType[] | [];
  setTodos: (todos: TodoType[] | []) => void;
};

export type PageType = "All" | "Completed" | "Active";
