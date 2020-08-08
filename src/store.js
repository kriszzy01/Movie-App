import {configureStore} from "@reduxjs/toolkit";
import popularReducer from "./features/slices/popularSlice";

const reducers = {
    popular: popularReducer
};

export const store = configureStore({
    reducer: reducers
});