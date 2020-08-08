import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies, popularMovieStatus, selectPopularMovies } from "../../slices/popularSlice";
import {Card} from "../../card/Card";
import "./Home.css"

export const Home = () => {
    const dispatch = useDispatch();
    const popularMoviesArray = useSelector(selectPopularMovies).slice(0, 6);
    
    const popularStatus = useSelector(popularMovieStatus);
    useEffect(() => {
        if (popularStatus === "idle") {
            dispatch(fetchPopularMovies())
        }
    }, [popularStatus, dispatch]);

    let popularMovies = popularMoviesArray.map(movies => {
        const {title, vote_average: rating, poster_path: poster, release_date: year} = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating}/>
    })

    return (
        <main>
            {popularMovies}
        </main>
    );
};