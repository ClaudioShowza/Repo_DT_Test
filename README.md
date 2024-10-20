Country Info API (Back-End)

This project is the back-end API for the Country Info App. It provides endpoints to retrieve country data, including available countries, specific country information, and historical population data.
Table of Contents

    Requirements
    Installation
    Configuration
    Running the Application
    Testing the API
    API Endpoints
    Technologies Used

Requirements

Before running this project, ensure you have the following installed on your machine:

    Node.js (version 14 or above)
    npm (comes with Node.js)
    Git (optional, if you're cloning from a repository)

Installation

    Clone this repository:

    bash

git clone https://github.com/your-username/country-info-backend.git

Navigate to the project directory:

bash

cd country-info-backend

Install all necessary dependencies:

bash

    npm install

Configuration

Before running the application, you need to configure the environment variables. Create a .env file in the root directory of the project with the following contents:

bash

# .env

# The port your server will run on
PORT=3000

# URL for the external Date Nager API (provides country information)
COUNTRIES_API_URL=https://date.nager.at/api/v3

# URL for the external CountriesNow API (provides population and flag data)
POPULATION_API_URL=https://countriesnow.space/api/v0.1/countries

This configuration sets up the required environment variables for running the back-end server and for fetching external data from third-party APIs.
Running the Application

To start the back-end server, use the following command:

bash

npm start

Alternatively, if you want to automatically restart the server on file changes (useful during development), you can use nodemon:

bash

npx nodemon app.js

Once the server is running, the API will be available at http://localhost:3000.
Testing the API

You can test the API using tools like Postman or curl. Below are some examples of how to interact with the API.
Available Countries

    GET /api/countries: Returns a list of available countries.

    bash

    curl http://localhost:3000/api/countries

Country Information

    GET /api/country/:countryCode: Retrieves detailed information about a specific country (e.g., borders).

    bash

    curl http://localhost:3000/api/country/BR

Country Data (Population and Flag)

    GET /api/country-data/:countryName: Retrieves historical population data and flag URL for a specific country.

    bash

    curl http://localhost:3000/api/country-data/Brazil

API Endpoints

    GET /api/countries: Fetches a list of all available countries.
    GET /api/country/:countryCode: Fetches detailed information about a specific country using its code.
    GET /api/country-data/:countryName: Fetches population data and flag URL for a given country.

Technologies Used

    Node.js: JavaScript runtime for building the server.
    Express.js: Web framework for handling HTTP requests and routes.
    Axios: For making HTTP requests to third-party APIs.
    dotenv: For handling environment variables.
    nodemon: Optional tool for development, to restart the server automatically on changes.