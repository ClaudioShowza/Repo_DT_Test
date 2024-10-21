"use client";

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function CountryInfo() {
  const { countryCode } = useParams();
  const [countryData, setCountryData] = useState(null);
  const [populationData, setPopulationData] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionar o estado de carregamento

  useEffect(() => {
    if (countryCode) {
      const fetchCountryData = async () => {
        try {
          // Usar a URL da API de informações do país a partir do .env
          const apiUrl = `${process.env.NEXT_PUBLIC_API_COUNTRY_INFO_URL}/${countryCode}`;
          const response = await axios.get(apiUrl);
          setCountryData(response.data);

          const populationResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_COUNTRY_INFO_URL}-data/${response.data.countryName}`);
          setPopulationData(populationResponse.data.populationHistory);

          setLoading(false); // Definir o estado de carregamento como falso após os dados serem carregados
        } catch (error) {
          console.error('Error fetching country info or population data:', error);
          setLoading(false); // Mesmo em caso de erro, parar o carregamento
        }
      };

      fetchCountryData();
    }
  }, [countryCode]);

  // Exibir o spinner enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  if (!countryData) {
    return <div>Error loading country data</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-blue-300 p-4 flex flex-col items-center justify-between">
      <div className="container mx-auto p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center text-indigo-700">
          {countryData.countryName}
          {countryData.flagUrl ? (
            <img 
              src={countryData.flagUrl}
              alt={`${countryData.countryName} flag`}
              className="ml-6 w-16 h-auto rounded-md shadow-sm"
            />
          ) : (
            <p className="ml-4 text-sm text-gray-500">No flag available</p>
          )}
        </h1>

        <h2 className="text-3xl font-semibold mt-6 mb-4 text-gray-700">Border Countries:</h2>
        <ul className="flex flex-wrap gap-4 justify-center">
          {countryData.borders && countryData.borders.length > 0 ? (
            countryData.borders.map((border, index) => (
              <li key={index} className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg shadow-md hover:bg-indigo-100 hover:shadow-lg transition-transform transform hover:scale-105">
                <Link href={`/country/${border.countryCode}`} className="hover:underline">
                  {border.commonName || border.officialName}
                </Link>
              </li>
            ))
          ) : (
            <li>No border countries available</li>
          )}
        </ul>

        <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-700">Population Over Time</h2>
        {populationData && populationData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={populationData} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(tick) => new Intl.NumberFormat('en-US').format(tick)} />
              <Tooltip formatter={(value) => new Intl.NumberFormat('en-US').format(value)} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p>No population data available</p>
        )}
      </div>
    </div>
  );
}
