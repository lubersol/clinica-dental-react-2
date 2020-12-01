/* eslint-disable no-useless-constructor */
import React from "react";
import './Footer.css';

class Footer extends React.Component {
    
    constructor (props) {
        super(props);
        
    };
    
    render() {
        let whatsapp = {};
        whatsapp.avatarUrl = './img/whatsapp.png';
        let facebook = {};
        facebook.avatarUrl = './img/facebook.png';
        let gorjeo = {};
        gorjeo.avatarUrl = './img/gorjeo.png';
        let instagram = {};
        instagram.avatarUrl = './img/instagram.png';
        let linkedin = {};
        linkedin.avatarUrl = './img/linkedin.png';
        return(
            <div>
                <div className="pie">
                <img src={whatsapp.avatarUrl} alt="icono whatsapp" />
                <img src={facebook.avatarUrl} alt="icono facebook" />
                <img src={gorjeo.avatarUrl} alt="icono twitter" />
                <img src={instagram.avatarUrl} alt="icono instagram" />
                <img src={linkedin.avatarUrl} alt="icono linkedin" /> 
                </div>
            </div>
        );
    };
    
    
};


export default Footer;
