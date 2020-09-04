import React from "react";
import { ProgressBar } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";
import "./detailCard.scss";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

class CustomCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (prevProps.images !== this.props.images) {
      this.setState({ images: this.props.images });
    }
  }

  render() {
    if (!this.state.images) {
      return <ClipLoader />;
    } else {
      return (
        <div className="flex flex-row justify-content-center align-content-center mt-5">
          <Carousel autoPlay className="carousel" key={this.state.images}>
            {this.state.images.map((image) => (
              <div key={image}>
                <img key={image} src={image} alt="" />
              </div>
            ))}
          </Carousel>
        </div>
      );
    }
  }
}

const CustomProgressBar = ({ now }) => {
  const calVal = (val) => {
    return (val / 5) * 100;
  };

  const percent = calVal(now);
  const variant = () => {
    if (now === 5) return "primary";
    if (now === 4) return "success";
    if (now === 3) return "warning";
    if (now === 2) return "secondary";
    if (now === 1) return "danger";
    return "primary";
  };
  return (
    <ProgressBar className={`progress`} variant={variant()} now={percent} />
  );
};

class detailCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBreed: this.props.currentBreed,
      images: this.props.breedImages,
    };
    this.clickWiki = this.clickWiki.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentBreed !== this.props.currentBreed) {
      this.setState({ currentBreed: this.props.currentBreed });
    }
    if (prevProps.breedImages !== this.props.breedImages) {
      this.setState({ images: this.props.breedImages });
    }
  }

  clickWiki() {
    window.open(this.state.currentBreed.wikipedia_url);
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
          {
            this.state.currentBreed.description ? (
                <p className="mb-3">{this.state.currentBreed.description}</p>
            ): (<p>No description available for this breed.</p>)
          }
          <div className="mt-3 ml-2">
              {
                this.state.currentBreed.adaptability ? (<div className="row">
                  <small className="mr-2 label">Adaptability:</small>
                  <CustomProgressBar now={this.state.currentBreed.adaptability} />
                </div>) : null
              }
            {
              this.state.currentBreed.affection_level ? (<div className="row">
                <small className="mr-2 label">Affection Level:</small>
                <CustomProgressBar
                    now={this.state.currentBreed.affection_level}
                />
              </div>) : null
            }
            {
                this.state.currentBreed.dog_friendly ? (
                    <div className="row">
                      <small className="mr-2 label">Dog Friendly:</small>
                      <CustomProgressBar now={this.state.currentBreed.dog_friendly} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.child_friendly ? (
                    <div className="row">
                      <small className="mr-2 label">Child Friendly:</small>
                      <CustomProgressBar now={this.state.currentBreed.child_friendly} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.energy_level ? (
                    <div className="row">
                      <small className="mr-2 label">Energy Level:</small>
                      <CustomProgressBar now={this.state.currentBreed.energy_level} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.gromming ? (
                    <div className="row">
                      <small className="mr-2 label">Grooming:</small>
                      <CustomProgressBar now={this.state.currentBreed.gromming} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.health_issues ? (
                    <div className="row">
                      <small className="mr-2 label">Health Issues:</small>
                      <CustomProgressBar now={this.state.currentBreed.health_issues} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.intelligence ? (
                    <div className="row">
                      <small className="mr-2 label">Intelligence:</small>
                      <CustomProgressBar now={this.state.currentBreed.intelligence} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.shedding_level ? (
                    <div className="row">
                      <small className="mr-2 label">Shedding Level:</small>
                      <CustomProgressBar now={this.state.currentBreed.shedding_level} />
                    </div>
                ) : null
            }
            {
                this.state.currentBreed.social_needs ? (
                    <div className="row">
                      <small className="mr-2 label">Social Needs:</small>
                      <CustomProgressBar now={this.state.currentBreed.social_needs} />
                    </div>
                ) : null
            }
          </div>
          <div>
            <CustomCarousel images={this.state.images} />
          </div>
        </div>
      </div>
    );
  }
}

export default detailCard;
