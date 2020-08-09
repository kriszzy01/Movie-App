import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectTopRatedMovies, fetchtopRatedMovies, topRatedMovieStatus } from "../slices/topRatedSlice";
import {PageHeading} from "./pageHeading/PageHeading";
import {Pagination} from "./pagination/Pagination";

export const TopRated = () => {
    const topRatedMoviesArray = useSelector(selectTopRatedMovies);

    const topRatedMovies = topRatedMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    const dispatch = useDispatch();

    const topRatedStatus = useSelector(topRatedMovieStatus);

    useEffect(() => {
        if (topRatedStatus === "idle") {
            dispatch(fetchtopRatedMovies());
        }

    }, [ topRatedStatus, dispatch]);

    return (
        <main>
            <section className="movieCategory">
                <PageHeading page="Top Rated" />
                <section className="movieList">{topRatedMovies}</section>
                <Pagination category="Top Rated"/>
            </section>
        </main>
    );
};