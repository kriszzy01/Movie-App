import React from "react";
import {useSelector} from "react-redux";
import { Card } from "../card/Card";
import { selectSearchMovies } from "../slices/searchSlice";
import {PageHeading} from "./pageHeading/PageHeading";
import {Pagination} from "./pagination/Pagination";

export const SearchResults = () => {
    const searchMoviesArray = useSelector(selectSearchMovies);

    const searchResults = searchMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    return (
        <main>
            <section className="movieCategory">
                <PageHeading page="Search" />
                <section className="movieList">{searchResults}</section>
                <Pagination category="search"/>
            </section>
        </main>
    );
};