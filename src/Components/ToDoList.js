import React from "react";

import { Button, ListGroup, ListGroupItem } from "reactstrap";

const ToDoList = ({
  toDoItems,
  completedItems,
  removeTask,
  completeTask,
  addTaskBackToList
}) => {
  return (
    <ListGroup style={{ width: "90%", margin: "auto", paddingTop: "10px" }}>
      {toDoItems.map(item => {
        return (
          <ListGroupItem
            style={{ display: "flex" }}
            className="toDoItem"
            key={item}
          >
            <span className="col">{item}</span>
            <Button color="success" onClick={() => completeTask(item)}>
              Complete
            </Button>
            <Button color="danger" onClick={() => removeTask(item)}>
              Remove
            </Button>
          </ListGroupItem>
        );
      })}
      {completedItems.map(item => {
        return (
          <ListGroupItem
            key={item}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              display: "flex"
            }}
          >
            <span className="col">{item} ✓</span>
            <Button color="warning" onClick={() => addTaskBackToList(item)}>
              Undo
            </Button>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default ToDoList;
