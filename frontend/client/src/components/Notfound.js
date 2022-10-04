import React from "react";
import{Link} from "react-router-dom";
export default function Notfound(){

    return(
        <div className="notFound">
            <h4>404</h4>
            <Link to="/"><button className="home">HOMEPAGE</button></Link>
        </div>

    )
}