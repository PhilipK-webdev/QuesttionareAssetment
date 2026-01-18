# Questionnaire Backend

Flask backend API for the driving assessment questionnaire application.

## Features

- RESTful API endpoints for questionnaire management
- Dynamic question shuffling
- Score calculation with reverse-scoring support
- OpenAI LLM integration for driving style analysis
- File-based storage for results and statistics
- Session management for "Save for Later" functionality

## Project Structure

```
backend/
├── app.py                      # Main Flask application
├── config.py                   # Configuration settings
├── requirements.txt            # Python dependencies
├── data/
│   ├── questionnaire.json     # 40 questions across 4 domains
│   ├── results/               # Stored user results
│   └── statistics.json        # Aggregated statistics
├── services/
│   ├── scoring_service.py     # Score calculation logic
│   └── llm_service.py         # OpenAI integration
└── utils/
    └── storage.py             # File storage utilities
```

## Setup Instructions

### 1. Create Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create a `.env` file in the backend directory:

```bash
OPENAI_API_KEY=your-openai-api-key-here
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
```

**Note:** The application will work without an OpenAI API key by using a fallback rule-based analysis system.

### 4. Run the Application

```bash
python app.py
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
```
GET /api/health
```

### Register User
```
POST /api/register
Body: {
  "full_name": "John Doe",
  "email": "john@example.com",
  "gender": "Male",
  "age_group": "26-35"
}
Response: { "session_id": "uuid", "message": "Registration successful" }
```

### Get Questionnaire
```
GET /api/questionnaire?session_id=uuid
Response: {
  "questions": [...],
  "answers": [...],
  "total_questions": 40
}
```

### Save Progress
```
POST /api/save-progress
Body: {
  "session_id": "uuid",
  "answers": {"RS1": 3, "VC2": 2, ...},
  "current_question_index": 15
}
```

### Load Progress
```
GET /api/load-progress/<session_id>
Response: {
  "user": {...},
  "answers": {...},
  "current_question_index": 15
}
```

### Submit Questionnaire
```
POST /api/submit
Body: {
  "session_id": "uuid",
  "answers": {"RS1": 3, "VC2": 2, ...}
}
Response: {
  "user": {...},
  "scores": {...},
  "llm_analysis": {
    "driving_style": "...",
    "recommended_course": "..."
  }
}
```

### Get Statistics (Optional)
```
GET /api/statistics
```

## Scoring System

### Domains
- **Reaction Speed**: 10 questions (5 reverse-scored)
- **Vehicle Control**: 10 questions (5 reverse-scored)
- **Spatial Awareness**: 10 questions (5 reverse-scored)
- **Road Behavior**: 10 questions (5 reverse-scored)

### Categories (from Appendix A)
- **Low**: 1.0 - 2.0
- **Medium**: 2.1 - 3.2
- **High**: 3.3 - 4.0

### Reverse Scoring
Questions marked with `"reverse": true` are scored as: `5 - answer_value`

## Data Storage

- **Results**: Saved to `data/results/` as JSON files (one per completion)
- **Statistics**: Updated in `data/statistics.json` with aggregated metrics
- **Sessions**: Stored in-memory (consider Redis for production)

## Development

### Testing the API

Use curl or Postman to test endpoints:

```bash
# Health check
curl http://localhost:5000/api/health

# Register
curl -X POST http://localhost:5000/api/register \
  -H "Content-Type: application/json" \
  -d '{"full_name":"Test User","email":"test@example.com","gender":"Male","age_group":"26-35"}'

# Get questions
curl http://localhost:5000/api/questionnaire?session_id=your-session-id
```

## Production Considerations

1. **Session Storage**: Replace in-memory storage with Redis or database
2. **API Key Security**: Use proper secret management (AWS Secrets Manager, etc.)
3. **Rate Limiting**: Add rate limiting to prevent abuse
4. **Authentication**: Add user authentication if needed
5. **HTTPS**: Deploy with SSL/TLS
6. **Database**: Consider PostgreSQL/MongoDB for scalability

## Troubleshooting

### OpenAI API Errors
If you see LLM errors, the system will automatically use fallback analysis. To fix:
- Ensure `OPENAI_API_KEY` is set correctly in `.env`
- Check API key has sufficient credits
- Verify network connectivity

### CORS Errors
CORS is enabled for all origins. In production, configure specific origins:
```python
CORS(app, origins=['https://yourdomain.com'])
```

## License

MIT
