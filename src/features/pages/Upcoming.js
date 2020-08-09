import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectUpComingMovies, fetchUpComingMovies, upComingMovieStatus } from "../slices/upComingSlice";
import {PageHeading} from "./pageHeading/PageHeading";
import {Pagination} from "./pagination/Pagination";

export const Upcoming = () => {
    const upComingMoviesArray = useSelector(selectUpComingMovies);

    const upComingMovies = upComingMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    const dispatch = useDispatch();

    const upComingStatus = useSelector(upComingMovieStatus);

    useEffect(() => {
        if (upComingStatus === "idle") {
            dispatch(fetchUpComingMovies());
        }

    }, [upComingStatus, dispatch]);

    return (
        <main>
            <section className="movieCategory">
                <PageHeading page="Upcoming" />
                <section className="movieList">{upComingMovies}</section>
                <Pagination category="upComing"/>
            </section>
        </main>
    );
};