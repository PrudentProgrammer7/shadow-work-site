"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Prompts() {
  const prompts = [
    "What is a negative belief you hold about yourself? Where did it come from?",
    "Recall a moment where you felt abandoned. How does that experience affect you today?",
    "What patterns keep repeating in your life? Do they come from childhood experiences?",
    "What is something you struggle to accept about yourself? Why?",
    "How do you react when someone criticizes you? What does that say about your insecurities?"
  ];

  const [index, setIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [input, setInput] = useState("");

  // Load saved responses from local storage on mount
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem("shadowResponses")) || {};
    setResponses(savedResponses);
    setInput(savedResponses[index] || "");
  }, [index]);

  // Handle input change
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Save response to state & local storage
  const saveResponse = () => {
    const updatedResponses = { ...responses, [index]: input };
    setResponses(updatedResponses);
    localStorage.setItem("shadowResponses", JSON.stringify(updatedResponses));
  };

  // Move to next prompt
  const nextPrompt = () => {
    saveResponse();
    setIndex((prev) => (prev + 1) % prompts.length);
    setInput(responses[(index + 1) % prompts.length] || ""); // Load next response if available
  };

  // Move to previous prompt
  const prevPrompt = () => {
    saveResponse();
    setIndex((prev) => (prev - 1 + prompts.length) % prompts.length);
    setInput(responses[(index - 1 + prompts.length) % prompts.length] || "");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold">Shadow Work Prompts</h1>
      <p className="mt-4 text-lg text-gray-300 text-center max-w-2xl">{prompts[index]}</p>

      <textarea
        className="mt-4 w-full max-w-2xl p-3 text-black rounded-lg"
        placeholder="Write your response here..."
        value={input}
        onChange={handleChange}
      />

      <div className="mt-4 flex gap-4">
      import Link from "next/link"; // Import at the top

<Link href="/review">
  <button className="mt-4 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg">
    Review Responses
  </button>
</Link>

        <button 
          onClick={prevPrompt} 
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg"
        >
          Previous
        </button>

        <button 
          onClick={nextPrompt} 
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}
