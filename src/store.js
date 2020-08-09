import {configureStore} from "@reduxjs/toolkit";
import popularReducer from "./features/slices/popularSlice";
import topRatedReducer from "./features/slices/topRatedSlice";
import upComingReducer from "./features/slices/upComingSlice";
import searchReducer from "./features/slices/searchSlice";

const reducers = {
    popular: popularReducer,
    topRated: topRatedReducer,
    upComing: upComingReducer,
    search: searchReducer
};

export const store = configureStore({
    reducer: reducers
});