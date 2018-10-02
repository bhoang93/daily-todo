import React, { Component } from "react";
import "./App.css";

import { Button } from "reactstrap";
import moment from "moment";

import ToDoList from "./Components/ToDoList";
import ProgressBar from "./Components/ProgressBar";
import CountdownToTomorrow from "./Components/CountdownToTomorrow";

const localforage = require("localforage");

class App extends Component {
  constructor(props) {
    super(props);

    this.inputField = React.createRef();

    this.state = {
      toDoItems: [],
      completedItems: [],
      today: "",
      percentDone: 0
    };
  }

  componentDidMount() {
    let utc = moment().format("MMM Do YY");

    if (utc !== this.state.today) {
      this.toDoItems = this.toDoItems.concat(this.completedItems);
      this.completedItems = [];
      localforage.setItem("today", utc);
    }

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

    localforage.getItem("today").then(day => {
      if (day !== null) {
        this.setState({ today: day });
      }
    });
  }

  getDataFromDb = (key, stateField, stateData) => {
    localforage
      .getItem(key)
      .then(data => {
        if (data !== null) {
          stateData = data;
        }
      })
      .then(() => {
        this.setState({
          [stateField]: stateData
        });
      });
  };

  toDoItems = [];
  completedItems = [];

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
      if (input !== "") {
        this.toDoItems.push(input);
        this.updateArrays();
        this.inputField.current.value = "";
      }
    }
  };

  removeTask = key => {
    let index = this.toDoItems.indexOf(key);
    this.toDoItems.splice(index, 1);
    this.updateArrays();
  };

  completeTask = item => {
    this.completedItems.push(item);
    this.removeTask(item);
  };

  addTaskBackToList = item => {
    this.toDoItems.push(item);
    let index = this.completedItems.indexOf(item);
    this.completedItems.splice(item, 1);
    this.updateArrays();
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <span>📋</span>Daily To Do List
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

        <CountdownToTomorrow percentDone={this.state.percentDone} />
      </div>
    );
  }
}

export default App;
