import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { Button } from "reactstrap";

import ToDoList from "./Components/ToDoList";
import ProgressBar from "./Components/ProgressBar";

const localforage = require("localforage");

class App extends Component {
  constructor(props) {
    super(props);

    this.inputField = React.createRef();

    this.state = {
      list: [],
      completedItems: [],
      today: "",
      percentDone: 0
    };
  }

  toDoItems = [];
  completedItems = [];

  componentWillMount() {
    // localforage.getItem("toDoItems").then(list => {
    //   this.toDoItems = list;
    // });
    // localforage.getItem("completedItems").then(list => {
    //   this.completedItems = list;
    // });
    this.setState({
      list: this.toDoItems,
      completedItems: this.completedItems
    });
  }

  storeArrays = () => {
    localforage.setItem("toDoItems", this.toDoItems);
    localforage.setItem("completedItems", this.completedItems);
    this.progressUpdate();
  };

  progressUpdate = () => {
    let value =
      (this.completedItems.length /
        (this.toDoItems.length + this.completedItems.length)) *
      100;
    this.setState(prevState => {
      return { percentDone: value.toFixed(0) };
    });
  };

  addNewTask = event => {
    if (event.key === "Enter" || event === "click") {
      let input = this.inputField.current.value;
      if (input !== "") {
        this.toDoItems.push(input);
        this.setState(
          {
            list: this.toDoItems
          },
          () => this.storeArrays()
        );
        this.inputField.current.value = "";
      }
    }
  };

  removeTask = key => {
    let index = this.toDoItems.indexOf(key);
    this.toDoItems.splice(index, 1);
    this.setState(
      {
        list: this.toDoItems
      },
      () => this.storeArrays()
    );
  };

  completeTask = item => {
    this.completedItems.push(item);
    this.removeTask(item);
    this.setState(
      prevState => {
        return {
          completedItems: this.completedItems
        };
      },
      () => this.storeArrays()
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Daily To Do List</h1>
        </header>
        <ProgressBar percentDone={this.state.percentDone} />
        <hr />
        <div className="submitForm">
          <input
            className="inputField"
            placeholder="Add new task"
            type="text"
            ref={this.inputField}
            onKeyPress={this.addNewTask}
          />
          <Button color="primary" onClick={() => this.addNewTask("click")}>
            Submit
          </Button>
        </div>
        <ToDoList
          completeTask={this.completeTask}
          removeTask={this.removeTask}
          toDoItems={this.state.list}
          completedItems={this.state.completedItems}
        />
      </div>
    );
  }
}

export default App;
