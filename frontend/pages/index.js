import { useState } from "react";

const CHARACTER_OPTIONS = ["Sherlock Holmes", "Cleopatra", "Yoda", "Einstein"];

export default function Home() {
  const [character, setCharacter] = useState("Sherlock Holmes");
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const res = await fetch("https://your-backend.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character, message: input }),
    });

    const data = await res.json();
    setChatLog([...chatLog, { user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Character Chatbot</h1>
      <select
        className="p-2 border mb-4"
        value={character}
        onChange={(e) => setCharacter(e.target.value)}
      >
        {CHARACTER_OPTIONS.map((name) => (
          <option key={name}>{name}</option>
        ))}
      </select>

      <div className="bg-white border p-4 h-64 overflow-y-auto mb-4">
        {chatLog.map((entry, idx) => (
          <div key={idx} className="mb-2">
            <b>You:</b> {entry.user}<br />
            <b>{character}:</b> {entry.bot}
          </div>
        ))}
      </div>

      <input
        className="w-full border p-2 mb-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}
