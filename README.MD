Blockhouse Project - Dashboard App

Overview
This project is a web application that provides a dashboard with multiple charts (Candlestick, Line Chart, Bar Chart, and Pie Chart). The frontend is built using Next.js, and the backend API is powered by Django. Both services are containerized with Docker for easy setup and deployment.

Project Structure

/Blockhouse Project
│
├── /my_dashboard_api              # Django Backend
├── /my-dashboard-app              # Next.js Frontend
├── docker-compose.yml             # Docker Compose file for both services
└── README.txt                      # Project documentation

Requirements
- Docker
- Docker Compose

Setup Instructions

1. Clone the repository:
   git clone <repository-url>
   cd Blockhouse-Project

2. Build and Run the Application using Docker Compose:
   docker-compose up --build

   This will:
   - Build the Django API and run it at http://localhost:8000.
   - Build the Next.js frontend and run it at http://localhost:3000.

3. Access the Application:
   - Open your browser and navigate to http://localhost:3000 to access the dashboard.

API Endpoints (Backend)
The following API endpoints provide data for the charts:
- /api/candlestick-data/ – Returns data for the Candlestick chart.
- /api/line-chart-data/ – Returns data for the Line chart.
- /api/bar-chart-data/ – Returns data for the Bar chart.
- /api/pie-chart-data/ – Returns data for the Pie chart.

Frontend (Next.js)
The frontend displays the following charts:
- Candlestick Chart
- Line Chart
- Bar Chart
- Pie Chart

Data is fetched from the Django backend and dynamically rendered into the charts.

Technology Stack

- Frontend: Next.js, TypeScript, Chart.js (or Recharts for Candlestick), Axios
- Backend: Django, Django REST framework, Python
- Containerization: Docker, Docker Compose

Additional Features

- TypeScript is used for type safety in the Next.js application.
- Docker is used for easy containerized deployment of both the frontend and backend services.


