export default function TodoFooter(props) {
  var clearButton = null;
  var ALL_TODOS = "all";
  var ACTIVE_TODOS = "active";
  var COMPLETED_TODOS = "completed";
  if (props.completedCount > 0) {
    clearButton = (
      <button className="clear-completed" onClick={props.onClearCompleted}>
        Clear completed
      </button>
    );
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> left
      </span>
      <ul className="filters">
        <li>
          <a
            className={props.nowShowing === ALL_TODOS ? "selected" : ""}
            href="#/"
          >
            All
          </a>
        </li>{" "}
        <li>
          <a
            className={props.nowShowing === ACTIVE_TODOS ? "selected" : ""}
            href="#/active"
          >
            Active
          </a>
        </li>{" "}
        <li>
          <a
            className={props.nowShowing === COMPLETED_TODOS ? "selected" : ""}
            href="#/completed"
          >
            Completed
          </a>
        </li>
      </ul>
      {clearButton}
    </footer>
  );
}
