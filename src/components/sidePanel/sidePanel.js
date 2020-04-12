import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ShowMore from "@tedconf/react-show-more";

import { getBreeds } from "../../moduels/panel/panel.store";
import "./sidePanel.scss";

/**
 * @return {null}
 */
const Breeds = ({ loading, breeds }) => {
  if (loading && loading.breeds) {
    return <ClipLoader />;
  } else {
    if (breeds && Object.keys(breeds).length !== 0) {
      return (
        <ShowMore items={breeds} by={3}>
          {({ current, onMore }) => (
            <React.Fragment>
              <ul className="side-panel-breeds overflow-auto">
                {current.map((item) => (
                  <li key={item}>
                    <small>{item}</small>
                  </li>
                ))}
              </ul>
              <button
                className="btn text-info"
                disabled={!onMore}
                onClick={() => {
                  if (!!onMore) onMore();
                }}
              >
                <small>More...</small>
              </button>
            </React.Fragment>
          )}
        </ShowMore>
      );
    } else {
      return null;
    }
  }
};

function SortBys(loading, sortBys) {
  if (loading.sorts) {
    return <ClipLoader />;
  } else {
    sortBys.map((approach) => {
      return (
        <div>
          <br />
          <small>{approach}</small>
        </div>
      );
    });
  }
}

class sidePanel extends React.Component {
  static propTypes = {
    breeds: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.getBreeds = this.props.getBreeds.bind(this);
    this.state = {
      recentSearches: props.recentSearches,
      sortBy: props.sortBy,
      breeds: props.breeds,
      loading: props.obj,
    };
  }

  componentDidMount() {
    this.getBreeds();
  }

  render() {
    return (
      <div className="side-panel">
        <div className="recent-search">
          <small className="font-weight-bold mb-3">My recent searches:</small>
          <ul className="mt-3">
            {/*{this.recentSearches.map((search) => {*/}
            {/*  return (*/}
            {/*    <li>*/}
            {/*      <small>{search}</small>*/}
            {/*    </li>*/}
            {/*  );*/}
            {/*})}*/}
          </ul>
        </div>
        <div className="sort-by">
          <small className="font-weight-bold mb-3">Sort by:</small>
          {/*<SortBys loading={this.state.loading} sortBys={this.state.sortBy} />*/}
        </div>
        <div className="breed">
          <small className="font-weight-bold mb-3">Breed:</small>
          <Breeds loading={this.props.loading} breeds={this.props.breeds} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    breeds: state.panel.breeds,
    sortBy: state.sortBy,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreeds: () => {
      return dispatch(getBreeds());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sidePanel);
