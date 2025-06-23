import { useState } from "react";
import { useEffect, useRef } from 'react';

const CHARACTER_OPTIONS = ["Cleopatra", "Julius Caesar", "Genghis Khan", "Napoleon", "Albert Einstein"];

function MyComponent({ messages }) {
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]); // scrolls to bottom when messages change

  return (
    <div
      ref={scrollRef}
      className="overflow-y-auto max-h-96 p-4"
    >
      {messages.map((msg, idx) => (
        <p key={idx}>{msg}</p>
      ))}
    </div>
  );
}

export default function Home() {
  const [character, setCharacter] = useState("Cleopatra");
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch("https://cleobot.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character, message: input }),
    });

    const data = await res.json();
    setChatLog([...chatLog, { character, user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <>
      <div>
        <img src="../everchat_personas.png" alt="Cleopatra, Genghis Khan and Napoleon" className="max-w-md" />
      </div>
      <div className="border-4 border-yellow-700 max-w-md w-full rounded-xl shadow-2xl p-8 backdrop-blur">
        <h1 className="text-3xl text-center font-bold text-gray-900 mb-4">Everbot</h1>
        <h3 className="text-center text-gray-900 mb-4">Converse with minds that shaped the world.</h3>
        <select
          className="w-full border border-yellow-500 rounded-md p-2 mb-4 bg-yellow-50 text-yellow-900"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        >
          {CHARACTER_OPTIONS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>

        <div className="border-yellow-500 rounded-md p-4 bg-yellow-50 text-yellow-900 h-64 overflow-y-auto mb-4">
          {chatLog.map((entry, idx) => (
            <div key={idx} className="mb-2">
              <b>You:</b> {entry.user}<br />
              <b>{entry.character}:</b> {entry.bot}
            </div>
          ))}
        </div>

        <input
          className="w-full border border-yellow-500 rounded-md p-2 mb-2 bg-yellow-50 text-yellow-900"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
        />

        <div className="flex justify-center">
          <button
            className="bg-yellow-700 text-white font-bold px-6 py-2 rounded-md hover:bg-yellow-800 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
