import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./navigation_menu.css";
import SignBlock from "../sign_block";

class NavMenu extends Component {
    render() {
        return (
            <header>
                <nav className="nav">
                    <div className="nav-menu">
                        <div className="nav-black">
                            <Link to={"/"} className="nav-button">Posts</Link>
                        </div>
                        <div className="nav-white">
                            <SignBlock/>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default NavMenu;