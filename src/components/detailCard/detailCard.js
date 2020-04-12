import React from "react";
import { ProgressBar } from "react-bootstrap";
import "./detailCard.scss";

class detailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreed: this.props.currentBreed,
    };
    this.clickWiki = this.clickWiki.bind(this);
    this.calVal = this.calVal.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentBreed !== this.props.currentBreed) {
      this.setState({ currentBreed: this.props.currentBreed });
    }
  }

  clickWiki() {
    window.open(this.state.currentBreed.wikipedia_url);
  }

  calVal(val){
    return val / 5 * 100;
  }

  render() {
    return (
      <div className="detail-card">
        <div className="detail-card-head">
          <h3>{this.state.currentBreed.name}</h3>
          <h6>{this.state.currentBreed.origin}</h6>
          <div className="row">
            <button
              className="btn btn-primary btn-sm mr-2 ml-2"
              onClick={() => this.clickWiki()}
            >
              Check out wiki
            </button>
            <button className="btn btn-secondary btn-sm">Like</button>
          </div>
        </div>
        <div className="divider" />
        <div className="detail-card-content overflow-auto">
          <h6 className="mt-1">{this.state.currentBreed.origin}</h6>
          <small className="font-weight-bold">Breed Description:</small>
          <p className="mb-3">{this.state.currentBreed.description}</p>
          <div className="mt-3 ml-2">
            <div className="row">
              <small className="mr-2 label">Adaptability:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.adaptability)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Affection Level:</small>
              <ProgressBar className="progress" now={this.calVal(this.state.currentBreed.affection_level)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Dog Friendly:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.dog_friendly)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Child Friendly:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.child_friendly)} />
            </div>

            <div className="row">
              <small className="mr-2 label">Energy Level:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.energy_level)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Grooming:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.gromming)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Health Issues:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.health_issues)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Intelligence:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.intelligence)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Shedding Level:</small>
              <ProgressBar className="progress " now={this.calVal(this.state.currentBreed.shedding_level)} />
            </div>
            <div className="row">
              <small className="mr-2 label">Social Needs:</small>
              <ProgressBar className="progress" now={this.calVal(this.state.currentBreed.social_needs)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default detailCard;
