import React, { useState, useRef } from "react";

export default function TodoItem(props) {
  const [editText, setEditText] = useState("");
  const inputRef = useRef(null);
  var ESCAPE_KEY = 27;
  var ENTER_KEY = 13;

  function handleEdit() {
    props.onEdit(props.todo);
    setEditText(props.todo.title);
  }

  function handleSubmit(event) {
    var value = editText.trim();
    if (value) {
      props.onSave(value);
      setEditText(value);
    } else {
      props.onDestroy(props.todo);
    }
  }
  function handleKeyDown(event) {
    if (event.which === ESCAPE_KEY) {
      setEditText(props.todo.title);
      props.onCancel();
    } else if (event.which === ENTER_KEY) {
      handleSubmit(event);
    }
  }
  function handleChange(event) {
    if (props.editing) {
      setEditText(event.target.value);
    }
  }
  return (
    <li
      className={
        (props.todo.completed ? "completed " : " ") +
        (props.editing ? "editing" : " ")
      }
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.completed}
          onChange={(event) => props.onToggle(event, props.todo)}
        />
        <label onDoubleClick={() => handleEdit()}>{props.todo.title}</label>
        <button className="destroy" />
      </div>
      <input
        ref={inputRef}
        value={editText}
        onBlur={(event) => handleSubmit(event)}
        onChange={(event) => handleChange(event)}
        onKeyDown={(event) => handleKeyDown(event)}
        type="text"
        className="edit"
      />
    </li>
  );
}
