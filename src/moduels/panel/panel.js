import React from "react";
import BriefCard from "../../components/briefCard/briefCard";
import DetailCard from "../../components/detailCard/detailCard";
import Header from "../../components/header/header";
import SidePanel from "../../components/sidePanel/sidePanel";
import { getBriefInfoList, getBreedDetail } from "./panel.store";
import "./panel.scss";

import { connect } from "react-redux";

const BriefCardList = ({ infoList, handleClick }) => {
  if (infoList && infoList.length !== 0) {
    return (
      <React.Fragment>
        {infoList.map((info) => (
          <BriefCard
            key={info.name}
            name={info.name}
            origin={info.origin}
            temperament={info.temperament}
            description={info.description}
            handleClick={() => handleClick(info.name)}
          />
        ))}
      </React.Fragment>
    );
  } else {
    return null;
  }
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.getBreedInfoList = this.props.getBreedInfoList.bind(this);
  }

  componentDidMount() {
    this.getBreedInfoList();
  }

  render() {
    const sortBy = [""];

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SidePanel
                recentSearch={this.props.recentSearches}
                sortBy={sortBy}
                breeds={this.props.breeds}
                loading={this.props.loading}
              />
            </div>
            <div className="col-10">
              <div className="row">
                <div className="cat-list col-5">
                  <BriefCardList
                    infoList={this.props.briefInfoList}
                    handleClick={this.props.getBreedDetail}
                  />
                </div>
                <div className="cat-detail col-6">
                  {this.props.currentBreed ? (
                    <DetailCard
                      currentBreed={this.props.currentBreed}
                      breedImages={this.props.breedImages}
                    />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    briefInfoList: state.panel.briefInfoList,
    currentBreed: state.panel.currentBreed,
    breedImages: state.panel.breedImages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreedInfoList: () => dispatch(getBriefInfoList()),
    getBreedDetail: (breedName) => dispatch(getBreedDetail(breedName)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
