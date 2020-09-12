import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
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
border-left: 1px solid black !important;
border-top: 1px solid black !important;
border-bottom: 1px solid black !important;
border-right: none !important;
border-radius: 0 !important;
`;

const SearchButton = styled.button`
  border-left: none !important;
  border-radius: 0 !important;
  background-color: black !important;
  color: white;
  &:hover {
    color: grey;
  }
`;

const AuthButton = styled.button`
  font-family: realtime_textbold, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  text-decoration: none solid rgb(0, 108, 255);
  text-align: center;
  text-transform: uppercase;
  word-spacing: 0px;
  background-color:  #FFFFFF;
  background-position: 0px 0px;
  color:  #000000;
  height: 32px;
  border: 2px solid  #2893EB;
  padding: 0 10px 0 10px;
  transform: none
  transition: all 0s ease 0s
  outline: rgb(255, 0, 0) dashed 1px
  box-sizing: border-box
  border-top-left-radius: 4px
  border-top-right-radius: 4px
  border-bottom-left-radius: 4px
  border-bottom-right-radius: 4px
  box-shadow: 0 2px 7px 1px rgba(47,125,235,.16);
`;


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
            <div className="flex flex-row ml-3 justify-content-center align-content-center pt-2 mr-auto">
              <div className="input-group">
                <SearchInput
                    type="text"
                    placeholder="Breed you like~"
                    value={this.state.searchTerm}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
                <SearchButton
                    className="btn"
                    onClick={this.handleSearch}
                >
                  Find Breed
                </SearchButton>
              </div>
            </div>
          </div>
          <div className="mt-2 pt-2">
            <AuthButton className="btn mr-2"><NavLink to="/login">Login</NavLink></AuthButton>
            <AuthButton className="btn"><NavLink to="/signup">Signup</NavLink></AuthButton>
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
