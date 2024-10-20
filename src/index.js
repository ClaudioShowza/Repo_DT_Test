const cors = require('cors');
const express = require('express');
const axios = require('axios');
require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Endpoint para buscar todos os países disponíveis
app.get('/api/countries', async (req, res) => {
  try {
    // Usar a variável de ambiente para a URL da API de países
    const response = await axios.get(
      `${process.env.COUNTRIES_API_URL}/AvailableCountries`
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error.message);
    res.status(500).json({ error: 'Error fetching countries' });
  }
});

// Endpoint para buscar informações de um país específico (nome e fronteiras)
app.get('/api/country/:countryCode', async (req, res) => {
  const countryCode = req.params.countryCode.toUpperCase();
  `Fetching country info for: ${countryCode}`; // Log para depurar

  try {
    // Usar a variável de ambiente para a URL da API de informações do país
    const response = await axios.get(
      `${process.env.COUNTRIES_API_URL}/CountryInfo/${countryCode}`
    );
    'Country info:', response.data; // Log para verificar a resposta da API externa

    const countryData = response.data;
    const borderCountries = countryData.borders || [];

    // Fetching flag URL for the country
    const flagResponse = await axios.post(
      `${process.env.POPULATION_API_URL}/flag/images`,
      {
        country: countryData.commonName, // Usamos o nome comum do país para buscar a bandeira
      }
    );

    if (
      !flagResponse.data ||
      !flagResponse.data.data ||
      !flagResponse.data.data.flag
    ) {
      throw new Error('Invalid flag response from external API');
    }

    const flagUrl = flagResponse.data.data.flag;

    res.json({
      countryName: countryData.commonName,
      borders: borderCountries,
      flagUrl: flagUrl, // Incluí a URL da bandeira na resposta
    });
  } catch (error) {
    console.error('Error fetching country info:', error.message);
    res.status(500).json({ error: 'Error fetching country info' });
  }
});

// Endpoint para buscar dados detalhados de um país (população e bandeira)
app.get('/api/country-data/:countryName', async (req, res) => {
  const countryName = req.params.countryName;
  `Fetching data for country: ${countryName}`; // Log para verificar o nome do país

  try {
    // Requisição para dados populacionais
    const populationResponse = await axios.post(
      `${process.env.POPULATION_API_URL}/population`,
      {
        country: countryName,
      }
    );

    // Requisição para URL da bandeira
    const flagResponse = await axios.post(
      `${process.env.POPULATION_API_URL}/flag/images`,
      {
        country: countryName,
      }
    );

    'Population response:', populationResponse.data; // Log da resposta da API de população
    'Flag response:', flagResponse.data; // Log da resposta da API de bandeira

    if (!populationResponse.data.data || !flagResponse.data.data) {
      throw new Error('Invalid response from external API');
    }

    const populationData = populationResponse.data.data;
    const flagUrl = flagResponse.data.data.flag;

    res.json({
      countryName: countryName,
      populationHistory: populationData.populationCounts,
      flagUrl: flagUrl,
    });
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    res.status(500).json({ error: 'Error fetching country data' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  `Server running on port ${PORT}`;
});
