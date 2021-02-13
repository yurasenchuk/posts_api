import React from "react";
import "./error.css";
import {Link} from "react-router-dom";

const Error = ({status, shortMessage}) => {
    return (
        <div className="error">
            <div id="notfound">
                <div className="notfound">
                    <div className="notfound-404"/>
                    <h1>{status}</h1>
                    <h2>{shortMessage}</h2>
                    <Link to={"/"} className="notfound-link">Back to homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default Error;