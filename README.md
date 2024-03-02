# Habit Forge

Unlock the power of daily discipline with Habit Forge, the intuitive checklist app designed to help you forge and track your habits with ease. Whether you're looking to establish a morning meditation, ensure you drink enough water, or never miss a workout, Habit Forge is your steadfast companion.

# Table of Contents

1. [Getting Started](#getting-started)
2. [MongoDB Setup](#MongoDB-Setup)
3. [Features](#features)
4. [Environment](#environment)
5. [Dependencies](#dependencies)
6. [Interface Images/GIFs](#interface-imagesgifs)

## Getting Started

1. Clone this repo: `git clone https://github.com/CShum28/Habit-Forge`.
2. This app uses MongoDB - please refer to [MongoDB Setup](###MongoDB-Setup).
3. Open the server directory `cd server`.
4. Ensure that you are using node version 12 or later: `node -v`.
5. Install the dependencies: `npm i`.
6. Copy the .env file `.env.example` and update ACCESS_TOKEN_SECRET.
7. Run the server: `npm run dev`, default should be port 3001.
8. In a separate terminal, open the react app folder: `cd client`.
9. Install the dependencies: `npm i`.
10. Start the React app: `npm run start`.
11. Copy the .env file `.env.example` and update VITE_BASE_URL.
12. The app should launch automatically in your default browser.

### MongoDB Setup

1. You will require MongoDB to use this application; please ensure that it is installed. If not, you can download MongoDB [here](https://www.mongodb.com/).

## Features

1. Sign Up & Login
   1. New users can sign up
      1. Existing users can login
2. My Habits Page
   1. Create Categories
      1. Create Habits within Categories
      1. Check Habits off as complete
      1. Can edit / delete existing Habits
   2. Can edit / delete existing Categories
   3. Submit Results at End Of Week
   4. Update End of Week Results
3. Weekly Review Page
   1. Displays List of Weekly Results
   1. Shows results by Date and Accomplishments
   1. Reveal Days where all habits are completed
4. About Page
   1. Information about Habit Forge

## Environment

- Node V12.22.xx or higher

## Dependencies

### Application

- Tailwind v2.2.0
- Axios: v1.6.3
- Bootstrap v5.3.2
- JWT-decode v4.0.0
- Lucide-react v0.303.0
- classNames: v2.3.2
- Date-fns: v2.30.0
- React: v18.2.0
- React-router-dom v6.21.1
- Reduxjs/toolkit v2.0.1

### Server

- Bcrypt: v5.1.1
- Body parser: v1.20.2
- Cookie-parser: v1.4.6
- CORS: v2.8.5
- Dotev: v16.3.1
- Express: v4.18.2
- Jsonwebtoken v9.0.2
- Morgan: v1.10.0
- Mongoose v8.0.3

## Images

### Login

!["Login"](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/login.png)

### Sign Up

!["Sign Up"](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/sign-up.png)

### Home Page

!['Home Page'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/home-page.png)

### Habits Page

!['Habits Page'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/habits-page.png)

### Toggle Date

!['Toggle Date'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/toggle-date.png)

### Add New Category

!['Add New Category'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/add-category.png)

### Add New Habit

!['Add New Habit'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/add-habit.png)

### Confirm Delete

!['Add New Habit'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/confirm-delete.png)

### About Page

!['About Page'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/about-page.png)

### Weekly Results Page

!['Weekly Results Page'](https://github.com/CShum28/Habit-Forge/blob/main/client/public/images/weekly-results.png)
