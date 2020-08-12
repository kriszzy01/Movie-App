import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { fetchSearchResults, resetSearchPage} from "../slices/searchSlice";
import {resetPopularPage, fetchPopularMovies} from "../slices/popularSlice";
import {resetUpComingPage, fetchUpComingMovies} from "../slices/upComingSlice";
import {fetchtopRatedMovies, resetTopRatedPage} from "../slices/topRatedSlice";
import "./Header.css";

export const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);

    const barsIcon = <FontAwesomeIcon icon={faBars} />;
    const timesIcon = <FontAwesomeIcon icon={faTimes} />;
    const searchIcon = <FontAwesomeIcon icon={faSearch} />;

    const dispatch = useDispatch();

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    const resetPage = () => {
        dispatch(resetPopularPage());
        dispatch(fetchPopularMovies());

        dispatch(resetSearchPage());
        dispatch(fetchSearchResults());

        dispatch(resetUpComingPage());
        dispatch(fetchUpComingMovies());

        dispatch(resetTopRatedPage());
        dispatch(fetchtopRatedMovies());

        toggleNav();
    };

    const navItems = ["Home", "Popular", "Top Rated", "Upcoming"];
    const navMenu = navItems.map(item => {
        return (
            <li key={item}>
                <NavLink exact to={item === "Home" ? "/Movie-App" : `/${item}`} onClick={resetPage}>{item}</NavLink>
            </li>
        );
    });

    const handleSearchInput = event => setSearchInput(event.target.value);

    const searchMovie = () => {
        dispatch(resetSearchPage());

        if (searchInput === "") {
            setShowSearchInput(!showSearchInput);
        } 

        else {
            dispatch(fetchSearchResults(searchInput));
            setSearchInput("");
            setShowSearchInput(!showSearchInput);
        }
    };

    return (
        <header>
            <span className="toggleNavBtn" onClick={toggleNav}>
                {showNav === false ? barsIcon : timesIcon}
            </span>

            <nav className={showNav ? "showNav" : "hideNav"}>
                <ul>{navMenu}</ul>
            </nav>

            <section className={showSearchInput ? "searchBtn showSearchInput" : "searchBtn hideSearchInput"}>
                <p onClick={searchMovie} >
                    {searchInput === "" ? searchIcon: <NavLink to="/Search Results">{searchIcon}</NavLink>}
                </p>

                <input
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search Movie"
                />
            </section>

        </header>
    );
};