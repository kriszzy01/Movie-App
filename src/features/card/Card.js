import React from "react";
import "./Card.css";

export const Card = ({title, rating, poster, year}) => {
    return(
        <section className="card">
            <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title}/>
            <p>{title}</p>
            <p>{year !== undefined ? year.slice(0, 4): "Not Available"}</p>
            <p>{rating}</p>
        </section>
    );
};