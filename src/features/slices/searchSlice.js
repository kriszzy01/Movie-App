import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const searchAdapter = createEntityAdapter();

const initialState = searchAdapter.getInitialState({
    searchQuery: "",
    currentPage: 1,
    totalPages: "",
    status: "idle",
    error: null
});

export const fetchSearchResults = createAsyncThunk("search/fetchSearchResults",
    async (query, {getState}) => {
        const queryString = encodeURI(query);
        const api_url = "https://api.themoviedb.org/3/search/movie";
        const key = "600f5cedd909fa355f1beee66846ab98";

        const {currentPage, searchQuery} = getState().search;

        let request_url = `${api_url}?api_key=${key}&query=${searchQuery}&language=en-US&page=${currentPage}&include_adult=false`;

        const response = await fetch(request_url);
        return response.json();
    }
)

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        saveSearchQuery: {
            reducer(state, action) {
                state.searchQuery = action.payload;
            }
        },
        nextPage: {
            reducer(state) {
                if (state.currentPage === state.totalPages) {
                    return;
                }
                state.currentPage++
                state.status = "idle";
            }
        }, 
        prevPage: {
            reducer(state) {
                if (state.currentPage === state.totalPages) {
                    return;
                }
                state.currentPage--
                state.status = "idle";
            }
        },
        resetSearchPage: {
            reducer(state) {
                if (state.currentPage > 1) {
                    state.currentPage = 1;
                }
            }
        }
    },
    extraReducers: {
        [fetchSearchResults.pending] (state) {
            if (state.status === "idle") {
                state.status = "pending";
            }
        },

        [fetchSearchResults.fulfilled] (state, action) {
            const { results, page, total_pages } = action.payload;

            searchAdapter.setAll(state, results);
            state.totalPages = total_pages;
            state.currentPage = page;
            state.status = "succeded";
        },

        [fetchSearchResults.rejected](state, action) {
            state.error = action.error;
        }
    }
});

export default searchSlice.reducer;
export const currentSearchPage = state => state.search.currentPage;

export const {nextPage, prevPage, resetSearchPage, saveSearchQuery} = searchSlice.actions;

export const searchMovieStatus = state => state.search.status;
export const totalSearchPage = state => state.search.totalPages;

export const {
    selectAll: selectSearchMovies,
    selectById: selectSearchMovieById
} = searchAdapter.getSelectors(state => state.search)