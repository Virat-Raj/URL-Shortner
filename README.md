# URL Shortner

A small URL shortening service with a React frontend and an Express + MongoDB backend.

## Features
- Shorten any URL via the frontend form or the API.
- Redirects short links to the original URL.
- Normalizes missing protocol (adds `https://` when user omits it).

## Repository Layout

- Backend/: Express server, MongoDB models and API routes
- Frontend/: Vite + React UI

Key files:
- [Frontend/src/App.jsx](Frontend/src/App.jsx) — main React UI and short-link display
- [Frontend/Components/Copy-Button.jsx](Frontend/Components/Copy-Button.jsx) — copies the final short URL to clipboard
- [Backend/controlers/url.controlers.js](Backend/controlers/url.controlers.js) — creates short IDs and normalizes original URLs
- [Backend/routes/user.ruters.js](Backend/routes/user.ruters.js) — redirect route and POST endpoint

## Requirements

- Node.js 18+ (or compatible)
- MongoDB (URI for a running instance)

## Environment

Create a `.env` file inside `Backend/` with:

```
MONGODB_URI=your_mongo_connection_string
PORT=3000
```

## Install & Run

Backend

```bash
cd Backend
npm install
npm run start
```

Frontend

```bash
cd Frontend
npm install
npm run dev
```

Notes:
- The frontend `vite.config.js` proxies `/api` to the backend (`http://localhost:3000`) in development, so the UI can call `/api/` directly.

## API

- `POST /api/` — create a short URL
  - Request JSON: `{ "url": "https://example.com" }`
  - Response JSON: `{ "id": "<shortId>" }`

- `GET /api/:shortId` — redirects (302) to the stored original URL

Example using curl:

```bash
curl -X POST http://localhost:3000/api/ -H "Content-Type: application/json" -d '{"url":"example.com"}'
# returns {"id":"abc123"}
```

Then visit `http://localhost:3000/api/abc123` (or use the frontend link) to be redirected to `https://example.com`.

## Troubleshooting

- If redirects return 404, confirm the backend is running and that the short ID stored matches the requested path.
- Check that `MONGODB_URI` is correct and MongoDB is reachable.
- If clicking links in the frontend doesn’t redirect, ensure `vite` proxy is configured (see `Frontend/vite.config.js`) or open the backend URL directly.

## Next improvements

- Add analytics for click counts and created timestamps.
- Validate and sanitize user-provided URLs more strictly.
- Add unit/integration tests and a production-ready deployment script.

## License

MIT
