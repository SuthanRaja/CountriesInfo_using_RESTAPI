import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCountries, setFilterRegion, setSearchCountry, fetchCountryDetails } from '@/Redux/Slices/DisplayCountriesSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.display.countryData);
    const status = useSelector((state) => state.display.status);
    const searchCountry = useSelector((state) => state.display.searchCountry);
    const filterRegion = useSelector((state) => state.display.filterRegion);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllCountries());
        }
    }, [status, dispatch]);

    const filteredCountries = countries.filter((country) => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchCountry.toLowerCase());
        const matchesRegion = filterRegion === 'All' || country.region === filterRegion;
        return matchesSearch && matchesRegion;
    });

    const handleCountryClick = (countryName) => {
        dispatch(fetchCountryDetails(countryName));
        navigate(`/country/${countryName}`);
    };

    return (
        <>
            <div className="flex justify-between space-x-8">
                <div>
                    <input
                        type="text"
                        placeholder="Search By Country"
                        className="m-5 p-2 border border-slate-800 outline-none rounded-md cursor-pointer dark:bg-slate-800"
                        value={searchCountry}
                        onChange={(e) => dispatch(setSearchCountry(e.target.value))}
                    />
                </div>
                <div>
                    <select
                        className="m-5 p-2 border border-slate-800 outline-none rounded-md cursor-pointer dark:bg-slate-800"
                        value={filterRegion}
                        onChange={(e) => dispatch(setFilterRegion(e.target.value))}
                    >
                        <option value="All">Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="Americas">Americas</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
            </div>

            {status === 'loading' && <p className="flex justify-center items-center text-xl">Loading...</p>}
            {status === 'succeeded' && (
                <div className="grid grid-cols-4 gap-6 m-8">
                    {filteredCountries.map((country) => (
                        <div
                            key={country.cca3}
                            className="border border-slate-300 p-1 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                            onClick={() => handleCountryClick(country.name.common)}
                        >
                            <img src={country.flags.png} alt={country.name.common} className="w-full h-40 object-cover mb-2" />
                            <h3 className="text-xl font-semibold">{country.name.common}</h3>
                            <p>Population: {country.population.toLocaleString()}</p>
                            <p>Region: {country.region}</p>
                            <p>Capital: {country.capital}</p>
                        </div>
                    ))}
                </div>
            )}
            {status === 'failed' && <p className="flex justify-center items-center text-xl">Failed to load countries.</p>}
        </>
    );
};

export default Home;
