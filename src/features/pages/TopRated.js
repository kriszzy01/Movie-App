import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectTopRatedMovies, fetchtopRatedMovies, topRatedMovieStatus } from "../slices/topRatedSlice";
import { showMovieDetails } from "../slices/movieDetailSlice";
import { PageHeading } from "./pageHeading/PageHeading";
import { Pagination } from "./pagination/Pagination";
import { MovieDetails } from "./MovieDetails";

export const TopRated = () => {
    const [MovieId, setMovieId] = useState("");

    const topRatedMoviesArray = useSelector(selectTopRatedMovies);

    const topRatedMovies = topRatedMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    const dispatch = useDispatch();

    const topRatedStatus = useSelector(topRatedMovieStatus);
    const showMovieDetail = useSelector(showMovieDetails);

    useEffect(() => {
        if (topRatedStatus === "idle") {
            dispatch(fetchtopRatedMovies());
        }

    }, [topRatedStatus, dispatch]);

    return (
        <main>
            {showMovieDetail && <MovieDetails MovieId={MovieId} />}
            {!showMovieDetail &&
                <section className="movieCategory">
                    <PageHeading page="Top Rated" />
                    <section className="movieList">{topRatedMovies}</section>
                    <Pagination category="Top Rated" />
                </section>
            }
        </main>
    );
};