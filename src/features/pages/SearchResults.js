import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card } from "../card/Card";
import { selectSearchMovies } from "../slices/searchSlice";
import { showMovieDetails } from "../slices/movieDetailSlice";
import { PageHeading } from "./pageHeading/PageHeading";
import { Pagination } from "./pagination/Pagination";
import { MovieDetails } from "./MovieDetails";

export const SearchResults = () => {
    const [MovieId, setMovieId] = useState("");

    const searchMoviesArray = useSelector(selectSearchMovies);
    const showMovieDetail = useSelector(showMovieDetails);

    const searchResults = searchMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    return (
        <main>
            {showMovieDetail && <MovieDetails MovieId={MovieId} />}
            {!showMovieDetail &&
                <section className="movieCategory">
                    <PageHeading page="Search" />
                    <section className="movieList">{searchResults}</section>
                    <Pagination category="search" />
                </section>
            }
        </main>
    );
};