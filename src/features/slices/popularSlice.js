import {createSlice, createAsyncThunk, createEntityAdapter} from "@reduxjs/toolkit";

const popularAdapter = createEntityAdapter();

const initialState = popularAdapter.getInitialState({
    currentPage: "",
    totalPages: "",
    status: "idle",
    error: null
});

export const fetchPopularMovies = createAsyncThunk("popular/fetchPopularMovies",
    async () => {
        const api_url = "https://api.themoviedb.org/3/movie/popular";
        const key = "600f5cedd909fa355f1beee66846ab98";
        
        const request_url = `${api_url}?api_key=${key}&language=en-US`;

        const response = await fetch(request_url);
        return response.json();
    }
)

const popularSlice = createSlice({
    name: "popular",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPopularMovies.pending] (state) {
            if (state.status === "idle") {
                state.status = "pending";
            }
        },

        [fetchPopularMovies.fulfilled] (state, action) {
            const {results, page, total_pages} = action.payload;

            popularAdapter.upsertMany(state, results);
            state.totalPages = total_pages;
            state.currentPage = page;
            state.status = "succeded";
        },

        [fetchPopularMovies] (state, action) {
            state.error = action.error
        }
    }
});

export default popularSlice.reducer;
export const popularMovieStatus = state => state.popular.status;

export const {
    selectAll: selectPopularMovies
} = popularAdapter.getSelectors(state => state.popular)