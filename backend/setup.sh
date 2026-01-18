#!/bin/bash

echo "🚀 Setting up Questionnaire Backend..."

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "✅ Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
OPENAI_API_KEY=your-openai-api-key-here
FLASK_ENV=development
FLASK_DEBUG=True
PORT=5000
EOF
    echo "⚠️  Please update .env with your OpenAI API key"
fi

# Ensure data directories exist
echo "📁 Creating data directories..."
mkdir -p data/results

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your OpenAI API key"
echo "2. Activate virtual environment: source venv/bin/activate"
echo "3. Run the server: python app.py"
echo ""
