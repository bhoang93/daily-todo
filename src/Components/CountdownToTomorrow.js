import React from "react";
import moment from "moment";

const timeUntilTomorrow = () => {
  let tomorrow = moment()
    .endOf("day")
    .fromNow()
    .split(" ");
  return `You have ${tomorrow[1]} ${tomorrow[2]} to complete these tasks.`;
};

const CountdownToTomorrow = ({ percentDone }) => {
  return (
    <div
      style={{
        position: "fixed",
        margin: "auto",
        left: 0,
        right: 0,
        bottom: 20
      }}
    >
      {percentDone === "100" ? (
        <h2>All tasks complete. Good job!</h2>
      ) : (
        <h2>
          <span>⏰</span>
          {timeUntilTomorrow()}
        </h2>
      )}
    </div>
  );
};

export default CountdownToTomorrow;
