import React from "react";
import "./Card.css";
import {toggleShowMovieDetails} from "../slices/movieDetailSlice";
import {useDispatch} from "react-redux";

export const Card = ({title, rating, poster, year, id, setMovieId}) => {
    const dispatch = useDispatch();

    const handleSetMovieId = () => {
        setMovieId(id);
        dispatch(toggleShowMovieDetails());
    };

    return(
        <section className="card" onClick={handleSetMovieId}>
            <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt={title}/>
            <p>{title}</p>
            <p>{year !== undefined ? year.slice(0, 4): "Not Available"}</p>
        </section>
    );
};