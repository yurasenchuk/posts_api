import React from "react";

class CustomError extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
    }
}

export default CustomError;


// Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable
// Oops! Page Not Be Found