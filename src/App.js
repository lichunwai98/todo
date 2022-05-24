import "./main.css";
import TodoItem from "./TodoItem";
import TodoFooter from "./TodoFooter";
import React, { useState, useEffect } from "react";

export default function App(props) {
  var main;
  var footer;
  var ALL_TODOS = "all";
  var ACTIVE_TODOS = "active";
  var COMPLETED_TODOS = "completed";
  var ENTER_KEY = 13;
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [nowShowing, setNowShowing] = useState(ALL_TODOS);

  useEffect(() => {
    const todoData = localStorage.getItem("todoList");
    if (todoData) {
      setTodos(JSON.parse(todoData));
    }
  }, []);
  function toggleAllCheckBox(event) {
    var checked = event.target.checked;
    var array = [...todos];
    array.map((todo) => (todo.completed = checked));
    setNewTodos(array);
  }
  function toggleCheckBox(event, targetItem) {
    const array = [...todos];
    const targetTodo = array.find((todo) => todo.id === targetItem.id);
    targetTodo.completed = !targetTodo.completed;
    setNewTodos(array);
  }
  function save(titleValue) {
    const array = [...todos];
    const targetTodo = array.find((todo) => todo.id === editing);
    if (targetTodo) {
      targetTodo.title = titleValue;
      setNewTodos(array);
    }
    setEditing(null);
  }
  function edit(targetItem) {
    setEditing(targetItem.id);
  }

  function cancel() {
    setEditing(null);
  }
  function destroy(targetItem) {
    var array = [...todos];
    array = array.filter((todo) => todo !== targetItem);
    setNewTodos(array);
  }

  function handleNewTodoKeyDown(event) {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    event.preventDefault();

    var value = newTodo.trim();

    if (value) {
      let newTodos = [
        ...todos,
        { id: todos.length + 1, title: newTodo, completed: false }
      ];
      setNewTodos(newTodos);
      setNewTodo("");
    }
  }

  function inputTextChange(event) {
    setNewTodo(event.target.value);
  }

  function clearCompleted() {
    var array = todos.filter((todo) => !todo.completed);
    setNewTodos(array);
  }

  function setNewTodos(newTodos) {
    setTodos(newTodos);
    localStorage.setItem("todoList", JSON.stringify(newTodos));
  }

  var shownTodos = todos.filter(function (todo) {
    switch (nowShowing) {
      case ACTIVE_TODOS:
        return !todo.completed;
      case COMPLETED_TODOS:
        return todo.completed;
      default:
        return true;
    }
  }, this);

  var todoItems = shownTodos.map(function (todo) {
    return (
      <TodoItem
        key={todo.id}
        todo={todo}
        editing={editing === todo.id}
        onToggle={(event, targetItem) => toggleCheckBox(event, targetItem)}
        onEdit={(targetItem) => edit(targetItem)}
        onSave={(value) => save(value)}
        onCancel={() => cancel()}
        onDestroy={(targetItem) => destroy(targetItem)}
      />
    );
  }, this);

  var activeTodoCount = todos.reduce(function (accum, todo) {
    return todo.completed ? accum : accum + 1;
  }, 0);
  var completedCount = todos.length - activeTodoCount;

  if (activeTodoCount || completedCount) {
    footer = (
      <TodoFooter
        count={activeTodoCount}
        completedCount={completedCount}
        nowShowing={nowShowing}
        onClearCompleted={() => clearCompleted()}
      />
    );
  }

  if (todos.length) {
    main = (
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={(event) => toggleAllCheckBox(event)}
          checked={activeTodoCount === 0}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">{todoItems}</ul>
      </section>
    );
  }

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onKeyDown={(event) => handleNewTodoKeyDown(event)}
          onChange={(event) => inputTextChange(event)}
          autoFocus={true}
        />
      </header>
      {main}
      {footer}
    </div>
  );
}
