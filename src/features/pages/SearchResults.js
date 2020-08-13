import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "../card/Card";
import { selectSearchMovies, searchMovieStatus, fetchSearchResults } from "../slices/searchSlice";
import { showMovieDetails } from "../slices/movieDetailSlice";
import { PageHeading } from "./pageHeading/PageHeading";
import { Pagination } from "./pagination/Pagination";
import { MovieDetails } from "./MovieDetails";
import {LoadingIndicator} from "./LoadingIndicator";

export const SearchResults = () => {
    const [MovieId, setMovieId] = useState("");

    const searchMoviesArray = useSelector(selectSearchMovies);
    const showMovieDetail = useSelector(showMovieDetails);
    const searchStatus = useSelector(searchMovieStatus);

    const searchResults = searchMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (searchStatus === "idle") {
            dispatch(fetchSearchResults());
        }

    }, [searchStatus, dispatch]);

    return (
        <main>
            {searchStatus !== "succeded" && <LoadingIndicator/>}
            {searchStatus === "succeded" && showMovieDetail && <MovieDetails MovieId={MovieId} />}
            {searchStatus === "succeded" && !showMovieDetail &&
                <section className="movieCategory">
                    <PageHeading page="Search" />
                    <section className="movieList">{searchResults}</section>
                    <Pagination category="search" />
                </section>
            }
        </main>
    );
};