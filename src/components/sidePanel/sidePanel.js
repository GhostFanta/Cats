import React from "react";
import "./sidePanel.scss";

class sidePanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="side-panel">
        <div className="recent-search">
          <small className="font-weight-bold mb-3">My recent searches:</small>
          <ul className="mt-3">
            <li>
              <small>British short hair</small>
            </li>
            <li>
              <small>British short hair</small>
            </li>
            <li>
              <small>British short hair</small>
            </li>
            <li>
              <small>British short hair</small>
            </li>
            <li>
              <small>British short hair</small>
            </li>
            <li>
              <small>British short hair</small>
            </li>
          </ul>
        </div>
        <div className="sort-by">
          <small className="font-weight-bold mb-3">Sort by:</small>
          <br />
          <small>favorites </small>
          <br />
          <small>votes</small>
        </div>
        <div className="breed">
          <small className="font-weight-bold mb-3">Breed:</small>
          <br />
          <small>favorites </small>
          <br />
          <small>votes</small>
        </div>
      </div>
    );
  }
}

export default sidePanel;
