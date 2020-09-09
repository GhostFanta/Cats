import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Switcher from "../../components/switcher/switcher";
import { connect } from "react-redux";
import "./header.scss";
import { getBreedsBySearch } from "../../moduels/panel/panel.store";

import styled from "styled-components";

const SearchInput = styled.input`
font-size: 14px;
line-height: 21px;
text-decoration: none solid rgb(73, 80, 87);
vertical-align: middle;
word-spacing: 0px;
width: 500px;

background-color:  #F2F2F2;
background-position: 0% 0%;
color:  #495057;

transform: none;
transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
box-sizing: border-box;
border-left: 1px solid $cyan !important;
border-top: 1px solid $cyan !important;
border-bottom: 1px solid $cyan !important;
border-right: none !important;
border-radius: 0 !important;
`;

const SearchButton = styled.button`
  border-left: none !important;
  border-radius: 0 !important;
  background-color: black !important;
  
`

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
            <div className="flex flex-row ml-3 justify-content-center align-content-center">
              <div className="input-group mb-4">
                <SearchInput
                    type="text"
                    className="form-control"
                    placeholder="Breed you like~"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                <SearchButton
                    className="btn btn-primary"
                    onClick={this.handleSearch}
                >
                  Find Cat
                </SearchButton>
              </div>
            </div>
          </div>
        </nav>
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
