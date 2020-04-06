import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Switcher from "../../components/switcher/switcher";
import "./header.scss";

class Header extends React.Component {
  constructor(props) {
    super(props);
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
            <input type="text" className="form-control" />
            <button className="ml-2 btn btn-primary">Find Cat</button>
            {/*<Switcher />*/}
          </div>
        </div>
        <div className="divider" />
      </div>
    );
  }
}

export default Header;
