import { apiURL } from "@/API/apiURL";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchAllCountries = createAsyncThunk("countries/fetchAllCountries",
    async () => {
        const response = await axios.get(`${apiURL}/all`);
        return response.data;
    });

export const fetchCountryDetails = createAsyncThunk("countries/fetchCountryDetails",
    async (countryName) => {
        const response = await axios.get(`${apiURL}/name/${countryName}`);
        return response.data[0];
    });

const DisplayCountriesSlice = createSlice({
    name: "display",
    initialState: {
        searchCountry: '',
        filterRegion: 'All',
        countryData: [],
        selectedCountry: null,
        status: 'idle',
        countryDetailStatus: 'idle',
    },
    reducers: {
        setSearchCountry(state, action) {
            state.searchCountry = action.payload;
        },
        setFilterRegion(state, action) {
            state.filterRegion = action.payload;
        },
        setSelectedCountry(state, action) {
            state.selectedCountry = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.countryData = action.payload;
            })
            .addCase(fetchAllCountries.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchCountryDetails.pending, (state) => {
                state.countryDetailStatus = 'loading';
            })
            .addCase(fetchCountryDetails.fulfilled, (state, action) => {
                state.countryDetailStatus = 'succeeded';
                state.selectedCountry = action.payload; // Store selected country data in Redux
            })
            .addCase(fetchCountryDetails.rejected, (state) => {
                state.countryDetailStatus = 'failed';
            });
    },
});

export const { setFilterRegion, setSearchCountry, setSelectedCountry } = DisplayCountriesSlice.actions;

export default DisplayCountriesSlice.reducer;
