import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

const popularAdapter = createEntityAdapter();

const initialState = popularAdapter.getInitialState({
    currentPage: 1,
    totalPages: "",
    status: "idle",
    error: null
});

export const currentPopularPage = state => state.popular.currentPage;

export const fetchPopularMovies = createAsyncThunk("popular/fetchPopularMovies",
    async (popular, {getState}) => {
        const api_url = "https://api.themoviedb.org/3/movie/popular";
        const key = "600f5cedd909fa355f1beee66846ab98";

        const {currentPage} = getState().popular;

        let request_url = `${api_url}?api_key=${key}&language=en-US&page=${currentPage}`;

        const response = await fetch(request_url);
        return response.json();
    }
)

const popularSlice = createSlice({
    name: "popular",
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
        resetPopularPage: {
            reducer(state) {
                if (state.currentPage > 1) {
                    state.currentPage = 1;
                }
            }
        }
    },
    extraReducers: {
        [fetchPopularMovies.pending](state) {
            if (state.status === "idle") {
                state.status = "pending";
            }
        },

        [fetchPopularMovies.fulfilled](state, action) {
            const { results, page, total_pages } = action.payload;

            popularAdapter.setAll(state, results);
            state.totalPages = total_pages;
            state.currentPage = page;
            state.status = "succeded";
        },

        [fetchPopularMovies.rejected](state, action) {
            state.error = action.error;
        }
    }
});

export default popularSlice.reducer;
export const {nextPage, prevPage, toggleShowMovieDetails, resetPopularPage} = popularSlice.actions;

export const popularMovieStatus = state => state.popular.status;
export const totalPopularPage = state => state.popular.totalPages;

export const {
    selectAll: selectPopularMovies,
    selectById: selectPopularMovieByID
} = popularAdapter.getSelectors(state => state.popular)