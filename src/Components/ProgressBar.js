import React from "react";

import { Progress } from "reactstrap";

const ProgressBar = ({ percentDone }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <div className="text-center">
        {percentDone + "%"}
        {percentDone === "100" && (
          <span role="img" aria-label="trophy">
            🏆
          </span>
        )}
      </div>
      <Progress style={{ width: "60%", margin: "auto" }} value={percentDone} />
    </div>
  );
};

export default ProgressBar;
