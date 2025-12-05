# NASA Mission Control Project 🚀

A full-stack **MERN** application built as part of the **"Complete Node.js Developer"** course by Andrei Neagoie (Zero to Mastery). This project simulates a mission control dashboard that allows users to schedule launches to habitable exoplanets using real-world data.

## 🌟 Features

* **Launch Scheduler:** Schedule missions to Kepler Exoplanets.
* **Mission History:** View upcoming and past launches (utilizing SpaceX API data).
* **Abort Launches:** Cancel scheduled missions.
* **Real Data:**
    * **Planets:** Uses streams to parse Kepler telescope data and identify habitable worlds.
    * **Launches:** Interacts with a database to store mission data.

## 🏗️ Architecture & Tech Stack

This project follows the **MVC (Model-View-Controller)** pattern and separates the client and server for a clean production-ready structure.

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Frontend:** React (served by the Express backend in production)
* **DevOps:** Docker, CI/CD pipelines (GitHub Actions), PM2 for cluster management.

## 📂 Structure

* `client/`: React frontend application.
* `server/`: Node.js Express API.

## 🚀 Getting Started

### Prerequisites
* Node.js and npm installed.
* MongoDB running locally or a MongoDB Atlas URI.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/RafaelMolyna/nasa_project.git](https://github.com/RafaelMolyna/nasa_project.git)
    cd nasa_project
    ```

2.  **Install dependencies:**
    The root `package.json` contains scripts to install dependencies for both client and server.
    ```bash
    npm install
    ```

3.  **Run the application:**
    You can run both the client and server concurrently using the included script:
    ```bash
    npm run watch
    ```
    * The API will run on `PORT 8000`.
    * The React app will typically run on `PORT 3000`.

4.  **Visit the App:**
    Open `http://localhost:3000` in your browser.

## 🧪 Testing

The project includes tests using **Jest** and **Supertest**.
```bash
npm test
