import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectPopularMovieByID } from "../slices/popularSlice";
import { selectTopRatedMovieById } from "../slices/topRatedSlice";
import { selectUpComingMovieById } from "../slices/upComingSlice";
import { selectSearchMovieById } from "../slices/searchSlice";
import {toggleShowMovieDetails} from "../slices/movieDetailSlice";
import "./MovieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const MovieDetails = ({ MovieId }) => {
    const popularMovieDetails = useSelector(state => selectPopularMovieByID(state, MovieId));
    const topRatedMovieDetails = useSelector(state => selectTopRatedMovieById(state, MovieId));
    const upComingMovieDetails = useSelector(state => selectUpComingMovieById(state, MovieId));
    const searchMovieDetails = useSelector(state => selectSearchMovieById(state, MovieId));

    const movie = popularMovieDetails !== undefined ? popularMovieDetails :
        topRatedMovieDetails !== undefined ? topRatedMovieDetails :
            upComingMovieDetails !== undefined ? upComingMovieDetails : searchMovieDetails;

    const { title, overview, vote_average: rating, backdrop_path: backgroundImage, release_date: year } = movie;

    const timesIcon = <FontAwesomeIcon icon={faTimes} />;

    const dispatch = useDispatch();

    const handleSetMovieId = () => {
        dispatch(toggleShowMovieDetails());
    };

    return (
        <>
            <section className="background" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${backgroundImage})` }}></section>
            <section className="text">
                <section>
                    <h1>{title}</h1>
                    <p className="rating">{`${rating}/10`}</p>
                    <p className="year">{year !== undefined ? year.slice(0, 4) : " "}</p>
                    <p className="overview">{overview}</p>
                </section>
                <button onClick={handleSetMovieId}>{timesIcon}</button>
            </section>
            
        </>
    );
};