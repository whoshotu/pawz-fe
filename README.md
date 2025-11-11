# Pawz-FE (Frontend)

Welcome to Pawz-FE, the frontend for the Paws Connect application. This project is a **Create React App (CRA)** based single-page application that allows users to connect with other pet owners, share posts, and manage their pet profiles.

**Important:** This README is the single source of truth for this project. All developers are required to keep it updated with any changes to the architecture, dependencies, or development process.

## Table of Contents

- [Pawz-FE (Frontend)](#pawz-fe-frontend)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Key Dependencies](#key-dependencies)
  - [Architectural Overview](#architectural-overview)
    - [State Management](#state-management)
    - [API Communication](#api-communication)
  - [Known Issues \& Fixes](#known-issues--fixes)
    - [1. Critical Bug: Missing Dependency](#1-critical-bug-missing-dependency)
    - [2. Configuration Issue: Missing API Proxy](#2-configuration-issue-missing-api-proxy)
    - [3. Code Cleanup: Unused Boilerplate](#3-code-cleanup-unused-boilerplate)
    - [4. Inefficient Data Fetching in Feed](#4-inefficient-data-fetching-in-feed)

---

## Getting Started

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd pawz-fe/frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment:** Create a `.env` file in the `frontend` directory and add the backend server URL.
    ```
    REACT_APP_API_BASE_URL=http://localhost:5000
    REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```

### Running the Application

Once the dependencies are installed and the backend server is running, you can start the development server:

```bash
npm start
```

This will open the application in your default browser at `http://localhost:3000`.

---

## Project Structure

The `frontend` directory contains the entire React application.

```
/frontend
├── package.json
├── public/             # Static assets and index.html
└── src/
    ├── components/     # Reusable React components
    ├── context/        # React Context providers for state management
    ├── utils/          # Utility functions, like the API client
    ├── App.js          # Main application component with routing
    ├── index.js        # Entry point of the application
    └── theme.js        # MUI theme configuration
```

---

## Available Scripts

In the `frontend` directory, you can run the following scripts:

-   `npm start`: Runs the app in development mode.
-   `npm test`: Launches the test runner in interactive watch mode.
-   `npm run build`: Builds the app for production to the `build` folder.
-   `npm run eject`: Ejects the app from Create React App's managed configuration. **Warning:** This is a one-way operation.

---

## Key Dependencies

-   **React & React Router:** For building the user interface and handling routing.
-   **Material-UI (MUI):** For UI components and styling.
-   **Axios:** For making HTTP requests to the backend API.
-   **React Context:** For global state management.

---

## Architectural Overview

### State Management

The application uses React's Context API for global state management. Providers are organized in `src/context/` and composed in `src/context/AppProviders.js`.

-   `AuthContext`: Manages user authentication state and tokens.
-   `PetContext`: Manages pet profiles.
-   `PostContext`: Manages the main feed of posts.
-   `ProfileContext`: Manages user profiles.
-   `ServiceProvider`: Manages service-related data.

### API Communication

All communication with the backend is handled through a centralized Axios instance in `src/utils/api.js`. This instance is configured to:

1.  Use a relative `baseURL` of `/api`. This requires a `proxy` setting in `package.json` for local development to work correctly.
2.  Automatically attach the user's authentication token (from `localStorage`) to the headers of all outgoing requests.

---

## Known Issues & Fixes

This section documents known issues and the steps to resolve them.

### 1. Critical Bug: Missing Dependency

-   **Issue:** The `Feed.js` component uses the `react-pull-to-refresh` library, which is not declared as a dependency in `package.json`. This will crash the app.
-   **Fix:** Install the missing dependency.
    ```bash
    npm install react-pull-to-refresh
    ```

### 2. Configuration Issue: Missing API Proxy

-   **Issue:** API calls are configured to go to `/api`, but the development server doesn't know where to proxy these requests. This will result in failed network requests.
-   **Fix:** Add the following line to `frontend/package.json` to proxy API requests to your backend server (assuming it runs on port 5000).
    ```json
    "proxy": "http://localhost:5000"
    ```

### 3. Code Cleanup: Unused Boilerplate

-   **Issue:** The project contains unused boilerplate files from Create React App.
-   **Fix:** The following files are not used and can be safely deleted to clean up the codebase:
    -   `frontend/src/App.css`
    -   `frontend/src/logo.svg`
    -   `frontend/src/App.test.js`

### 4. Inefficient Data Fetching in Feed

-   **Issue:** The `Feed.js` component only fetches data if the `posts` array is empty. This prevents the feed from being updated with fresh data if the user navigates away and then returns.
-   **Fix:** The `useEffect` hook in `frontend/src/components/Feed.js` should be modified to fetch data every time the component mounts.

    **Current Code:**
    ```javascript
    useEffect(() => {
      if (posts.length === 0) {
        fetchPosts();
      }
    }, [fetchPosts]);
    ```

    **Suggested Fix:**
    ```javascript
    useEffect(() => {
      fetchPosts();
    }, [fetchPosts]);
    ```