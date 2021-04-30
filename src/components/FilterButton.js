import React from "react";

// Filter button component
function FilterButton(props) {
  return (
    <button
    type="button"
    className="btn toggle-btn fs-15"
    aria-pressed={props.isPressed}
    onClick={() => props.setFilter(props.title)}
  >
    <span className="visually-hidden">Show </span>
    <span>{props.title}</span>
    <span className="visually-hidden"> tasks</span>
  </button>
  );
}

export default FilterButton;