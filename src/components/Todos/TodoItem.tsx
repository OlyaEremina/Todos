import React, { useContext, useState } from "react";
import { TodoType, TodoTypeId } from "./types";
import { TodosContext } from "./context";

const TodoItem = ({ todo }: { todo: TodoType }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [updaitingId, setUpdaitingId] = useState<TodoTypeId | null>(null);
  const [updateInputText, setUpdateInputText] = useState<string>("");

  const checkboxChangeHandle = (value: TodoTypeId): void => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === value) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const InputChangeHandle: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setUpdateInputText(event.target.value);
  };

  const saveChangeTodo = (): void => {
    if (updaitingId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === updaitingId ? { ...todo, text: updateInputText } : todo
        )
      );
      setUpdaitingId(null);
    }
  };

  const divUpdateTodoHandle = (value: TodoType): void => {
    setUpdaitingId(value.id);
    setUpdateInputText(value.text);
  };

  const todoDeleteHandle = (value: TodoTypeId): void => {
    setTodos(todos.filter((todo) => todo.id !== value));
  };

  return (
    <>
      <div className="one-todo-container equal-width">
        <input
          id={`one-todo-${todo.id}`}
          onChange={() => checkboxChangeHandle(todo.id)}
          type="checkbox"
          checked={todo.completed}
        />
        <label htmlFor={`one-todo-${todo.id}`}></label>
        {updaitingId === todo.id ? (
          <div>
            <input
              value={updateInputText}
              onChange={InputChangeHandle}
              type="text"
            />
            <button onClick={saveChangeTodo} type="button">
              Save
            </button>
          </div>
        ) : (
          <div
            onClick={() => divUpdateTodoHandle(todo)}
            className={`text-todo ${
              todo.completed ? "strikethrough-text" : ""
            }`}
          >
            {todo.text}
          </div>
        )}
        <button onClick={() => todoDeleteHandle(todo.id)}>X</button>
      </div>
    </>
  );
};

export default TodoItem;
