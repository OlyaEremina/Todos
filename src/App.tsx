import React, { useState } from "react";
import { TodosContext } from "./components/Todos/context";
import { TodoType } from "./components/Todos/types";
import Todos from "./components/Todos/Todos";

function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      <Todos />
    </TodosContext.Provider>
  );
}

export default App;
