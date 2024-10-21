Country Info App (Front-End)

This project is a front-end application built with Next.js that displays a list of countries and detailed information about each country, such as borders, population over time, and flag images.
Table of Contents

    Requirements
    Installation
    Configuration
    Running the Application
    Testing
    Technologies Used

Requirements

Before running this project, ensure you have the following installed on your machine:

    Node.js (version 14 or above)
    npm (comes with Node.js)
    Git (optional, if you're cloning from a repository)

Installation

    Clone this repository (if you haven't already):

    bash

git clone https://github.com/your-username/country-info-app.git

Navigate to the project directory:

bash

cd country-info-app

Install all the necessary dependencies:

bash

    npm install

Configuration

Before running the application, you need to configure the environment variables. Create a .env.local file in the root directory of the project with the following contents:

bash

# .env.local

NEXT_PUBLIC_API_COUNTRIES_URL=http://localhost:3000/api/countries
NEXT_PUBLIC_API_COUNTRY_DATA_URL=http://localhost:3000/api/country-data
NEXT_PUBLIC_API_COUNTRY_INFO_URL=http://localhost:3000/api/country

Make sure your backend server is running on localhost:3000 or update the URLs accordingly.
Running the Application

Once the dependencies are installed and the .env.local file is configured, you can run the application with the following command:

bash

npm run dev

This will start the development server. You can view the application by opening your browser and navigating to http://localhost:3001 (or the port specified).
Testing the Application

To test the application, follow these steps:

    Open the app: Go to http://localhost:3001.
    Country List: A list of countries will be displayed. You can click on any country name to view detailed information.
    Country Info Page: After clicking on a country, you'll see details such as the country's flag, borders, and a population chart over time.

Technologies Used

    Next.js: A React framework for building server-rendered applications.
    React: JavaScript library for building user interfaces.
    Axios: For making HTTP requests to the backend.
    Tailwind CSS: For styling the UI components.
    Recharts: For displaying the population chart.
