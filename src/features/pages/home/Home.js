import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies, popularMovieStatus, selectPopularMovies } from "../../slices/popularSlice";
import { fetchtopRatedMovies, topRatedMovieStatus, selectTopRatedMovies } from "../../slices/topRatedSlice";
import { fetchUpComingMovies, upComingMovieStatus, selectUpComingMovies } from "../../slices/upComingSlice";
import { Card } from "../../card/Card";
import { PageHeading } from "../pageHeading/PageHeading";
import "./Home.css"
import { showMovieDetails } from "../../slices/movieDetailSlice";
import { MovieDetails } from "../MovieDetails";

export const Home = () => {
    const [MovieId, setMovieId] = useState("");

    const dispatch = useDispatch();

    const popularMoviesArray = useSelector(selectPopularMovies).slice(0, 4);
    const topRatedMoviesArray = useSelector(selectTopRatedMovies).slice(0, 4);
    const upComingMoviesArray = useSelector(selectUpComingMovies).slice(0, 4);

    const popularStatus = useSelector(popularMovieStatus);
    const topRatedStatus = useSelector(topRatedMovieStatus);
    const upComingStatus = useSelector(upComingMovieStatus);

    const showMovieDetail = useSelector(showMovieDetails);

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
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    const topRatedMovies = topRatedMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    const upComingMovies = upComingMoviesArray.map(movies => {
        const { title, vote_average: rating, poster_path: poster, release_date: year, id } = movies;

        return <Card title={title} rating={rating} poster={poster} year={year} setMovieId={setMovieId} id={id} key={title + rating} />
    });

    return (
        <main>
            {showMovieDetail && <MovieDetails MovieId={MovieId} />}

            {!showMovieDetail &&
                <>
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
                </>
            }
        </main>
    );
};