"use client";

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_API_COUNTRIES_URL);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-blue-300 p-4 flex flex-col items-center justify-between">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-center mb-10">
          Country List
        </h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <li 
              key={country.countryCode} 
              className="flex items-center justify-center bg-blue-50 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 p-6"
            >
              <Link href={`/country/${country.countryCode}`} className="text-1xl font-semibold text-blue-600 hover:underline hover:text-blue-800 transition-colors text-center">
                {country.name || country.commonName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
