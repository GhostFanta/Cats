import React from "react";
import PropTypes from "prop-types";
import BriefCard from "../../components/briefCard/briefCard";
import DetailCard from "../../components/detailCard/detailCard";
import Header from "../../components/header/header";
import SidePanel from "../../components/sidePanel/sidePanel";
import "./panel.scss";

class Panel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-2">
              <SidePanel />
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

export default Panel;
