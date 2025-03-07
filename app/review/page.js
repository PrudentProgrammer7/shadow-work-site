"use client";
import { useState, useEffect } from "react";

export default function ReviewResponses() {
  const [responses, setResponses] = useState({});
  const [editedResponses, setEditedResponses] = useState({});
  
  useEffect(() => {
    const savedResponses = JSON.parse(localStorage.getItem("shadowResponses")) || {};
    setResponses(savedResponses);
    setEditedResponses(savedResponses);
  }, []);

  const handleEdit = (index, newText) => {
    setEditedResponses({ ...editedResponses, [index]: newText });
  };

  const saveChanges = () => {
    setResponses(editedResponses);
    localStorage.setItem("shadowResponses", JSON.stringify(editedResponses));
  };

  const clearResponse = (index) => {
    const updatedResponses = { ...editedResponses };
    delete updatedResponses[index];
    setEditedResponses(updatedResponses);
    localStorage.setItem("shadowResponses", JSON.stringify(updatedResponses));
  };

  const clearAllResponses = () => {
    setResponses({});
    setEditedResponses({});
    localStorage.removeItem("shadowResponses");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">Review Your Responses</h1>

      {Object.keys(responses).length > 0 ? (
        Object.keys(responses).map((index) => (
          <div key={index} className="mb-6 p-4 w-full max-w-2xl bg-gray-800 rounded-lg">
            <p className="text-lg font-semibold">
              Prompt {parseInt(index) + 1}:
            </p>
            <textarea
              className="w-full mt-2 p-2 text-black rounded-lg"
              value={editedResponses[index] || ""}
              onChange={(e) => handleEdit(index, e.target.value)}
            />
            <div className="mt-2 flex justify-end gap-2">
              <button 
                onClick={() => clearResponse(index)} 
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 mt-4">No responses saved yet.</p>
      )}

      {Object.keys(responses).length > 0 && (
        <div className="mt-6 flex gap-4">
          <button 
            onClick={saveChanges} 
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
          >
            Save Changes
          </button>

          <button 
            onClick={clearAllResponses} 
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
