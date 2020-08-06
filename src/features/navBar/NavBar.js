import React, { useState } from "react";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
    const [showNavBar, setShowNavBar] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [showSearchInput, setShowSearchInput] = useState(false);

    const barsIcon = <FontAwesomeIcon icon={faBars} />
    const timesIcon = <FontAwesomeIcon icon={faTimes} />
    const searchIcon = <FontAwesomeIcon icon={faSearch} />

    const navItemsArray = ["Home", "Popular", "Now Playing", "Top Rated", "Upcoming"];
    const navBar = navItemsArray.map(item => {
        return (
            <li>
                <NavLink to={item === "Home" ? "Movie-App" : item} key={item}>{item}</NavLink>
            </li>
        );
    });

    const toggleSideBar = () => {
        setShowNavBar(!showNavBar);
        setShowSearchInput(false);
    }

    const handleMovieString = event => setSearchInput(event.target.value);

    const searchMovie = () => {
        setShowNavBar(false);

        if (searchInput === "") {
            setShowSearchInput(!showSearchInput);
        } else {
            //Some command to search movie
            setSearchInput("");
            setShowSearchInput(!showSearchInput);
        }
    };

    return (
        <>
            <header>
                <i className="navBarToggle" onClick={toggleSideBar}>{showNavBar === false ? barsIcon : timesIcon}</i>
                <section className="searchContainer">
                    <section className={showSearchInput ? "searchInput showSearchInput" : "searchInput hideSearchInput"}>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={handleMovieString}
                            placeholder="Enter Name of Movie"
                        />
                    </section>
                    <p className="searchBtn" onClick={searchMovie}>{searchIcon}</p>
                </section>
            </header>
            <aside className={showNavBar ? "sideBar showSideBar" : "sideBar hideSideBar"}>
                <nav className="navBar">
                    <ul>
                        {navBar}
                        <i className="closeSideBar" onClick={toggleSideBar}></i>
                    </ul>
                </nav>
            </aside>
        </>
    );
};