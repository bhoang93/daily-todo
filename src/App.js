import React, { Component } from "react";
import "./App.css";

import { Button } from "reactstrap";
import moment from "moment";

import ToDoList from "./Components/ToDoList";
import ProgressBar from "./Components/ProgressBar";

const localforage = require("localforage");

class App extends Component {
  constructor(props) {
    super(props);

    this.inputField = React.createRef();

    this.state = {
      toDoItems: [],
      completedItems: [],
      totalDays: 1,
      percentDone: 0
    };
  }

  componentDidMount() {
    localforage
      .getItem("toDoItems")
      .then(list => {
        if (list !== null) {
          this.toDoItems = list;
        }
      })
      .then(() => {
        this.setState({
          toDoItems: this.toDoItems
        });
      });

    localforage
      .getItem("completedItems")
      .then(list => {
        if (list !== null) {
          this.completedItems = list;
        }
      })
      .then(() => {
        this.setState({
          completedItems: this.completedItems
        });
      })
      .then(() => this.progressUpdate());

    let day = moment().format("dddd");
    let oldDay;
    localforage.getItem("today").then(day => (oldDay = day));
    if (day !== oldDay) {
      localforage.getItem("count").then(count => {
        count === null
          ? localforage.setItem("count", 1)
          : localforage.setItem("count", count + 1);
        this.setState({ count: count + 1 });
      });

      this.toDoItems = this.toDoItems.concat(this.completedItems);
      this.completedItems = [];
      localforage.setItem("today", day).then(() =>
        this.setState(
          {
            toDoItems: this.toDoItems,
            completedItems: this.completedItems
          },
          () => this.progressUpdate()
        )
      );
    }
  }

  toDoItems = [];
  completedItems = [];
  today = "";

  updateArrays = () => {
    this.setState(
      {
        toDoItems: this.toDoItems,
        completedItems: this.completedItems
      },
      () => this.storeArrays()
    );
  };

  storeArrays = () => {
    localforage.setItem("toDoItems", this.state.toDoItems);
    localforage.setItem("completedItems", this.state.completedItems);
    this.progressUpdate();
  };

  progressUpdate = () => {
    let value =
      (this.completedItems.length /
        (this.toDoItems.length + this.completedItems.length)) *
      100;
    if (isNaN(value)) {
      value = 0;
    }
    this.setState(prevState => {
      return { percentDone: value.toFixed(0) };
    });
  };

  addNewTask = event => {
    if (event.key === "Enter" || event === "click") {
      let input = this.inputField.current.value;
      if (input !== "" && this.toDoItems.indexOf(input) === -1) {
        this.toDoItems = [...this.toDoItems, input];
        this.updateArrays();
        this.inputField.current.value = "";
      }
    }
  };

  removeTask = removedTask => {
    let newArray = this.toDoItems.filter(task => task !== removedTask);
    this.toDoItems = newArray;
    this.updateArrays();
  };

  completeTask = item => {
    this.completedItems = [...this.completedItems, item];
    this.removeTask(item);
  };

  addTaskBackToList = item => {
    this.toDoItems.push(item);
    let newArray = this.toDoItems.filter(task => task !== item);
    this.completedItems = newArray;
    this.updateArrays();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <span role="img" aria-label="clipboard">
              📋
            </span>Daily To Do List
          </h1>
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
          <Button
            outline
            color="primary"
            onClick={() => this.addNewTask("click")}
          >
            Submit
          </Button>
        </div>

        <ToDoList
          completeTask={this.completeTask}
          removeTask={this.removeTask}
          toDoItems={this.state.toDoItems}
          completedItems={this.state.completedItems}
          addTaskBackToList={this.addTaskBackToList}
        />

        <div className="tracker">{this.state.totalDays} Day(s) Used</div>
      </div>
    );
  }
}

export default App;
