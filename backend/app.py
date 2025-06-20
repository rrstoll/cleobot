from flask import Flask, request, jsonify
from langchain.chat_models import ChatOpenAI
from langchain.schema import SystemMessage, HumanMessage
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.7)

@app.route("/api/chat", methods=["POST", "OPTIONS"])
def chat():
    if request.method == "OPTIONS":
        return '', 204  # Preflight success
    
    data = request.get_json()
    character = data["character"]
    message = data["message"]

    system_prompt = f"You are {character}. Reply in their voice, tone, and knowledge."
    response = llm([SystemMessage(content=system_prompt), HumanMessage(content=message)])

    return jsonify({"response": response.content})
