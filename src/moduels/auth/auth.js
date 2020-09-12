import React, {useState} from "react";
import {connect} from "react-redux";

import {userLogin, userSignup} from './auth.store';

import './auth.scss';
import {NavLink, Switch, Route} from "react-router-dom";
import {signup} from "../../service";

const Login = ({login, history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form>
            <h3>Log In</h3>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={(e) => {
                e.preventDefault();
                login(email, password, history)
            }}>Submit
            </button>
            <div className="row">
                <p className="col-6 no-account text-left">No account? <NavLink to="signup">Sign up</NavLink></p>
                <p className="col-6 forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </div>
        </form>
    );
};

const SignUp = ({signup, history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");

    return (
        <form>
            <h3>Sign Up</h3>
            <div className="form-group">
                <label>User name</label>
                <input type="text" className="form-control" placeholder="User name" onChange={(e) => {
                    setUserName(e.target.value);
                }}/>
            </div>

            <div className="form-group">
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {
                    setEmail(e.target.value);
                }}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </div>

            <button type="submit" className="btn btn-primary btn-block" onClick={signup(username, email, password, history)}>Sign
                Up
            </button>
            <p className="forgot-password text-right">
                Already registered <NavLink to="/login">Log In</NavLink>
            </p>
        </form>
    );
};

const Form = ({login, signup, history}) => {
    return (
        <div className="auth-wrapper">
            <div className="auth-inner">
                <NavLink to="/search" className="btn btn-back"/>
                <Switch>
                    <Route path="/login" render={(props) => <Login {...props} login={login} history={history}/>}/>
                    <Route path="/signup" render={(props) => <SignUp {...props} signup={signup} history={history}/>}/>
                </Switch>
            </div>
        </div>
    );
};

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="auth container">
                <div className="auth">
                    <Form login={this.props.login} signup={this.props.signup} history={this.props.history}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth.token,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, history) => dispatch(userLogin(email, password, history)),
        signup: (username, email, password) => dispatch(userSignup(username, email, password))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
