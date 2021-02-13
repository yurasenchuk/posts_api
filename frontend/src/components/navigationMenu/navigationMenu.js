import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./navigationMenu.css";
import SignBlock from "../signBlock";

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