import { createContext } from "react";
import { Context } from "./types";

const initialContext: Context = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = createContext<Context>(initialContext);
