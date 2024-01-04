import React, { useState } from "react";

function Input({ label, type = "text", state, setSate }) {
  return (
    <div>
      <div className="form-floating">
        {/* <label htmlFor="floatingUser">{label}</label> */}
        <input
          type={type}
          className="form-control"
          // id="floatingUser"
          value={state}
          onChange={(e) => setSate(e.target.value)}
          placeholder={label}
        />
      </div>
    </div>
  );
}

export default Input;
