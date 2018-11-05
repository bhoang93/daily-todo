import React from "react";

import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { Scrollbars } from "react-custom-scrollbars";
import Modal from "./Modal";
import "./ToDoList.css";

class ToDoList extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      item: ""
    };
  }

  confirmRemoveItem = item => {
    this.setState({ modalOpen: false });
    this.props.removeTask(item);
  };

  onClickRemoveButton = item => {
    this.setState({ modalOpen: true, item });
  };

  render() {
    const {
      toDoItems,
      completeTask,
      completedItems,
      addTaskBackToList
    } = this.props;
    return (
      <div>
        {this.state.modalOpen && (
          <Modal>
            <div className="modalBox">
              <p>Are you sure you want to remove "{this.state.item}"?</p>
              <div className="buttons">
                <Button
                  color="success"
                  onClick={() => this.confirmRemoveItem(this.state.item)}
                >
                  Yes
                </Button>
                <Button
                  color="danger"
                  onClick={() => this.setState({ modalOpen: false })}
                >
                  No
                </Button>
              </div>
            </div>
            <div className="modalBg" />
          </Modal>
        )}
        <Scrollbars style={{ height: 500 }}>
          <div className="ToDoList">
            <ListGroup
              style={{
                width: "90%",
                margin: "auto",
                paddingTop: "10px"
              }}
            >
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
                    <Button
                      color="danger"
                      onClick={() => this.onClickRemoveButton(item)}
                    >
                      Remove
                    </Button>
                  </ListGroupItem>
                );
              })}
              {completedItems.map(item => {
                return (
                  <ListGroupItem
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      display: "flex"
                    }}
                    key={item}
                    className="completedItem"
                  >
                    <span className="col">{item} ✓</span>
                    <Button
                      color="warning"
                      onClick={() => addTaskBackToList(item)}
                    >
                      Undo
                    </Button>
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

export default ToDoList;
