import { configureStore } from "@reduxjs/toolkit";
import displayReducer from "../Slices/DisplayCountriesSlice";

const store = configureStore({
    reducer: {
        display: displayReducer,
    },
});

export default store;