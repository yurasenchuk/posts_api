import React from 'react';
import "./spinner.css";

const Spinner = ({loading}) => {
    return (
        <div className={loading ? "modal-spinner modal-display-spinner" : "modal-spinner"}>
            <div className="loader">loading...</div>
        </div>
    )
}

export default Spinner;