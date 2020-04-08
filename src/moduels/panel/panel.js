import React from "react";
import PropTypes from "prop-types";
import BriefCard from "../../components/briefCard/briefCard";
import DetailCard from "../../components/detailCard/detailCard";
import Header from "../../components/header/header";
import SidePanel from "../../components/sidePanel/sidePanel";
import { getBreeds } from "./panel.store";
import "./panel.scss";

import { connect } from "react-redux";

class Panel extends React.Component {
  static propTypes = {
    getBreeds: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.getBreeds = this.props.getBreeds.bind(this);
  }

  componentDidMount() {
    this.getBreeds();
  }

  render() {
    const sortBy = [""];
    const breeds = [""];

    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SidePanel
                recentSearch={this.props.recentSearches}
                sortBy={sortBy}
                breeds={breeds}
                loading={this.props.loading}
              />
            </div>
            <div className="col-10">
              <div className="row">
                <div className="cat-list col-5">
                  <BriefCard />
                  <BriefCard />
                  <BriefCard />
                  <BriefCard />
                  <BriefCard />
                  <BriefCard />
                </div>
                <div className="cat-detail col-6">
                  <DetailCard />
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
    loading: state.loading,
    sortBy: state.sortBy,
    breeds: state.breeds,
    recentSearches: state.recentSearches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreeds: () => {
      return dispatch(getBreeds());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Panel);
