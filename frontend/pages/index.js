import { useState } from "react";

const CHARACTER_OPTIONS = ["Sherlock Holmes", "Cleopatra", "Yoda", "Einstein"];

export default function Home() {
  const [character, setCharacter] = useState("Sherlock Holmes");
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
    setChatLog([...chatLog, { character,user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl text-center font-bold text-yellow-800 mb-4">Cleobot</h1>
      <select
        className="p-2 border mb-4"
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
      <button
        className="w-full bg-yellow-700 text-white font-bold py-2 rounded-md hover:bg-yellow-800 transition"
        onClick={sendMessage}
      >
        Send
      </button>

      <div className="mt-6 text-center text-xs text-yellow-600 italic">May the Nile bless your submission.</div>
    </div>
  );
}
