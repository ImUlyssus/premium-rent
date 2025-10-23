# Property & Task Management Tool

This project is the foundational prototype for an internal "Property & Task Management Tool". It features a scalable backend built with Node.js and a functional frontend using React, designed to handle property and task management efficiently.

## Core Features

*   **Property Management:** Create, read, update, and delete properties.
*   **Task Management:** Assign and track tasks for each property.
*   **Filtering:** List all tasks for a specific property and filter properties by status.
*   **RESTful API:** A well-defined API for interacting with the data.
*   **Simple UI:** A minimal dashboard to demonstrate the core functionalities.

## Tech Stack

| Area      | Technology                                                                                                                              |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Backend** | **Node.js**, **Express.js**, **PostgreSQL**, **Sequelize (ORM)**                                                                          |
| **Frontend**| **React (with TypeScript & Vite)**, **Tailwind CSS**                                                                                      |
| **DevOps**  | The architecture is prepared for containerization with **Docker**.                                                                      |

### Why these technologies?

*   **Node.js/Express.js:** Chosen for its non-blocking I/O model, which is excellent for building fast, scalable, I/O-heavy applications like an API gateway that will connect to multiple external services.
*   **PostgreSQL:** Selected for its reputation for reliability, data integrity, and powerful features that are crucial for scaling to thousands of properties with complex data relationships.
*   **Sequelize:** Used as an ORM to abstract database queries, making the code cleaner, more secure, and easier to maintain. It also provides a structured way to manage database migrations.
*   **React.js (Vite):** A modern, efficient choice for building a dynamic and responsive user interface. Vite provides an extremely fast development experience.

## Project Structure

The project is organized into a `backend` and `frontend` monorepo structure, promoting a clear separation of concerns and independent development workflows.

### Backend Structure

The backend follows a layered architecture designed for scalability and maintainability. This design separates the API/HTTP logic from the core business logic, which is crucial for integrating multiple services.

```
backend/
├── config/                 # Environment variables and database configuration
├── controllers/            # Handles HTTP request/response cycle
├── models/                 # Sequelize data models (Property, Task)
├── migrations/             # Database schema versioning
├── routes/                 # Defines API endpoints and maps them to controllers
├── services/               # **KEY FOLDER for business logic & 3rd party APIs**
│   ├── propertyService.js  # Logic for properties (interacts with our db)
│   ├── taskService.js      # Logic for tasks (interacts with our db)
│   └── external/           # Sub-folder for all third-party API clients
│       ├── hostawayService.js
│       └── opertoService.js
│       └── notionService.js
└── server.js               # Express server setup and entry point
```

*   **`routes`**: Maps incoming API URLs to the correct controller functions. For example, a `GET` request to `/api/properties` is routed to the `getProperties` function in the `propertyController`.

*   **`controllers`**: Manages the HTTP layer. It receives requests, validates incoming data (in the future), calls the appropriate service to perform the main action, and formats the final HTTP response to send back to the client.

*   **`services`**: This is the core of the application. This layer is responsible for all business logic and is designed to be the single source of truth for data operations.
    *   **Internal Logic**: Services like `propertyService.js` and `taskService.js` interact directly with our own database via the Sequelize `models`.
    *   **External API Abstraction**: The `services/external/` directory is designed to isolate all third-party API interactions. Each file (e.g., `hostawayService.js`) acts as a dedicated client for that external service. This way, our main services can call `hostawayService.syncListings()` without needing to know the complex details of Hostaway's API. This makes the code cleaner and allows us to easily swap out or update external integrations without affecting the rest of the application.

*   **`models`**: Defines the database schema and relationships using Sequelize. `Property.js` and `Task.js` directly map to the tables in our PostgreSQL database.

### Frontend Structure

The frontend is structured to keep UI components, API communication, and application state organized.

```
frontend/
├── src/
│   ├── api/                # Functions to call your backend endpoints
│   ├── components/         # Reusable UI components (common and feature-specific)
│   ├── hooks/              # Custom React hooks for state and logic
│   ├── pages/              # Top-level page components
│   ├── App.tsx             # Main application component with routing
│   └── main.tsx            # Application entry point
└── .env.example
```

*   **`api`**: Centralizes all `fetch` or `axios` calls to the backend. This makes it easy to manage API endpoints, handle errors, and add authentication headers in one place.
*   **`components`**: Contains reusable React components. The separation into `common/` (e.g., `Button`, `Modal`) and feature-specific folders (e.g., `properties/`) keeps the UI library clean.
*   **`pages`**: These components represent the main views of the application, such as the `DashboardPage` or `PropertyTasksPage`, and are responsible for composing the layout from various smaller components.

## API Endpoints

The API is structured around two main resources: `properties` and `tasks`. The base routes are configured in `server.js` as `/api/properties` and `/api/tasks`.

The following endpoints are available:

| Method   | Endpoint                            | Description                                |
| :------- | :---------------------------------- | :----------------------------------------- |
| `GET`    | `/api/properties`                   | Get a list of all properties.              |
| `POST`   | `/api/properties`                   | Create a new property.                     |
| `GET`    | `/api/properties/:id`               | Get a single property by its ID.           |
| `PUT`    | `/api/properties/:id`               | Update an existing property.               |
| `DELETE` | `/api/properties/:id`               | Delete a property.                         |
| `GET`    | `/api/properties/:propertyId/tasks` | Get all tasks for a specific property.     |
| `POST`   | `/api/tasks`                        | Create a new task (requires `propertyId`). |
| `PUT`    | `/api/tasks/:id`                    | Update an existing task.                   |
| `DELETE` | `/api/tasks/:id`                    | Delete a task.                             |
## How to Run This Project

### Prerequisites

*   Node.js (v18+)
*   PostgreSQL
*   npm

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file from the example and add your database credentials
cp .env.example .env

# Set up the PostgreSQL database
# 1. Connect to psql: psql -U your_username
# 2. Create the database: CREATE DATABASE your_db_name;

# Run database migrations to create the tables
npx sequelize-cli db:migrate

# Start the development server
npm run dev
# The server will be running on http://localhost:3001
```

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
# The application will be available at http://localhost:5173
```

