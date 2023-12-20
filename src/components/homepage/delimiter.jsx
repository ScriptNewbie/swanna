import React from "react";

function Delimiter({ index, lastIndex }) {
  return <>{index < lastIndex ? <div className="linia"></div> : <br />}</>;
}

export default Delimiter;
