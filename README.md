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


## Scalability & Future Improvements

### How to Scale to 1,000+ Properties

This architecture is designed with specific, scalable technologies to handle significant growth.

1.  **Asynchronous Task Processing with Queues:** For slow or non-critical operations (like generating reports or syncing with third-party APIs), we will use **AWS SQS (Simple Queue Service)**. The API will add a job to the queue, and a separate worker service will process it asynchronously. This prevents API timeouts and ensures the application remains responsive.

2.  **Caching:** A caching layer will be implemented using **Redis** (deployed on AWS ElastiCache). Frequently accessed, non-critical data (like property lists or user permissions) will be stored in this in-memory cache to dramatically reduce database load and improve API response times.

3.  **Database Optimization:**
    *   **Indexing:** We will add indexes to key columns in our PostgreSQL tables, such as the `status` column on `Properties` and the `propertyId` column on `Tasks`. This is a code-level change that drastically speeds up query performance.
    *   **Read Replicas:** For our read-heavy dashboard, we will configure the database with a **Read Replica**. All write operations will go to the primary database, while read operations will be distributed to the replica, effectively doubling our read capacity.

4.  **Containerization with Docker:** The entire application (backend, frontend) will be containerized using **Docker**. This ensures a consistent and reproducible environment across development, testing, and production, which is essential for reliable deployments.

### Improvements for the Future

*   **Robust Validation:** Implement comprehensive request validation using **Joi**. This library provides a powerful and declarative API to ensure data integrity at the API entry point, preventing bad data from ever reaching the business logic.
*   **Authentication & Authorization:** Add user authentication with JWTs and a role-based access control (RBAC) system to secure the endpoints.
*   **Unit & Integration Testing:** Write comprehensive tests using **Jest** as the testing framework and **Supertest** to test the API endpoints. This combination ensures code quality and prevents regressions.
*   **CI/CD Pipeline:** Set up a CI/CD pipeline using **GitHub Actions** to automate the testing and deployment process whenever new code is pushed to the main branch.

## Deployment on AWS

The following architecture is designed to be scalable, secure, and cost-effective for handling 1,000+ properties using managed AWS services to reduce operational overhead.

| Component | AWS Service(s)                                   | Description                                                                                                                             |
| :-------- | :----------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**  | **S3** + **CloudFront**                          | The React application will be deployed as static files to an AWS S3 bucket. AWS CloudFront will serve as the CDN to distribute it globally, providing low latency and a free SSL certificate. |
| **Backend**   | **ECS with Fargate** + **Application Load Balancer** | The Node.js backend will be run as Docker containers on AWS ECS with Fargate. Fargate is "serverless," so we don't manage servers. The Application Load Balancer will distribute traffic across multiple containers for high availability. |
| **Database**  | **RDS for PostgreSQL**                           | We will use Amazon RDS, a managed database service. This handles backups, patching, and security. We can easily enable Multi-AZ for failover and add Read Replicas for scalability. |
| **Caching**   | **ElastiCache for Redis**                        | A managed Redis service that provides a high-performance caching layer for our backend.                                                  |
| **Queuing**   | **SQS (Simple Queue Service)**                   | A fully managed message queue for decoupling background tasks from the main API, ensuring reliability and responsiveness.                  |

## Deployment Cost Estimation

**Disclaimer:** The following is a **rough estimate** for a production environment handling over 1,000 properties with moderate traffic. Actual costs will vary based on user activity, data storage, and specific configurations.

This estimate assumes a highly available setup with separate resources for the API and background workers.

| Service                               | Configuration Assumption                                       | Estimated Monthly Cost | Estimated Yearly Cost |
| :------------------------------------ | :------------------------------------------------------------- | :--------------------- | :-------------------- |
| **ECS on AWS Fargate** (Backend)      | 2 containers (1 API, 1 worker), 1 vCPU / 2 GB RAM each         | ~$75 USD               | ~$900 USD             |
| **RDS for PostgreSQL** (Database)     | 1 `db.t4g.medium` instance, 100 GB storage, Multi-AZ enabled   | ~$150 USD              | ~$1,800 USD           |
| **ElastiCache for Redis** (Caching)   | 1 `cache.t4g.small` node                                       | ~$40 USD               | ~$480 USD             |
| **Application Load Balancer**         | Standard processing for moderate traffic                       | ~$25 USD               | ~$300 USD             |
| **S3 + CloudFront** (Frontend)        | Standard storage and data transfer                             | ~$5 USD                | ~$60 USD              |
| **AWS SQS** (Queuing)                 | Likely covered by the perpetual free tier (1M requests/month)  | $0 USD                 | $0 USD                |
| **Data Transfer & Other**             | General egress and NAT Gateway costs                           | ~$20 USD               | ~$240 USD             |
| **Total Estimated Cost**              |                                                                | **~$315 USD / Month**  | **~$3,780 USD / Year**|

## Architecture Diagram

Here is a high-level overview of the system architecture:

![System Architecture Diagram](https://github.com/ImUlyssus/premium-rent/blob/main/Proposed_Architecture-2025-10-24-150504.png "High-level system architecture")

## Architecture Overview

This system architecture is designed for a highly available and scalable application, separating concerns into distinct zones to optimize performance, manageability, and cost. It handles both synchronous user-facing requests and asynchronous background tasks efficiently.

### 1. Edge & Client Zone

The journey begins in the **Edge & Client Zone**, which serves as the primary entry point for all users. When a user accesses the application, their **Browser** first interacts with **AWS CloudFront**, a global Content Delivery Network (CDN). CloudFront plays a dual role: it efficiently delivers the static files (HTML, CSS, JavaScript) of the React frontend application, which are stored in an **AWS S3 bucket designated for the Frontend**. Once the React application is loaded, any subsequent API calls (e.g., fetching property data) made by the browser are also routed through CloudFront, which then intelligently forwards these dynamic requests to the backend.

### 2. Synchronous Backend Zone

Incoming API requests from CloudFront are directed to the **Synchronous Backend Zone**. Here, an **Application Load Balancer (ALB)** distributes these requests across multiple instances of your API service running on **AWS ECS on Fargate**. This setup ensures high availability and horizontal scalability, allowing the system to handle varying loads seamlessly. The API Service, typically a Node.js application, acts as the central orchestrator for synchronous operations. It processes user requests, interacting with the Data Zone to retrieve or store information, and delegates time-consuming tasks to the Asynchronous Zone, ensuring a quick response back to the user. It also handles the generation of pre-signed URLs for direct photo uploads to S3.

### 3. Data & Storage Zone

The **Data & Storage Zone** is the persistent heart of the application, housing all critical data. It features **AWS RDS for PostgreSQL**, configured with a **Primary DB** for all write operations (like creating new entries or updating existing ones) and a **Read Replica** to offload and scale read-heavy queries (such as listing properties). This separation enhances database performance and reliability. For faster data retrieval, **AWS ElastiCache for Redis** serves as an in-memory cache, reducing the load on the database for frequently accessed information. User-generated content, specifically photos, are stored in a dedicated **AWS S3 bucket for Photos/Uploads**. A key optimization here is that the user's browser, after receiving a temporary pre-signed URL from the API, uploads photos directly to this S3 bucket, bypassing the backend API and freeing up its resources.

### 4. Asynchronous Backend Zone

Tasks that don't require an immediate response to the user are handled by the **Asynchronous Backend Zone**. The API Service dispatches these tasks as messages to **AWS SQS (Simple Queue Service)**, a managed message queuing service. This allows the API to quickly respond to the user while the background work proceeds independently. A separate **Worker Service**, also running on **AWS ECS on Fargate**, constantly polls the SQS queue for new messages. Upon receiving a message, the Worker Service processes the task, which often involves performing operations like complex data processing or sending notifications, typically interacting with the RDS Primary DB to update data. This asynchronous pattern significantly improves the responsiveness and scalability of the overall system.

In summary, these zones work in concert: the Edge & Client Zone provides a fast user experience, the Synchronous Backend handles immediate requests, the Data & Storage Zone ensures data persistence and fast access, and the Asynchronous Backend efficiently manages background operations, all contributing to a robust and scalable application.


### Key Architectural Decisions & Trade-offs

The design of this architecture involved several deliberate trade-offs, to prioritize specific project goals while understanding the implications of each choice:

*   **TypeScript for Frontend Development:** The frontend utilizes React with TypeScript. This choice prioritizes **improved code quality, better maintainability, and an enhanced developer experience** through static type checking, which catches errors early. The trade-off we accepted is a **slightly steeper learning curve for developers new to TypeScript and the added compilation step** during development and build processes, which introduces minor overhead compared to plain JavaScript. We deem this acceptable for the long-term benefits of robust and scalable frontend development.

*   **Node.js for Backend:** I chose Node.js and Express.js for their **non-blocking I/O model, highly efficient for an API gateway** that frequently interacts with external services. This decision prioritizes responsiveness and scalability for I/O-bound operations. The implicit trade-off is that Node.js, due to its single-threaded event loop, **may not be the optimal choice for purely CPU-bound computational tasks**, where other languages might offer better performance.

*   **PostgreSQL as Primary Database:** PostgreSQL was selected for its **robust data integrity, transactional consistency, and powerful relational capabilities**, which are essential for managing complex relationships between properties and tasks. This prioritizes strong data guarantees and mature querying. The trade-off is **less schema flexibility and "easy" horizontal scaling for certain use cases** compared to some NoSQL databases, where data consistency might be relaxed for greater distribution.

*   **Sequelize (ORM) for Database Interaction:** Utilizing Sequelize as an Object-Relational Mapper (ORM) significantly **enhances developer velocity, code readability, and security** by abstracting raw SQL queries and simplifying migrations. This choice trades a degree of **fine-grained control and potential micro-optimizations** (which could be achieved with raw, hand-tuned SQL) for improved maintainability and faster development cycles.

*   **Layered Backend Architecture:** The backend follows a distinct layered architecture (controllers, services, models) with a dedicated `services` layer for business logic and external API abstraction. This promotes **scalability, maintainability, and testability** by clearly separating HTTP concerns from core business logic. The trade-off is a **slightly higher initial boilerplate and structural complexity** compared to a less-layered approach, which is a conscious investment in long-term robustness and extensibility.

*   **Extensive Use of Managed AWS Services:** For deployment, we can use managed AWS services like Fargate, RDS, ElastiCache, SQS, S3, and CloudFront. This significantly **reduces operational overhead, provides inherent scalability, high availability, and security features** without requiring us to manage underlying infrastructure. This choice accepts **potentially higher direct infrastructure costs and a degree of vendor lock-in** in exchange for reduced operational burden, increased reliability, and faster time-to-market.
