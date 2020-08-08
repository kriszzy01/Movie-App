import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./Header.css";

export const Header = () => {
    const [showNav, setShowNav] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);

    const barsIcon = <FontAwesomeIcon icon={faBars} />;
    const timesIcon = <FontAwesomeIcon icon={faTimes} />;
    const searchIcon = <FontAwesomeIcon icon={faSearch} />;

    const navItems = ["Home", "Popular", "Top Rated", "Upcoming"];
    const navMenu = navItems.map(item => {
        return (
            <li key={item}>
                <NavLink exact to={item === "Home" ? "/Movie-App" : `/${item}`}>{item}</NavLink>
            </li>
        );
    });

    const toggleNav = () => setShowNav(!showNav);

    const handleSearchInput = event => setSearchInput(event.target.value);

    const searchMovie = () => {

        if (searchInput === "") {
            setShowSearchInput(!showSearchInput);
        } else {
            //Some command to search movie
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

            <input
                type="text"
                value={searchInput}
                onChange={handleSearchInput}
                placeholder="Enter Name of Movie"
                className={showSearchInput ? "searchBtn showSearchInput" : "searchBtn hideSearchInput"}
            />

            <p className="searchBtn" onClick={searchMovie}>{searchIcon}</p>
        </header>
    );
};