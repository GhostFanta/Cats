import React from 'react';
import { connect } from "react-redux";

import "./streamer.scss";

class Streamer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            toggled: true
        };

        this.toggleState = this.toggleState.bind(this);
    }

    toggleState(){
        console.log("open")
        this.setState({toggled: !this.state.toggled});
    }

    render() {
        return (
            this.state.toggled ? (
                    <button className="streamer-btn btn btn-primary rounded" onClick={this.toggleState}>Open adoption stream</button>
                ):(
            <div className="streamer">
                <button className="btn btn-sm rounded bg-danger text-light float-right" onClick={this.toggleState}>x</button>
                <div className="container">
                <div className="chat-log">
                    <div className="chat-log-item w-100">
                        <h3 className="chat-log-author">Alex <small>14:30</small></h3>
                        <div className="chat-log-message">I got a cat ready for adoption.</div>
                    </div>
                    <div className="chat-log-item">
                        <h3 className="chat-log-author">Phil <small>14:30</small></h3>
                        <div className="chat-log-message">I got a dog ready for adoption.</div>
                    </div>
                    <div className="chat-log-item">
                        <h3 className="chat-log-author">Felipe <small>14:30</small></h3>
                        <div className="chat-log-message">I got a cat ready for adoption.</div>
                    </div>

                </div>
            </div>
        </div>
        )
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Streamer);
