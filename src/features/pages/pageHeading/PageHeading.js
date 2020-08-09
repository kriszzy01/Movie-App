import React from "react";
import {useSelector} from "react-redux";
import "./PageHeading.css";
import { NavLink } from "react-router-dom";
import { totalPopularPage, currentPopularPage } from "../../slices/popularSlice";
import { totalTopRatedPage, currentTopRatedPage } from "../../slices/topRatedSlice";
import { totalUpComingPage, currentUpComingPage } from "../../slices/upComingSlice";
import { totalSearchPage, currentSearchPage} from "../../slices/searchSlice";

export const PageHeading = ({ page, browseAll }) => {
    const popularPageCurrent = useSelector(currentPopularPage);
    const popularPageTotal = useSelector(totalPopularPage);
    
    const topRatedPageCurrent = useSelector(currentTopRatedPage);
    const topRatedPageTotal = useSelector(totalTopRatedPage);

    const upComingPageCurrent = useSelector(currentUpComingPage);
    const upComingTotal = useSelector(totalUpComingPage);

    const searchPageCurrent = useSelector(currentSearchPage);
    const searchResultTotal = useSelector(totalSearchPage);

    const currentPage =
        page === "Popular" ? popularPageCurrent :
        page === "Top Rated" ? topRatedPageCurrent : 
        page === "upComing" ? upComingPageCurrent : searchPageCurrent;

    const totalPage =
        page === "Popular" ? popularPageTotal :
        page === "Top Rated" ? topRatedPageTotal : 
        page === "upComing" ? upComingTotal : searchResultTotal;

    return (
        <section className="pageHeading">
            <h1>{`${page} ${page === "Search" ? "Result": "Movies"}`}</h1>
            {browseAll &&
                <p><NavLink to={`/${page}`}>Browse All</NavLink></p>
            }
            {!browseAll && <p>Page {currentPage} of {totalPage}</p>}
        </section>
    );
};