# School API

A full-stack school staff management application built with Django REST Framework, React, PostgreSQL, and Redis. The application gives school staff a centralized interface for managing student information while also providing access to subject information and external book resources.

The application demonstrates full-stack development concepts including REST API design, authentication, relational data, server-side third-party API integration, caching, throttling, and a React frontend.

![School API Demo](./demo.gif)

## Features

- User registration, login, logout, and authentication
- Protected routes for authenticated users
- Student management and detailed student views
- Subject listings and subject details
- Student search functionality
- Google Books integration
- Book search and detailed book information
- Server-side third-party API requests
- Redis caching for external API responses
- API throttling for authenticated and anonymous users
- Responsive React interface
- Dockerized development environment

## Tech Stack

### Backend

- **Python**
- **Django**
- **Django REST Framework**
- **PostgreSQL**
- **Redis**
- **Requests**
- **Token Authentication**

### Frontend

- **React**
- **React Router**
- **Axios**
- **Tailwind CSS**
- **Vite**

### Infrastructure & Tooling

- **Docker**
- **Docker Compose**
- **Nginx**
- **Gunicorn**
- **Git / GitHub**

## Architecture

The application separates the React frontend from the Django REST API.

```text
React
  │
  │ Axios
  ▼
Django REST API
  │
  ├── PostgreSQL
  │     └── Students / Subjects / Users
  │
  └── Books API endpoint
          │
          ├── Redis Cache
          │
          └── Google Books API
```

Instead of exposing the Google Books API directly to the frontend, requests are handled by Django on the server.

This keeps external API logic centralized and allows the backend to apply caching, throttling, error handling, and API-key management before returning data to React.

## Google Books Integration

The books feature uses Django as a server-side proxy for the Google Books API.

The backend:

1. Receives the book request from React.
2. Checks Redis for a cached response.
3. Returns cached data when available.
4. Requests fresh data from Google Books when the cache is empty.
5. Normalizes the external API response.
6. Stores the result in Redis.
7. Returns the processed data to the frontend.

Example response:

```json
{
  "query": "django",
  "count": 10,
  "books": [
    {
      "google_id": "example-id",
      "title": "Example Book",
      "authors": ["Example Author"],
      "thumbnail": "https://...",
      "description": "Book description...",
      "preview_link": "https://..."
    }
  ]
}
```

## Caching

Google Books responses are cached with **Redis** to reduce unnecessary requests to the external API.

```python
cache_key = f"books:{query.lower().strip()}"

cached_books = cache.get(cache_key)

if cached_books is not None:
    return Response(cached_books)
```

Cached responses are stored for 24 hours:

```python
CACHE_TTL = 60 * 5
```

This improves response times for repeated searches while reducing calls to the third-party service.

## API Throttling

The Books API endpoint uses separate rate limits for authenticated and anonymous users.

```python
class BookUserRateThrottle(UserRateThrottle):
    rate = "20/min"


class BookAnonRateThrottle(AnonRateThrottle):
    rate = "10/min"
```

This provides basic protection for the server-side external API integration and prevents excessive requests.

## Authentication

Authentication is handled through Django REST Framework.

The frontend stores the authentication token locally and an Axios interceptor automatically attaches it to authenticated requests:

```javascript
account.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }

  return config;
});
```

Protected frontend routes verify that a user is authenticated before allowing access to application content.

## Local Development

### Clone the repository

```bash
git clone https://github.com/gadm12/school-API.git
cd school-API
```

### Environment Variables

Create the required `.env` file and provide your own credentials.

For example:

```env
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

Secrets and local environment files are excluded from Git through `.gitignore` and `.dockerignore`.

### Start with Docker

```bash
docker compose up --build
```

The Docker environment runs the application services required for local development, including Django, React, PostgreSQL, and Redis.

## What I Practiced

This project gave me hands-on experience with:

- Designing RESTful APIs with Django REST Framework
- Connecting React to a Django backend with Axios
- Modeling relational data with PostgreSQL
- Implementing authentication and protected routes
- Managing authentication tokens with Axios interceptors
- Integrating third-party APIs through the backend
- Protecting API credentials from the frontend
- Caching external API responses with Redis
- Implementing API throttling
- Handling external service failures gracefully
- Running a multi-service application with Docker Compose

## Status

The core application is complete and runs locally through Docker Compose.

Deployment was outside the final scope of this project.

---

Built by **Mohamed Gad**
