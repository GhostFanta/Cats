import React from "react";
import "./briefCard.scss";

class BriefCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="card brief-card">
          <div className="card-body">
            <h5 className="card-title">Abyssinian</h5>
            <h6 className="card-subtitle mb-2 text-muted">Egypt</h6>
            <small className="text-danger">
              Active, Energetic, Independent, Intelligent, Gentle
            </small>
            <p className="card-text mt-2">
              The Abyssinian is easy to care for, and a joy to have in your
              home. They’re affectionate cats and love both people and other
              animals.
            </p>
            <a href="#" className="card-link text-secondary">
              See More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default BriefCard;
