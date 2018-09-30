import React from "react";

import { Progress } from "reactstrap";

const ProgressBar = ({ percentDone }) => {
  return (
    <div>
      <div className="text-center">{percentDone + "%"}</div>
      <Progress style={{ width: "60%", margin: "auto" }} value={percentDone} />
    </div>
  );
};

export default ProgressBar;
