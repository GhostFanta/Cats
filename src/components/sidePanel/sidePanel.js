import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getBreedDetail,
  getBreedsBySearch,
} from "../../moduels/panel/panel.store";
import PropTypes from "prop-types";
import ShowMore from "@tedconf/react-show-more";

import { getBreeds, getRecentSearches } from "../../moduels/panel/panel.store";
import "./sidePanel.scss";

/**
 * @return {null}
 */
const Breeds = ({ breeds }) => {
  const dispatch = useDispatch();
  const checkDetail = (breedName) => {
    dispatch(getBreedDetail(breedName));
  };
  if (!breeds) {
    return <ClipLoader />;
  } else {
    if (breeds && Object.keys(breeds).length !== 0) {
      return (
        <ShowMore items={breeds} by={3}>
          {({ current, onMore }) => (
            <React.Fragment>
              <ul className="side-panel-breeds overflow-auto">
                {current.map((item) => (
                  <li key={item} onClick={() => checkDetail(item)}>
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

const RecentSearches = ({ recentSearches }) => {
  const dispatch = useDispatch();
  const search = (breedName) => {
    dispatch(getBreedsBySearch(breedName));
  };
  if (!recentSearches) {
    return <ClipLoader />;
  } else if (recentSearches && Object.keys(recentSearches).length !== 0) {
    return (
      <ShowMore items={recentSearches} by={3}>
        {({ current, onMore }) => (
          <React.Fragment>
            <ul className="side-panel-breeds overflow-auto">
              {current
                .filter((a, b) => current.indexOf(a) === b)
                .map((item) => (
                  <li key={item} onClick={() => search(item)}>
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
    this.getRecentSearch = this.props.getRecentSearch.bind(this);
    this.state = {
      recentSearches: props.recentSearches,
      sortBy: props.sortBy,
      breeds: props.breeds,
      loading: props.obj,
    };
  }

  componentDidMount() {
    this.getBreeds();
    this.getRecentSearch();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.recentSearches !== this.props.recentSearches) {
      this.setState({ recentSearches: this.props.recentSearches });
    }
  }

  render() {
    return (
      <div className="side-panel">
        <div className="recent-search">
          <small className="font-weight-bold mb-3">My recent searches:</small>
          <ul className="mt-3">
            <RecentSearches recentSearches={this.state.recentSearches} />
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
    recentSearches: state.panel.recentSearches,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreeds: () => {
      return dispatch(getBreeds());
    },
    getRecentSearch: () => dispatch(getRecentSearches()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(sidePanel);
