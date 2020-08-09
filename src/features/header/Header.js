import React, { useState } from "react";
import {useDispatch} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { fetchSearchResults } from "../slices/searchSlice";
import "./Header.css";

export const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);

    const barsIcon = <FontAwesomeIcon icon={faBars} />;
    const timesIcon = <FontAwesomeIcon icon={faTimes} />;
    const searchIcon = <FontAwesomeIcon icon={faSearch} />;

    const toggleNav = () => setShowNav(!showNav);

    const navItems = ["Home", "Popular", "Top Rated", "Upcoming"];
    const navMenu = navItems.map(item => {
        return (
            <li key={item}>
                <NavLink exact to={item === "Home" ? "/Movie-App" : `/${item}`} onClick={toggleNav}>{item}</NavLink>
            </li>
        );
    });

    const handleSearchInput = event => setSearchInput(event.target.value);
    const dispatch = useDispatch();

    const searchMovie = () => {
        let previousSearch = null;

        if (searchInput === "") {
            setShowSearchInput(!showSearchInput);
        } else if (searchInput === previousSearch ) {
            return;
        } else {
            dispatch(fetchSearchResults(searchInput));
            previousSearch = searchInput;
            setSearchInput("");
            setShowSearchInput(!showSearchInput);
        }
        console.log(previousSearch)
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
                <p onClick={searchMovie}>
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