import React from "react";
import "./detailCardPlaceHolder.scss";

const DetailCardPlaceHolder = () => {
  return (
    <div className="detail-card-placeholder">
      <div className="detail-card-head">
        <br />
        <br />
        <br />
      </div>
      <div className="divider" />
      <div className="detail-card-content overflow-auto">
        <img
          src="http://placekitten.com/200/200"
          className="rounded mx-auto d-block"
          alt="..."
        />
        <h3 className="mt-3">Kittens are on the way...</h3>
      </div>
    </div>
  );
};

export default DetailCardPlaceHolder;
