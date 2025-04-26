# Project Overview

This project consists of two primary parts: the **Frontend** and the **Backend**.

- The **Frontend** is built using **Vue.js** and interacts with the backend API to display and manage stock data and user favorites.
- The **Backend** is built using **NestJS** and provides a RESTful API for managing stock data, favorites, and secure data encryption.

## Architecture Overview

### Frontend (Vue.js)

The frontend is a **Vue.js** application that communicates with the **NestJS** backend through HTTP requests. It is designed to be lightweight, responsive, and secure.

- **Vue 3**: The core framework.
- **Vue Router**: Used for routing and navigation between different views.
- **Axios**: A promise-based HTTP client for making requests to the backend API.
- **CryptoJS**: Used for decrypting data sent from the backend.

### Backend (NestJS)

The backend is built using **NestJS**, a progressive Node.js framework that provides an out-of-the-box architecture for building scalable applications.

- **NestJS**: The main framework.
- **TypeORM**: An Object-Relational Mapper (ORM) for interacting with the PostgreSQL database.
- **PostgreSQL**: The database used for storing stock and user favorites data.
- **JWT Authentication**: Token-based authentication for secure communication (if applicable in the future).
- **Throttler**: Rate limiting for API requests to prevent abuse.
- **Sanitization**: Ensures that outgoing responses are sanitized to prevent XSS attacks.

---

## Setup Instructions

### Prerequisites

- **Node.js**: You must have **Node.js** (version 16 or later) installed on your machine.
- **PostgreSQL**: Install PostgreSQL and ensure that it is running locally or on a cloud instance.
- **Git**: Required for cloning the repository.

---

### Frontend (Vue.js)

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anil-bhusal/stock-dashboard.git
   cd stock-dashboard
   ```

2. **Navigate to the frontend directory**:

   ```bash
   cd stock-dashboard-frontend
   ```

3. **Install the dependencies**:

   ```bash
   npm install
   ```

4. **Set up environment variables**:

   Create a `.env` file in the `frontend` folder and define your environment variables, such as:

   ```bash
   VITE_API_BASE_URL="http://localhost:3000/"
   VITE_SECRET_KEY=He1l0-NZ
   ```

5. **Run the Vue.js development server**:

   ```bash
   npm run dev
   ```

   This will start the frontend at `http://localhost:5173`.

---

### Backend (NestJS)

1. **Navigate to the backend directory**:

   ```bash
   cd stock-dashboard-backend
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the `backend` folder and define your environment variables, such as:

   ```bash
    ALPHA_VANTAGE_API_KEY='https://www.alphavantage.co/query'
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=anil
    DB_NAME=stock_db
    SECRET_KEY=He1l0-NZ
   ```

4. **Run database migrations** (if using TypeORM):

   ```bash
   npm run typeorm migration:run
   ```

5. **Run Seed**
   Populate the database with initial data:

   ```bash
   npm run seed
   ```

6. **Run the NestJS backend server**:

   ```bash
   npm run start:dev
   ```

   This will start the backend server at `http://localhost:3000`.

---

### Testing the Setup

1. **Frontend**:

   - Open the frontend application in your browser at `http://localhost:5173`.
   - The homepage should load, showing stock data fetched from the backend.
   - You can interact with the UI and see the data changes.

2. **Backend**:
   - You can test the backend API by making GET requests to endpoints.
   - You can use Postman or any other API client to test the endpoints.

---

## Security Considerations

### Data Encryption

In this project, sensitive data is encrypted before being sent from the backend to the frontend using **AES encryption**. The frontend decrypts the data using the same secret key.

### API Security

- **Rate Limiting**: The backend uses **ThrottlerModule** for rate-limiting requests, preventing abuse and Denial of Service (DoS) attacks.
- **Sanitization**: Responses are sanitized to prevent Cross-Site Scripting (XSS) attacks.
- **Exception Handling**: Custom exception filters are used to catch and handle errors gracefully.

---

## Folder Structure

### Frontend (Vue.js)

```
stock-dashboard-frontend/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   ├── composables/
│   ├── router/
│   ├── types/
│   ├── utils/
│   ├── views/
│   ├── App.vue
│   ├── counter.ts
│   ├── env.d.ts
│   ├── main.ts
│   ├── style.css
│   ├── typescript.svg
│   ├── vite-env.d.ts
├── .env
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── tsconfig.json
├── vite.config.ts

```

### Backend (NestJS)

```
stock-dashboard-backend/
├── dist/
├── node_modules/
├── src/
│   ├── common/
│   ├── config/
│   ├── favorite/
│   ├── migrations/
│   ├── stock/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── data-source.ts
│   ├── main.ts
├── test/
├── .dockerignore
├── .env
├── .gitignore
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
```

---

## Further Improvements

- **Authentication and Authorization**:Implement JWT-based authentication to secure APIs and protect user-specific operations such as managing favorite stocks. Role-based access control (RBAC) can be added to support different permission levels (e.g., admin, user). Refresh token mechanism for enhanced session management and secure automatic login.
- **Database Optimizations**: Indexing: Create database indexes on frequently queried fields (e.g., symbol, user_id) to significantly improve query performance. Query optimization: Analyze slow queries and optimize them with better indexing strategies, query restructuring, or materialized views. Caching: Integrate caching (e.g., using Redis) to cache frequently accessed stock data and reduce database load, especially for public stock information.
- **Frontend Enhancements**: Stock Search and Filters: Implement powerful search and dynamic filtering capabilities for quicker navigation through large stock datasets. Sorting and Pagination: Enable users to sort stocks by attributes like price, volume, or market cap and implement efficient pagination or infinite scroll. Optimistic UI Updates: Improve responsiveness by updating the UI immediately while background API operations complete.
- **CI/CD and Deployment Improvements**: Set up CI pipelines (GitHub Actions, GitLab CI) to automate build, test, and linting processes on every pull request. Configure CD pipelines to automatically deploy successful builds to staging or production environments (using services like Vercel, AWS, or DigitalOcean).
- **Monitoring and Logging**: Logging: Add structured and centralized logging (e.g., using Winston or Pino) for backend error tracking and auditing. Monitoring: Integrate APM (Application Performance Monitoring) tools like New Relic, Sentry, or Datadog to track server performance and error rates.
- **Scalability Improvements**: Microservices: As the application grows, consider breaking it into smaller services (e.g., stock service, favorites service) for better maintainability and scalability. Message Queues: Introduce asynchronous communication using queues like RabbitMQ or Kafka for heavy operations.

---

## Conclusion

This application provides a secure, efficient way to manage stock data and favorites, with proper handling of sensitive information, rate-limiting, and sanitization. By following the steps in this README, you can set up both the frontend and backend locally and start contributing to the project.
