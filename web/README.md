# React + TypeScript + Vite

# Course Selling Website

Welcome to the Course Selling Website, a full-stack web application for managing and selling courses. This project is built using React, TypeScript, Node.js, Express.js, and MongoDB, and it utilizes JSON Web Tokens (JWT) for authentication.

## Table of Contents
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/course-selling-website.git
   cd course-selling-website


2. Install the dependencies:
   npm install  # or yarn install

3. Configure Environment Variables

Create a .env file in the root directory and add the following environment variables:

PORT=3000
MONGODB_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key


Features
Authentication: User authentication using JWT. Only administrators can access certain features.
Admin Dashboard: An admin dashboard for managing courses.
Course Management: Create, read, update, and delete courses.
Responsive Design: The website is designed to be responsive and work well on various screen sizes.
State Management: Utilizes Recoil for state management.


4. Start the server:
    npm run server
    # or
    yarn run server

 5.  Start the frontend:

     npm start
    # or
    yarn start

6. Open your browser and access the application at http://localhost:3000.



















