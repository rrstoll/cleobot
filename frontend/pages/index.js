import { useState } from "react";
import { useEffect, useRef } from 'react';

const CHARACTER_OPTIONS = ["Siddhartha Gautama (The Buddha)", "Julius Caesar", "Cleopatra VII", "Genghis Khan", "Leonardo da Vinci", "Napoleon", "Sojourner Truth", "Sitting Bull", "Albert Einstein", "Frida Kahlo"];

const handleSend = () => {
  if (input.trim() !== "") {
    console.log("Sending:", input);
    setInput(""); // optionally clear input
  }
};

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
};

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
        <img src="/everchat_personas.png" alt="Cleopatra, Genghis Khan and Napoleon" className="max-w-sm mx-auto -mb-1" />
      </div>
      <div className="border-4 bg-colorPapyrus border-white md:min-w-[600px] lg:min-w-[768px] max-w-3xl w-full shadow-2xl mx-2 p-8 backdrop-blur">
        <div className="bg-colorPapyrus mb-2">
          <h1 className="text-4xl text-center tracking-widest font-bold text-white mb-4">History<span className="font-normal">Speaks</span></h1>
          <h2 className="text-center italic text-white mb-4">Converse with minds that shaped the world.</h2>
        </div>
        <div className="relative w-full mb-4">
        <select
          className="appearance-none w-full border border-gray-300 bg-colorLightTan p-2 pr-14 text-black"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        >
          {CHARACTER_OPTIONS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
          <svg
            className="w-7 h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 7l3 3 3-3" />
          </svg>
        </div>
      </div>

        <div className="border-gray-300 bg-colorLightTan p-4 text-black h-48 overflow-y-auto mb-4">
          {chatLog.map((entry, idx) => (
            <div key={idx} className="mb-2">
              <b>You:</b> {entry.user}<br />
              <b>{entry.character}:</b> {entry.bot}
            </div>
          ))}
        </div>

        <input
          className="w-full border bg-colorLightTan border-gray-300 p-2 mb-4 text-black"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // prevent form submit if inside <form>
              sendMessage();
            }
          }}
          placeholder="Ask a question..."
        />

        <div className="flex justify-center">
          <button
            className="bg-blue-700 text-white uppercase font-bold px-10 py-3 rounded-sm hover:bg-yellow-800 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
