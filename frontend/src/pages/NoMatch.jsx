import React from "react";
import { Link } from "react-router-dom";

function NoMatch() {
    return (
        <div>
            <h1>Page Not Found</h1>
            <Link to="/"> Go Home</Link>
        </div>
    );
}

export default NoMatch;
