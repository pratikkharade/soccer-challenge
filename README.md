# Soccer Challenge - CRUD App ⚽

A full-stack web application built using **React**, **FastAPI**, and **MongoDB** to manage soccer player data. Implements full CRUD operations (Create, Read, Update, Delete) with search functionality and inline editing.

## Tech Stack
- **Frontend:** React + Axios
- **Backend:** FastAPI (Python)
- **Database:** MongoDB Atlas
- **MongoDB Driver:** Motor (async)

## Features
- Display all players in a table or cards
- Search players by any attribute (text or number)
- Add new player entries
- Edit existing players with inline or modal editing
- Delete single or multiple players
- Bulk delete and state management without refetching

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js and npm
- MongoDB Atlas account

### Backend Setup (FastAPI)
```bash
cd src/fast-apis
pip install fastapi uvicorn motor
uvicorn read:app --reload
```

### Frontend Setup (React)
```bash
// Navigate to the root level:
cd ..

// Install dependencies:
npm install

// Start the React app:
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/items` | Fetch all players |
| POST   | `/items` | Add a new player |
| PUT    | `/items/{id}` | Update a player |
| DELETE | `/items/{id}` | Delete a player |
| DELETE | `/items` | Delete multiple players |
| GET    | `/items/search?field=Name&query=Ronaldo` | Search players by attribute |
