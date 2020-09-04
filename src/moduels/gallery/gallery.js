import React from "react";
import { connect } from 'react-redux';
import 'bootstrap/js/dist/dropdown'
import './gallery.scss';
import {getImages} from "../panel/panel.store";

class Gallery extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <div className="dropdown btn-group ml-2">
                    <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Breeds
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ramdom</a>
                        <a className="dropdown-item" href="#">Desc</a>
                        <a className="dropdown-item" href="#">Asc</a>
                    </div>
                </div>
                <div className="btn-group ml-2">
                    <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Origin
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ramdom</a>
                        <a className="dropdown-item" href="#">Desc</a>
                        <a className="dropdown-item" href="#">Asc</a>
                    </div>
                </div>

            <div className="parent">
                <div className="item tokyo">
                    Tokyo
                    <img src="https://s-media-cache-ak0.pinimg.com/736x/25/1e/54/251e545adfb3b55af6a5dc3e20f0b985.jpg"/>
                </div>
            </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        breeds: state => state.breeds
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getImages: () => dispatch(getImages())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
