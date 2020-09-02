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
        <div className="flex flex-row align-items-center justify-content-center">
          <h3 className="mt-3 text-center">
            Furry friends are on the way...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DetailCardPlaceHolder;
