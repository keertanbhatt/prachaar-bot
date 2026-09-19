# BOCW Scheme Assistant — Frontend (Vercel)

WhatsApp-style **standalone demo**. All scheme data and chat logic run **in the browser** — no API required.

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Framework preset: **Vite** (auto-detected).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Deploy.

No environment variables required for the static demo.

## Local dev

```bash
cd frontend
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Content updates

Edit scheme copy and menus in:

- `src/data/static-schemes.ts`

Add PDF links:

- `documents.applicationFormUrl`
- `documents.attachmentsUrl`
- `documents.faqUrl`

Or put files in `public/documents/` and use paths like `/documents/scheme_01/form.pdf`.

## Later: connect backend

When the Node backend is live, you can optionally add `VITE_API_URL` and switch the app to call `/api/demo/*` — the production WhatsApp bot uses Meta webhooks on the backend, not this UI.
