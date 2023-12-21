import React from "react";

function Delimiter({ index = 0, lastIndex = 1 }) {
  return <>{index < lastIndex ? <div className="linia"></div> : <br />}</>;
}

export default Delimiter;
