# React Movie Website

A modern movie discovery application built with React and TypeScript. Browse movies, search for your favorites, and maintain your personal watchlist.

## Project Structure
```
src/
  ├── components/
  │   ├── GenreFilter.tsx
  │   ├── MovieCard.tsx
  │   ├── Navbar.tsx
  │   ├── Pagination.tsx
  │   └── SearchBar.tsx
  ├── pages/
  │   ├── Home.tsx
  │   └── WatchList.tsx
  ├── types/
  ├── App.css
  ├── App.tsx
  ├── index.css
  └── index.tsx
```

## Features
* Movie browsing and search
* Genre filtering
* Watchlist functionality
* Responsive navigation
* Pagination
* Dark/Light mode toggle

## Tech Stack
* React
* TypeScript
* React Router DOM
* TMDB API

## Getting Started

### Prerequisites
* Node.js
* npm
* TMDB API key

### Installation
1. Clone the repository
```bash
git clone [repository-url]
cd movie-website
```

2. Install dependencies
```bash
npm install
```

3. Create `.env` file and add your TMDB API key
```env
REACT_APP_TMDB_API_KEY=your_api_key
```

4. Start the development server
```bash
npm start
```

## Build
To create a production build:
```bash
npm run build
```

## Deployment
The project is configured for deployment with Vercel. The build folder is ready to be deployed.

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request