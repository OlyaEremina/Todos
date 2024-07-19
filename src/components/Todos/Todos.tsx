import React, { useContext, useEffect, useState } from "react";
import "./Todos.css";
import { TodosContext } from "./context";
import TodoItem from "./TodoItem";
import { PageType } from "./types";

const Todos = () => {
  const [inputAdd, setInputAdd] = useState<string>("");
  const [activeTodosCount, setActiveTodosCount] = useState(0);
  const { todos, setTodos } = useContext(TodosContext);
  const [currentPage, setCurrentPage] = useState<PageType>("All");

  const inputAddChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setInputAdd(event.target.value);
  };

  const todosChangeHandle: React.FormEventHandler<HTMLFormElement> = (
    event
  ) => {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), text: inputAdd, completed: false }]);
    setInputAdd("");
    setActiveTodosCount(activeTodosCount + 1);
  };

  const completedTodosDeleteHandle: () => void = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
    setActiveTodosCount(newTodos.length);
  };

  const filteredTodos =
    currentPage === "All"
      ? todos
      : currentPage === "Completed"
      ? todos.filter((todo) => todo.completed)
      : todos.filter((todo) => !todo.completed);

  useEffect(() => {
    setActiveTodosCount(filteredTodos.filter((todo) => !todo.completed).length);
  }, [filteredTodos]);

  return (
    <div className="container">
      <span className="title">todos</span>
      <div className="todos-container">
        <form onSubmit={todosChangeHandle} className="form equal-width">
          <input
            id="input-form"
            value={inputAdd}
            onChange={inputAddChangeHandle}
            type="text"
            placeholder="✓   What needs to be done?"
          />
          <button type="submit">Add</button>
        </form>

        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        <div className="page-change-buttons">
          <span>{activeTodosCount} items left</span>
          <span>
            <button
              type="button"
              onClick={() => setCurrentPage("All")}
              className={currentPage === "All" ? "active" : "inactive"}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage("Completed")}
              className={currentPage === "Completed" ? "active" : "inactive"}
            >
              Completed
            </button>
            <button
              type="button"
              onClick={() => setCurrentPage("Active")}
              className={currentPage === "Active" ? "active" : "inactive"}
            >
              Active
            </button>
          </span>
          <button
            type="button"
            onClick={completedTodosDeleteHandle}
            className="clear"
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todos;
