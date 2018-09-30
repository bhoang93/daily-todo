import React from "react";
import "./ToDoList.css";
import { Button, ListGroup, ListGroupItem } from "reactstrap";

class ToDoList extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onTaskCompletion = () => {
    this.props.completeTask();
  };

  render() {
    return (
      <ListGroup style={{ width: "90%", margin: "auto" }} className="listGroup">
        {this.props.toDoItems.map(item => {
          return (
            <ListGroupItem
              style={{ display: "flex" }}
              className="toDoItem"
              key={item.id}
            >
              <span className="col">{item}</span>
              <Button
                color="success"
                onClick={() => this.props.completeTask(item)}
              >
                Complete
              </Button>
              <Button
                color="danger"
                onClick={() => this.props.removeTask(item)}
              >
                Remove
              </Button>
            </ListGroupItem>
          );
        })}
        {this.props.completedItems.map(item => {
          return (
            <ListGroupItem
              key={item}
              style={{ backgroundColor: "#28a745", color: "white" }}
            >
              <span>{item} ✓</span>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

export default ToDoList;
