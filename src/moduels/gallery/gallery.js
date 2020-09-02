import React from "react";
import { connect } from 'react-redux';
import 'bootstrap/js/dist/dropdown'
import './gallery.scss';

class Gallery extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <div>
                <div className="dropdown btn-group ml-2">
                    <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Large split button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ramdom</a>
                        <a className="dropdown-item" href="#">Desc</a>
                        <a className="dropdown-item" href="#">Asc</a>
                    </div>
                </div>
                <div className="btn-group ml-2">
                    <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Large split button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ramdom</a>
                        <a className="dropdown-item" href="#">Desc</a>
                        <a className="dropdown-item" href="#">Asc</a>
                    </div>
                </div>
                <div className="btn-group ml-2">
                    <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Large split button
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Ramdom</a>
                        <a className="dropdown-item" href="#">Desc</a>
                        <a className="dropdown-item" href="#">Asc</a>
                    </div>
                </div>
                <div className="btn-group ml-2">
                    <button className="btn btn-secondary dropdown-toggle btn-sm" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                        Large split button
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
                <div className="item tokyo">
                    Tokyo
                    <img src="http://payload383.cargocollective.com/1/2/90203/9960185/Tokyo_670.jpg"/>
                </div>
                <div className="item newyork">
                    NY
                    <img src="http://shannoneileenblog.typepad.com/.a/6a0120a5c8d9a9970c0134899b8697970c-pi"/>
                </div>
                <div className="item london">
                    London
                    <img
                        src="http://static1.squarespace.com/static/54345469e4b06f9169880040/t/54dcd02fe4b08f6ad5d7cb24/1423757364030/illustratedlondonmap"/>
                </div>
                <div className="item tokyo">
                    Tokyo
                    <img src="https://s-media-cache-ak0.pinimg.com/736x/21/c2/bc/21c2bc8df881b98802e1eca25bf4532b.jpg"/>
                </div>
                <div className="item london">
                    London
                    <img src="http://www.wanderarti.com/wp-content/uploads/2014/02/Tilly-at-Running-for-Crayons.jpg"/>
                </div>
                <div className="item tokyo">
                    Tokyo
                    <img src="https://s-media-cache-ak0.pinimg.com/736x/ea/44/e5/ea44e538de2f98a7ac3ab85003a203a1.jpg"/>
                </div>
                <div className="item newyork">
                    NY
                    <img src="http://d.gr-assets.com/books/1404704785l/18296046.jpg"/>
                </div>
                <div className="item tokyo">
                    Tokyo
                    <img src="https://s-media-cache-ak0.pinimg.com/736x/56/fd/6a/56fd6aec313cd544300c211b6245c5e2.jpg"/>
                </div>
                <div className="item tokyo">
                    Tokyo
                    <img src="https://s-media-cache-ak0.pinimg.com/736x/ee/e8/e0/eee8e0894002535c6cfa76b9bf92dab4.jpg"/>
                </div>
                <div className="item london">
                    London
                    <img
                        src="http://payload216.cargocollective.com/1/2/64089/6639775/GimMick_London-Antoine-Corbineau-Illustrated-Credit_Mutuel.jpg"/>
                </div>
                <div className="item newyork">
                    NY
                    <img
                        src="https://www.evermade.com/wp-content/uploads/2012/11/NYC-Hand-Drawn-Map-of-New-York-Williamsburg.jpg"/>
                </div>
            </div>

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
