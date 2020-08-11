import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

const topRatedAdapter = createEntityAdapter();

const initialState = topRatedAdapter.getInitialState({
    currentPage: 1,
    totalPages: "",
    status: "idle",
    error: null
});

export const fetchtopRatedMovies = createAsyncThunk("topRated/fetchtopRatedMovies",
    async (topRated, {getState}) => {
        const api_url = "https://api.themoviedb.org/3/movie/top_rated";
        const key = "600f5cedd909fa355f1beee66846ab98";

        const {currentPage} = getState().topRated;

        const request_url = `${api_url}?api_key=${key}&language=en-US&page=${currentPage}`;

        const response = await fetch(request_url);
        return response.json();
    }
);

const topRatedSlice = createSlice({
    name: "topRated",
    initialState,
    reducers: {
        nextPage: {
            reducer(state) {
                state.currentPage++;
            }
        }, 
        prevPage: {
            reducer(state) {
                state.currentPage--;
            }
        },
        resetTopRatedPage: {
            reducer(state) {
                if (state.currentPage > 1) {
                    state.currentPage = 1;
                }
            }
        }
    },
    extraReducers: {
        [fetchtopRatedMovies.pending](state) {
            if (state.status === "idle") {
                state.status = "pending";
            }
        },

        [fetchtopRatedMovies.fulfilled](state, action) {
            const { results, page, total_pages } = action.payload;

            topRatedAdapter.setAll(state, results);
            state.totalPages = total_pages;
            state.currentPage = page;
            state.status = "succeded";
        },

        [fetchtopRatedMovies.rejected](state, action) {
            state.error = action.error;
        }
    }
});

export default topRatedSlice.reducer;
export const {nextPage, prevPage, resetTopRatedPage} = topRatedSlice.actions;

export const topRatedMovieStatus = state => state.topRated.status;
export const totalTopRatedPage = state => state.topRated.totalPages;
export const currentTopRatedPage = state => state.topRated.currentPage;

export const {
    selectAll: selectTopRatedMovies,
    selectById: selectTopRatedMovieById
} = topRatedAdapter.getSelectors(state => state.topRated);