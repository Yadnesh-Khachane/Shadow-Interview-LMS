import React, { useState } from "react";

function Notes() {
  const [textNotes, setTextNotes] = useState("");
  const [file, setFile] = useState(null);
  const [notesList, setNotesList] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editText, setEditText] = useState("");
  const [refiningNoteId, setRefiningNoteId] = useState(null);

  const handleTextChange = (e) => setTextNotes(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAddNote = () => {
    if (!textNotes && !file) {
      alert("Please add text or select a file!");
      return;
    }

    const newNote = {
      id: Date.now(),
      text: textNotes,
      file: file ? file.name : null,
    };

    setNotesList([newNote, ...notesList]); // latest note on top
    setTextNotes("");
    setFile(null);
  };

  const handleDelete = (id) => {
    const filteredNotes = notesList.filter((note) => note.id !== id);
    setNotesList(filteredNotes);
  };

  const handleEdit = (note) => {
    setEditingNoteId(note.id);
    setEditText(note.text);
  };

  const handleSaveEdit = (id) => {
    const updatedNotes = notesList.map((note) =>
      note.id === id ? { ...note, text: editText } : note
    );
    setNotesList(updatedNotes);
    setEditingNoteId(null);
    setEditText("");
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditText("");
  };

  const handleRefineNote = async (note) => {
    if (!note.text) {
      alert("No text content to refine!");
      return;
    }

    setRefiningNoteId(note.id);

    try {
      // Replace with your actual Gemini API key
      const API_KEY = "AIzaSyDZ5TvBhocW6bLdaJn-hJhumo9rOA0W0vQ"; // Get from https://aistudio.google.com/app/apikey
      
      // Updated Gemini API endpoint with correct model name
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful assistant that refines and improves notes. Make them more clear, organized, structured, and easy to understand while keeping the original meaning intact. Format the response in a clean, readable way with proper paragraphs and bullet points where appropriate.

Please refine this note:

"${note.text}"`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
            topP: 0.8,
            topK: 40
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      // Check if response has the expected structure
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts || !data.candidates[0].content.parts[0]) {
        throw new Error("Invalid response format from Gemini API");
      }
      
      const refinedText = data.candidates[0].content.parts[0].text;
      
      const updatedNotes = notesList.map((n) =>
        n.id === note.id ? { ...n, text: refinedText } : n
      );
      setNotesList(updatedNotes);
      
    } catch (error) {
      console.error("Error refining note:", error);
      alert(`Failed to refine note: ${error.message}. Please check your API key and try again.`);
    } finally {
      setRefiningNoteId(null);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>My Notes</h2>

      {/* Input Section */}
      <div
        style={{
          background: "#ecf0f1",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          marginBottom: "20px",
        }}
      >
        <textarea
          value={textNotes}
          onChange={handleTextChange}
          placeholder="Write your notes here..."
          rows={4}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #bdc3c7",
            resize: "none",
            fontSize: "14px",
          }}
        />

        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginTop: "10px" }}
        />
        {file && <p style={{ marginTop: "5px", fontSize: "14px" }}>📎 Selected File: {file.name}</p>}

        <button
          onClick={handleAddNote}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#3498db",
            color: "white",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          Add Note
        </button>
      </div>

      {/* Notes Display */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {notesList.length === 0 && <p style={{ textAlign: "center", color: "#7f8c8d" }}>No notes yet.</p>}

        {notesList.map((note) => (
          <div
            key={note.id}
            style={{
              background: "#fff",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {editingNoteId === note.id ? (
              <div>
                <textarea
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #bdc3c7",
                    resize: "none",
                    fontSize: "14px",
                  }}
                />
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    onClick={() => handleSaveEdit(note.id)}
                    style={{
                      padding: "5px 15px",
                      fontSize: "12px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#27ae60",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    style={{
                      padding: "5px 15px",
                      fontSize: "12px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#95a5a6",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                {note.text && (
                  <div style={{ margin: 0 }}>
                    <p style={{ 
                      margin: 0, 
                      whiteSpace: "pre-wrap",
                      lineHeight: "1.5",
                      fontSize: "14px"
                    }}>
                      {note.text}
                    </p>
                    {refiningNoteId === note.id && (
                      <p style={{ 
                        margin: "10px 0 0 0", 
                        fontSize: "12px", 
                        color: "#3498db",
                        fontStyle: "italic"
                      }}>
                        ⏳ AI is refining your note...
                      </p>
                    )}
                  </div>
                )}
                {note.file && <p style={{ margin: 0, fontSize: "14px", color: "#2c3e50" }}>📎 {note.file}</p>}
              </>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
              {editingNoteId !== note.id && (
                <>
                  <button
                    onClick={() => handleEdit(note)}
                    disabled={refiningNoteId === note.id}
                    style={{
                      padding: "5px 10px",
                      fontSize: "12px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: refiningNoteId === note.id ? "#bdc3c7" : "#f39c12",
                      color: "white",
                      cursor: refiningNoteId === note.id ? "not-allowed" : "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleRefineNote(note)}
                    disabled={refiningNoteId === note.id}
                    style={{
                      padding: "5px 10px",
                      fontSize: "12px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: refiningNoteId === note.id ? "#bdc3c7" : "#9b59b6",
                      color: "white",
                      cursor: refiningNoteId === note.id ? "not-allowed" : "pointer",
                    }}
                  >
                    {refiningNoteId === note.id ? "Refining..." : "Refine with AI"}
                  </button>

                  <button
                    onClick={() => handleDelete(note.id)}
                    disabled={refiningNoteId === note.id}
                    style={{
                      padding: "5px 10px",
                      fontSize: "12px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: refiningNoteId === note.id ? "#bdc3c7" : "#e74c3c",
                      color: "white",
                      cursor: refiningNoteId === note.id ? "not-allowed" : "pointer",
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;