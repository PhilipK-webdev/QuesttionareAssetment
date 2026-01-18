# Questionnaire Application

A driving assessment questionnaire application with React frontend and Flask backend.

## Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Setup virtual environment and install dependencies:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```
   
   Or manually:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment (optional):**
   
   Create a `.env` file in the `backend` directory:
   ```bash
   OPENAI_API_KEY=your-api-key-here
   FLASK_ENV=development
   FLASK_DEBUG=True
   PORT=5000
   ```
   
   **Note:** The app works without OpenAI - it will use a fallback analysis system.

4. **Run the backend:**
   ```bash
   python app.py
   ```
   
   Backend will start at: `http://localhost:5000`

### Client Setup

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   Client will start at: `http://localhost:5173` (or the port shown in terminal)

## Running Both Services

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python app.py
```

**Terminal 2 - Client:**
```bash
cd client
npm run dev
```

## Verify It Works

1. Backend health check:
   ```bash
   curl http://localhost:5000/api/health
   ```

2. Open your browser and navigate to the client URL (usually `http://localhost:5173`)

## Project Structure

```
.
├── backend/          # Flask API server
│   ├── app.py       # Main application
│   ├── routes/      # API endpoints
│   └── services/    # Business logic
└── client/          # React frontend
    ├── src/         # Source code
    └── package.json # Dependencies
```

## Additional Resources

- Backend details: See `backend/README.md`
- Backend quick start: See `backend/QUICKSTART.md`
- Client details: See `client/README.md`
