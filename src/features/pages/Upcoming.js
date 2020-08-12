import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectUpComingMovies, fetchUpComingMovies, upComingMovieStatus } from "../slices/upComingSlice";
import { showMovieDetails } from "../slices/movieDetailSlice";
import { PageHeading } from "./pageHeading/PageHeading";
import { Pagination } from "./pagination/Pagination";
import { MovieDetails } from "./MovieDetails";
import {LoadingIndicator} from "./LoadingIndicator";

export const Upcoming = () => {
    const [MovieId, setMovieId] = useState("");

    const upComingMoviesArray = useSelector(selectUpComingMovies);

    const upComingMovies = upComingMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    const dispatch = useDispatch();

    const upComingStatus = useSelector(upComingMovieStatus);
    const showMovieDetail = useSelector(showMovieDetails);

    useEffect(() => {
        if (upComingStatus === "idle") {
            dispatch(fetchUpComingMovies());
        }

    }, [upComingStatus, dispatch]);

    return (
        <main>
            {upComingStatus !== "succeded" && <LoadingIndicator/>}
            {upComingStatus === "succeded" && showMovieDetail && <MovieDetails MovieId={MovieId} />}
            {upComingStatus === "succeded" && !showMovieDetail &&
                <section className="movieCategory">
                    <PageHeading page="upComing" />
                    <section className="movieList">{upComingMovies}</section>
                    <Pagination category="upComing" />
                </section>
            }
        </main>
    );
};