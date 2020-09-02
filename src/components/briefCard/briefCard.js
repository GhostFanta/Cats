import React from "react";
import "./briefCard.scss";

const BriefCard = ({ name, origin, temperament, description, handleClick }) => {
  return (
    <div className="col-12">
      <div className="card brief-card" onClick={() => handleClick}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{origin}</h6>
          <small className="text-danger ml-auto">{temperament}</small>
          <p className="card-text mt-2">{description}</p>
          <a onClick={handleClick} className="card-link text-secondary">
            See More
          </a>
        </div>
      </div>
    </div>
  );
};

export default BriefCard;
