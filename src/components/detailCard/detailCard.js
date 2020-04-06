import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./detailCard.scss";

class detailCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="detail-card">
        <div className="detail-card-head">
          <h3>British Short Hair</h3>
          <h6>Great Britain</h6>
          <div className="row">
            <button className="btn btn-primary btn-sm mr-2 ml-2">
              Check out wiki
            </button>
            <button className="btn btn-secondary btn-sm">Like</button>
          </div>
        </div>
        <div className="divider" />
        <div className="detail-card-content overflow-auto">
          <h6 className="mt-1">Great Britain</h6>
          <small className="font-weight-bold">Breed Description:</small>
          <p className="mb-3">
            The Abyssinian is easy to care for, and a joy to have in your home.
            They’re affectionate cats and love both people and other animals.
          </p>
          <div className="mt-3 ml-2">
            <div className="row">
              <small className="mr-2 label">Adaptability:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Affection Level:</small>
              <ProgressBar className="progress" now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Dog Friendly:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Child Friendly:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Dog Friendly:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Energy Level:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Grooming:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Health Issues:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Intelligence:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Shedding Level:</small>
              <ProgressBar className="progress " now={90} />
            </div>
            <div className="row">
              <small className="mr-2 label">Social Needs:</small>
              <ProgressBar className="progress" now={90} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default detailCard;
