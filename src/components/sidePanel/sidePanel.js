import React from "react";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import "./sidePanel.scss";

function Breeds(loading, breeds) {
  if (loading.breeds) {
    return <ClipLoader />;
  } else {
    breeds.map((breed) => {
      return (
        <div>
          <br />
          <small>{breed}</small>
        </div>
      );
    });
  }
}

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
  constructor(props) {
    super(props);
    this.state = {
      recentSearches: props.recentSearches,
      sortBy: props.sortBy,
      breeds: props.breeds,
      loading: props.obj,
    };
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
          <Breeds loading={this.state.loading} breeds={this.state.breeds} />
        </div>
      </div>
    );
  }
}

export default sidePanel;
