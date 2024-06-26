﻿# Slidely Forms Backend

This project is the backend for the Slidely Forms application. It provides APIs for managing submissions, including creating, reading, updating, deleting, and searching submissions.

## Features

- **Create Submission:** Endpoint to submit new entries.
- **Read Submission:** Endpoint to read a submission by its index.
- **Count Submissions:** Endpoint to get the total count of submissions.
- **Delete Submission:** Endpoint to delete a submission by its index.
- **Edit Submission:** Endpoint to edit an existing submission.
- **Search Submissions:** Endpoint to search submissions by email.

## Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Mohammad-Shahid-07/slidely-form-backend
   cd slidely-form-backend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Server:**
   - **Development Mode:**
     ```bash
     npm run dev
     ```
   - **Production Mode:**
     ```bash
     npm run build
     npm run serve
     ```

4. **Access the Server:**
   The server will be running on `http://localhost:3000`.

## API Endpoints

- **Ping Server:**
  ```http
  GET /ping
  ```
  - Checks if the server is running.
  - **Response:** `true`

- **Submit a Submission:**
  ```http
  POST /submit
  ```
  - **Request Body:**
    ```json
    {
      "Name": "John Doe",
      "Email": "john.doe@example.com",
      "Phone": "123-456-7890",
      "GitHubLink": "https://github.com/johndoe",
      "StopwatchTime": "00:02:15"
    }
    ```
  - **Response:** Created submission.

- **Read a Submission:**
  ```http
  GET /read?index=<index>
  ```
  - **Query Parameter:**
    - `index` (integer) - Index of the submission to read.
  - **Response:** Submission object at the specified index.

- **Count Submissions:**
  ```http
  GET /count
  ```
  - **Response:** Total count of submissions.
    ```json
    { "count": 10 }
    ```

- **Delete a Submission:**
  ```http
  DELETE /delete?index=<index>
  ```
  - **Query Parameter:**
    - `index` (integer) - Index of the submission to delete.
  - **Response:** Confirmation message.

- **Edit a Submission:**
  ```http
  PUT /edit?index=<index>
  ```
  - **Query Parameter:**
    - `index` (integer) - Index of the submission to edit.
  - **Request Body:** Updated submission object.
  - **Response:** Updated submission.

- **Search Submissions:**
  ```http
  GET /search?email=<email>
  ```
  - **Query Parameter:**
    - `email` (string) - Email to search submissions by.
  - **Response:** List of submissions matching the email.

## File Structure

- **src/index.ts:** Main entry point for the application.
- **db.json:** Database file storing submissions.

## Development Scripts

- `npm start`: Starts the server using `ts-node`.
- `npm run build`: Compiles TypeScript files to JavaScript.
- `npm run serve`: Starts the server using compiled JavaScript files.
- `npm run dev`: Starts the server in development mode using `ts-node-dev`.

## Author

Mohammad Shahid

