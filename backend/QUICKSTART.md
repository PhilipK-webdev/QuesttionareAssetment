# Quick Start Guide

## 🚀 Start the Backend in 3 Steps

### Step 1: Setup Environment

```bash
cd backend
chmod +x setup.sh
./setup.sh
```

Or manually:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Configure OpenAI (Optional)

Create a `.env` file:

```bash
OPENAI_API_KEY=sk-your-api-key-here
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
```

**Note:** The app works without OpenAI - it will use a fallback analysis system.

### Step 3: Run the Server

```bash
python app.py
```

Server will start at: `http://localhost:5000`

## ✅ Test It Works

```bash
# In a new terminal
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-14T..."
}
```

## 📊 API Flow Example

```bash
# 1. Register a user
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "gender": "Male",
    "age_group": "26-35"
  }'

# Save the session_id from response

# 2. Get shuffled questions
curl "http://localhost:5000/api/questionnaire?session_id=YOUR_SESSION_ID"

# 3. Submit answers (all 40 questions)
curl -X POST http://localhost:5000/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "session_id": "YOUR_SESSION_ID",
    "answers": {
      "RS1": 4, "RS2": 2, "RS3": 4, ...
    }
  }'
```

## 🎯 What's Included

✅ **Complete Flask API** with 7 endpoints  
✅ **40 questions** across 4 domains (Reaction Speed, Vehicle Control, Spatial Awareness, Road Behavior)  
✅ **Dynamic shuffling** - different order each time  
✅ **Reverse scoring** - 20 questions are reverse-scored  
✅ **Score calculation** - Averages per domain with categorization (Low/Medium/High)  
✅ **LLM integration** - OpenAI GPT-4 for driving style analysis (with fallback)  
✅ **File storage** - Results saved to JSON files  
✅ **Statistics tracking** - Completion rates, average scores, driver style distribution  
✅ **Session management** - Save and resume progress  

## 📁 Data Files

- **Questionnaire**: `data/questionnaire.json` (your 40 questions)
- **Results**: `data/results/*.json` (one file per completion)
- **Statistics**: `data/statistics.json` (aggregated metrics)

## 🔧 Troubleshooting

**Import errors when running?**
```bash
source venv/bin/activate
pip install -r requirements.txt
```

**Port already in use?**
```bash
# Change PORT in .env
PORT=5001
```

**OpenAI errors?**
- App continues with fallback analysis
- Check API key in `.env`
- Ensure you have credits in OpenAI account

## Next Steps

Ready to build the frontend? The backend is fully functional and ready to handle requests!
