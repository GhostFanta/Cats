import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Switcher from "../../components/switcher/switcher";
import { connect } from "react-redux";
import "./header.scss";
import { getBreedsBySearch } from "../../moduels/panel/panel.store";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearch() {
    this.props.getBreedsBySearch(this.state.searchTerm);
  }

  handleEnter(e) {
    if (e.key === "Enter") {
      this.props.getBreedsBySearch(this.state.searchTerm);
      return;
    }
  }

  handleChange(e) {
    this.setState({ searchTerm: e.target.value });
  }

  render() {
    return (
      <div className="header">
        <nav className="app-header navbar navbar-light">
          <div className="row">
            <div className="wrapper">
              <img src={logo} alt="logo" width="130" height="50" />
            </div>
            <ul className="nav navbar-nav">
              <li className="active">
                <NavLink to="/search"> Search Panel</NavLink>
              </li>
              <li className="active">
                <NavLink to="/gallery"> Gallery</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <div className="flex flex-row ml-3">
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control"
              value={this.state.searchTerm}
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            />
            <button
              className="ml-2 btn btn-primary"
              onClick={this.handleSearch}
            >
              Find Cat
            </button>
            {/*<Switcher />*/}
          </div>
        </div>
        <div className="divider" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    briefInfoList: state.panel.briefInfoList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBreedsBySearch: (searchTerm) => dispatch(getBreedsBySearch(searchTerm)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
