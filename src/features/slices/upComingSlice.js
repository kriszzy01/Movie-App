import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit";

const upComingAdapter = createEntityAdapter();

const initialState = upComingAdapter.getInitialState({
    currentPage: 1,
    totalPages: "",
    status: "idle",
    error: null
});

export const currentUpComingPage = state => state.upComing.currentPage;

export const fetchUpComingMovies = createAsyncThunk("upComing/fetchupComingMovies",
    async (upComing, {getState}) => {
        const api_url = "https://api.themoviedb.org/3/movie/upcoming";
        const key = "600f5cedd909fa355f1beee66846ab98";

        const {currentPage} = getState().upComing;

        const request_url = `${api_url}?api_key=${key}&language=en-US&page=${currentPage}`;

        const response = await fetch(request_url);
        return response.json();
    }
);

const upComingSlice = createSlice({
    name: "upComing",
    initialState,
    reducers: {
        nextPage: {
            reducer(state) {
                state.currentPage++;
                state.status = "idle";
            }
        }, 
        prevPage: {
            reducer(state) {
                state.currentPage--;
                state.status = "idle";
            }
        },
        resetUpComingPage: {
            reducer(state) {
                if (state.currentPage > 1) {
                    state.currentPage = 1;
                }
            }
        }
    },
    extraReducers: {
        [fetchUpComingMovies.pending](state) {
            if (state.status === "idle") {
                state.status = "pending";
            }
        },

        [fetchUpComingMovies.fulfilled](state, action) {
            const { results, page, total_pages } = action.payload;

            upComingAdapter.setAll(state, results);
            state.totalPages = total_pages;
            state.currentPage = page;
            state.status = "succeded";
        },

        [fetchUpComingMovies.rejected](state, action) {
            state.error = action.error;
        }
    }
});

export default upComingSlice.reducer;
export const {nextPage, prevPage, resetUpComingPage} = upComingSlice.actions;

export const upComingMovieStatus = state => state.upComing.status;
export const totalUpComingPage = state => state.upComing.totalPages;

export const {
    selectAll: selectUpComingMovies,
    selectById: selectUpComingMovieById
} = upComingAdapter.getSelectors(state => state.upComing);