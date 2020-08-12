import React from "react";
import "./LoadingIndicator.css";

export const LoadingIndicator = () => {
    return(
        <section className="loadingIndicator">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
        </section>
    );
};