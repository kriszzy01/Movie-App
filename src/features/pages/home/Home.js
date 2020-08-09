import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies, popularMovieStatus, selectPopularMovies } from "../../slices/popularSlice";
import { fetchtopRatedMovies, topRatedMovieStatus, selectTopRatedMovies } from "../../slices/topRatedSlice";
import { fetchUpComingMovies, upComingMovieStatus, selectUpComingMovies } from "../../slices/upComingSlice";
import { Card } from "../../card/Card";
import { PageHeading } from "../pageHeading/PageHeading";
import "./Home.css"

export const Home = () => {
    const dispatch = useDispatch();

    const popularMoviesArray = useSelector(selectPopularMovies).slice(0, 4);
    const topRatedMoviesArray = useSelector(selectTopRatedMovies).slice(0, 4);
    const upComingMoviesArray = useSelector(selectUpComingMovies).slice(0, 4);

    const popularStatus = useSelector(popularMovieStatus);
    const topRatedStatus = useSelector(topRatedMovieStatus);
    const upComingStatus = useSelector(upComingMovieStatus);

    useEffect(() => {
        if (popularStatus === "idle") {
            dispatch(fetchPopularMovies());
        }
        if (upComingStatus === "idle") {
            dispatch(fetchUpComingMovies());
        }
        if (topRatedStatus === "idle") {
            dispatch(fetchtopRatedMovies());
        }

    }, [popularStatus, topRatedStatus, upComingStatus, dispatch]);

    const popularMovies = popularMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    const topRatedMovies = topRatedMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    const upComingMovies = upComingMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} key={title + rating} />
    });

    return (
        <main>
            <section className="movieCategory">
                <PageHeading page="Popular" browseAll={true} />
                <section className="movieList">{popularMovies}</section>
            </section>

            <section className="movieCategory">
                <PageHeading page="Upcoming" browseAll={true} />
                <section className="movieList">{upComingMovies}</section>
            </section>

            <section className="movieCategory">
                <PageHeading page="Top Rated" browseAll={true} />
                <section className="movieList">{topRatedMovies}</section>
            </section>
        </main>
    );
};