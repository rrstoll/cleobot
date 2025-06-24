import { useState } from "react";
import { useEffect, useRef } from 'react';

const CHARACTER_OPTIONS = ["Siddhartha Gautama (The Buddha)", "Julius Caesar", "Cleopatra VII", "Genghis Khan", "Leonardo da Vinci", "Napoleon", "Sojourner Truth", "Sitting Bull", "Albert Einstein", "Frida Kahlo"];

export default function Home() {
  const [character, setCharacter] = useState(CHARACTER_OPTIONS[0]);
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

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
      <div className="border-4 bg-colorDkGreen border-white md:min-w-[600px] lg:min-w-[768px] max-w-3xl w-full shadow-2xl mx-2 p-8 backdrop-blur">
        <div className="mb-2">
          <h1 className="text-4xl text-center tracking-widest font-playfair text-white mb-4">History<span className="font-normal">Speaks</span></h1>
          <h2 className="text-center italic text-colorDkGreen mb-4">Converse with minds that shaped the world.</h2>
        </div>
        <div className="relative w-full mb-4">
        <select
          className="peer appearance-none w-full border border-gray-300 bg-colorTan p-2 pr-14 text-black transition duration-200 ease-in-out focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        >
          {CHARACTER_OPTIONS.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-colorDkGreen">
          <svg
            className="peer-focus:rotate-180 w-7 h-7"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M7 7l3 3 3-3" />
          </svg>
        </div>
      </div>

        <div ref={scrollRef} className="border-gray-300 bg-colorTan p-4 text-colorBlack h-48 overflow-y-auto mb-4">
          {chatLog.map((entry, idx) => (
            <div key={idx} className="mb-2">
              <b>You:</b> {entry.user}<br />
              <b>{entry.character}:</b> {entry.bot}
            </div>
          ))}
        </div>

        <input
          className="w-full border bg-colorTan border-gray-300 p-2 mb-4 text-black"
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
            className="bg-colorLtGreen text-colorDkGreen uppercase font-bold px-10 py-3 rounded-sm hover:bg-yellow-800 transition"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
