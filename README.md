# Cleobot

This is a full-stack AI chatbot app where users can chat with fictional or historical characters. The app uses:

- **Frontend:** Next.js + Tailwind CSS (deployed on [Vercel](https://vercel.com))
- **Backend:** Flask + LangChain (deployed on [Render](https://render.com))

---

## ✨ Features

- Select from characters like Sherlock Holmes, Cleopatra, Yoda, or Einstein
- Chat interface styled with Tailwind
- Backend uses OpenAI (via LangChain) to simulate responses in-character

---

## 📁 Project Structure

```
cleobot/
├── frontend/       # React + Tailwind frontend (Next.js)
└── backend/        # Flask backend with LangChain + OpenAI
```

---

## 🚀 Getting Started

### 🔹 Frontend (Next.js on Vercel)

1. Go into the frontend directory:
    ```bash
    cd frontend
    npm install
    npm run dev  # for local development
    ```

2. Deploy:
   - Push to GitHub
   - Import repo into Vercel
   - Set `https://your-backend.onrender.com/api/chat` in `fetch()` URL

---

### 🔹 Backend (Flask on Render)

1. Go into the backend directory:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```

2. Set environment variable:
    ```
    OPENAI_API_KEY=your-openai-key
    ```

3. Run locally:
    ```bash
    gunicorn app:app
    ```

4. Deploy to [Render](https://render.com):
   - Web service
   - Start command: `gunicorn app:app`
   - Add `OPENAI_API_KEY` to environment variables

---

## 🌐 Custom Domains

### Frontend on Vercel
Use `chat.yourdomain.com` with a CNAME pointing to `cname.vercel-dns.com`.

### Backend on Render
Use `api.yourdomain.com` with a CNAME to your Render service URL.

---

## 🧩 Notes

- Make sure to enable CORS on your backend
- Tailwind styles are compiled during build
- Static exports (e.g., for DreamHost) are also possible via `next export`

---

## 📜 License

MIT License
