import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleView } from "../components.store";
import "./switcher.scss";

const Switcher = () => {
  const checked = useSelector((state) => state.components.tableView);
  const dispatch = useDispatch();
  const toggleChecked = () => {
    dispatch(toggleView());
  };
  return (
    <div className="switcher ml-auto mr-2">
      <div className="custom-control custom-switch ml-2">
        <input
          type="checkbox"
          className="custom-control-input"
          id="switch1"
          value={checked}
          onClick={toggleChecked}
        />
        <label className="custom-control-label" htmlFor="switch1"/>
        <span>Table View</span>
      </div>
    </div>
  );
};

export default Switcher;
