# TourINDIA

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [Contact](#contact)
- [Announcement](#announcement)

## Introduction

The Tourism India project is a web application that helps tourists plan their trips to India. The application allows users to provide their preferences, such as nationality, type of visit, accommodation preferences, sightseeing activities, and more. Based on these inputs, the application generates a custom travel report for the user, providing them with personalized recommendations and useful information for their trip.

## Still in Development

Safety features are also incorporated within, such as SOS, which notifies nearby police stations and provides the location of nearby hospitals in case of emergencies. With the rising cases of harassment, I believe this could be an important feature to add.

## Features

- Select nationality and type of visit to India.
- Choose cities to visit and accommodation preferences.
- Specify the number of adults and children in the group.
- Indicate if special care is needed (childcare, health care, entertainment).
- Provide specific health care demands if required.
- Select sightseeing and activity preferences.
- Add any additional information for further customization.
- Generate a report with personalized recommendations.

## Technologies Used

- Frontend: React.js (JavaScript)
- Backend: Node.js (Express.js)
- Database: JSON (UserData.json)
- Map API: Google Maps API (for SOS functionality)
- PDF Generation: react-pdf/renderer
- Styling: Material-UI

## Getting Started

### Prerequisites

Before running the project, you need to have the following installed on your machine:

- Node.js (https://nodejs.org) - Make sure to install the LTS version.
- vite.js (https://vitejs.dev/) - Make sure to install using npm install vite@latest.

### Installation

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/your-username/TourismIndia.git
   ```

2. Install the required dependencies for both frontend and backend:

   ```bash
   cd TourismIndia/TourIndia
   npm install

   cd ../tourism-app
   npm install
   ```

## Usage

1. Start the backend server:

   ```bash
   cd tourism-app
   node server.js
   ```

   The backend server will be running on `http://localhost:3000`.

2. Start the frontend development server:

   ```bash
   cd TourIndia
   npm run dev
   ```

   The frontend development server will be running on `http://localhost:5173/`.


## API Endpoints

The backend server provides the following API endpoint:

- `POST /api/storeReport`: Endpoint to store the generated report data in 'UserData.json'.

## Contributing

I welcome contributions to improve the Tourism India project. To contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request to the original repository.

## Contact

If you have any questions or suggestions regarding the Tourism India project, feel free to contact us:

- Email: manibajpaiofficial@gmail.com
- GitHub: https://github.com/ManiBAJPAI22
- Twitter: https://twitter.com/ManiBajpai22

## Announcement 
This project is still in development phase. 
I will make sure to keep you all updated here.
Issues still facing: 
1. Not able to use react-pdf renderer.
2. Not able to use Axios.
Help is Appreciated!!

Thank You 🌞