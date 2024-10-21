Country Info Application

This project provides detailed information about countries, including population data and border countries. The application is separated into two parts:

    Frontend (country-info-frontend)
    Backend (country-info-app)

Table of Contents

    Installation
    Running the Project
    Environment Variables
    Technologies

Installation
Clone the repository:

git clone https://github.com/ClaudioShowza/Repo_DT_Test.git
cd Repo_DT_Test

Backend Setup

    Navigate to the backend directory:

cd country-info-app

    Install backend dependencies:

npm install

    Set up environment variables by creating a .env file in the root of country-info-app:

PORT=3000
COUNTRIES_API_URL=<Insert API URL for country data>
POPULATION_API_URL=<Insert API URL for population data>

    Run the backend server:

npm start

Frontend Setup

    Navigate to the frontend directory:

cd country-info-frontend

    Install frontend dependencies:

npm install

    Create a .env file in the country-info-frontend directory with the following content:

NEXT_PUBLIC_API_URL=http://localhost:3000/api

    Run the frontend application:

npm run dev

The frontend will be accessible at http://localhost:3001 (or any other port specified by Next.js).
Running the Project

    Start the backend by running npm start in the country-info-app folder.
    Then, start the frontend by running npm run dev in the country-info-frontend folder.

The backend will serve data, and the frontend will display it.
Environment Variables

Both the backend and frontend require environment variables for proper operation. See the Installation section for the required variables.
Technologies

    Backend: Node.js, Express, Axios
    Frontend: Next.js, Tailwind CSS, Axios
    Other Tools: ESLint, Prettier, GitHub Actions
