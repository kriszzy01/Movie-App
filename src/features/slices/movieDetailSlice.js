import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showMovieDetails: false
};

const movieDetailSlice = createSlice({
    name: "showMovieDetails",
    initialState,
    reducers: {
        toggleShowMovieDetails: {
            reducer(state) {
                state.showMovieDetails = !state.showMovieDetails;
            }
        }
    }
});

export const {toggleShowMovieDetails} = movieDetailSlice.actions;
export default movieDetailSlice.reducer;

export const showMovieDetails = state => state.showMovieDetails.showMovieDetails;