import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-white">
                <p>Developed by Yurii Senchuk ©</p>
            </div>
            <div className="footer-black">
                <div>
                    <time dateTime="2021">2021</time>
                </div>
                <div>
                    <address>Lviv, Ukraine</address>
                </div>
            </div>
        </footer>
    )
};

export default Footer;