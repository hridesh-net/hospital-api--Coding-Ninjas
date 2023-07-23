# Hospital API

The Hospital API is a Node.js server-side application designed to manage COVID-19 patient records and reports for doctors. This API allows doctors to register, login, and create reports for patients who visit the hospital. It also enables patients to register, and doctors can view all the reports of a specific patient. Additionally, doctors can fetch reports filtered by their status.

## Tech Stack

- Node.js
- MongoDB
- Express.js
- Mongoose
- bcrypt
- jsonwebtoken

## Installation

1. Ensure you have Node.js and MongoDB installed on your system.
2. Clone this repository to your local machine.
3. Install the project dependencies using npm.

```bash
npm install
```

4. Run the project 
```bash
npm start
```

# Configuration
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# API Endpoints
## Doctors
- POST /doctors/register: Register a new doctor with a username and password.
- POST /doctors/login: Login with a registered doctor's credentials and get a JWT token.
## Patients
- POST /patients/register: Register a new patient with a phone number.
- POST /patients/:id/create_report: Create a new patient report for a given patient ID.
- GET /patients/:id/all_reports: Get all reports of a specific patient, sorted from oldest to latest.
## Reports
- GET /reports/:status: Get all reports filtered by a specific status.