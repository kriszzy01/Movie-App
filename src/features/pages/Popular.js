import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectPopularMovies,fetchPopularMovies, popularMovieStatus, } from "../slices/popularSlice";
import {PageHeading} from "./pageHeading/PageHeading";
import {Pagination} from "./pagination/Pagination";

export const Popular = () => {
    const popularMoviesArray = useSelector(selectPopularMovies);

    const popularMovies = popularMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    const popularStatus = useSelector(popularMovieStatus);

    const dispatch = useDispatch();

    useEffect(() => {
        if (popularStatus === "idle") {
            dispatch(fetchPopularMovies());
        }

    }, [popularStatus, dispatch]);

    return (
        <main>
            <section className="movieCategory">
                <PageHeading page="Popular" />
                <section className="movieList">{popularMovies}</section>
                <Pagination category="Popular"/>
            </section>
        </main>
    );
};