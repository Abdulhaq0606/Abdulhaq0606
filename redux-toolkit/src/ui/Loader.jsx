import React from "react";

function Loader() {
  return (
    <div>
      <div
        className="spinner-border text-primary d-block mx-auto"
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
