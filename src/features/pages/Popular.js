import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectPopularMovies, fetchPopularMovies, popularMovieStatus} from "../slices/popularSlice";
import {showMovieDetails} from "../slices/movieDetailSlice";
import { PageHeading } from "./pageHeading/PageHeading";
import { Pagination } from "./pagination/Pagination";
import { MovieDetails } from "./MovieDetails";

export const Popular = () => {
    const [MovieId, setMovieId] = useState("");

    const popularMoviesArray = useSelector(selectPopularMovies);

    const popularMovies = popularMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    const popularStatus = useSelector(popularMovieStatus);
    const showMovieDetail = useSelector(showMovieDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        if (popularStatus === "idle") {
            dispatch(fetchPopularMovies());
        }

    }, [popularStatus, dispatch]);

    return (
        <main>
            {showMovieDetail && <MovieDetails MovieId={MovieId}/>}
            {!showMovieDetail &&
                <section className="movieCategory">
                    <PageHeading page="Popular" />
                    <section className="movieList">{popularMovies}</section>
                    <Pagination category="Popular" />
                </section>
            }
        </main>
    );
};