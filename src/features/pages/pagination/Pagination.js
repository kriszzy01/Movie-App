import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPopularMovies, totalPopularPage, currentPopularPage, nextPage as nextPopularPage, prevPage as prevPopularPage } from "../../slices/popularSlice";
import { fetchtopRatedMovies, totalTopRatedPage, currentTopRatedPage, nextPage as nextTopRatedPage, prevPage as prevTopRatedPage } from "../../slices/topRatedSlice";
import { fetchUpComingMovies, totalUpComingPage, currentUpComingPage, nextPage as nextUpComingPage, prevPage as prevUpComingPage } from "../../slices/upComingSlice";
import { fetchSearchResults, totalSearchPage, currentSearchPage, nextPage as nextSearchPage, prevPage as prevSearchPage } from "../../slices/searchSlice";
import "./Pagination.css";

export const Pagination = ({ category }) => {
    const popularPageCurrent = useSelector(currentPopularPage);
    const popularPageTotal = useSelector(totalPopularPage);
    
    const topRatedPageCurrent = useSelector(currentTopRatedPage);
    const topRatedPageTotal = useSelector(totalTopRatedPage);

    const upComingPageCurrent = useSelector(currentUpComingPage);
    const upComingTotal = useSelector(totalUpComingPage);

    const searchPageCurrent = useSelector(currentSearchPage);
    const searchPageTotal = useSelector(totalSearchPage);

    const currentPage =
        category === "Popular" ? popularPageCurrent :
        category === "Top Rated" ? topRatedPageCurrent : 
        category === "upComing" ? upComingPageCurrent : searchPageCurrent;

    const totalPage =
        category === "Popular" ? popularPageTotal :
        category === "Top Rated" ? topRatedPageTotal : 
        category === "upComing" ? upComingTotal : searchPageTotal;

    const nextPage =
        category === "Popular" ? nextPopularPage :
        category === "Top Rated" ? nextTopRatedPage : 
        category === "upComing" ? nextUpComingPage : nextSearchPage;

    const prevPage =
        category === "Popular" ? prevPopularPage :
        category === "Top Rated" ? prevTopRatedPage : 
        category === "upComing" ? prevUpComingPage: prevSearchPage;

    const fetchNewPage =
        category === "Popular" ? fetchPopularMovies :
        category === "Top Rated" ? fetchtopRatedMovies : 
        category === "upComing" ? fetchUpComingMovies: fetchSearchResults;
    
    const dispatch = useDispatch();

    const handleNextPage = () => {
        dispatch(nextPage());
        dispatch(fetchNewPage());
    }
    const handlePrevPage = () => {
        dispatch(prevPage());
        dispatch(fetchNewPage());
    }

    return (
        <section className="pagination">
            {currentPage !== 1 && <button onClick={handlePrevPage}>Prev</button>}
            <p>Page {currentPage} of {totalPage}</p>
            {currentPage !== totalPage && <button onClick={handleNextPage}>Next</button>}
        </section>
    );
};