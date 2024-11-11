import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountryDetails } from '@/Redux/Slices/DisplayCountriesSlice';
import { useNavigate, useParams } from 'react-router-dom';

const CountryInfo = () => {
    const { countryName } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const country = useSelector((state) => state.display.selectedCountry);
    const status = useSelector((state) => state.display.countryDetailStatus);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountryDetails(countryName));
        }
    }, [countryName, status, dispatch]);

    if (status === 'loading') return <p>Loading...</p>;
    if (status === 'failed') return <p>Country not found.</p>;

    return (

        <div className=" p-8">
            <button
                onClick={() => navigate('/')}
                className="bg-gray-700 px-4 py-2 rounded mb-8 text-gray-300 hover:bg-gray-600">
                &larr; Back
            </button>
            <div className="flex flex-col md:flex-row items-center gap-8">

                <div className=" w-1/2 border border-black ">
                    <img
                        src={country.flags.png}
                        alt={`${country.name.common} Flag`}
                        className="w-full h-[300px] rounded shadow-lg "
                    />
                </div>

                <div className="md:w-1/2">
                    <h1 className="text-4xl font-bold mb-4">{country.name.common}</h1>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
                        <p><strong>Top Level Domain:</strong> {country.tld ? country.tld.join(', ') : 'N/A'}</p>
                        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                        <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(curr => `${curr.name} (${curr.symbol})`).join(', ') : 'N/A'}</p>
                        <p><strong>Region:</strong> {country.region}</p>
                        <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
                        <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
                        <p><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}</p>
                    </div>
                    <div className="mt-4">
                        <strong>Border Countries:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {country.borders ? (
                                country.borders.map((border) => (
                                    <span
                                        key={border}
                                        className="bg-gray-700 text-gray-300 px-3 py-1 rounded text-xs shadow">
                                        {border}
                                    </span>
                                ))
                            ) : (
                                <span>N/A</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountryInfo;
