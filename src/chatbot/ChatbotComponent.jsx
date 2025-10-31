import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../App";

const Chatbot = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Hi! I'm your EduProgress Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    processMessage(input.toLowerCase());
    setInput("");
  };

  const processMessage = (text) => {
    let botReply =
      "I'm not sure about that. Try asking about attendance, notes, or placement.";

    if (text.includes("attendance")) {
      botReply = "📊 Opening your Attendance page...";
      navigate("/attendance");
    } else if (text.includes("notes")) {
      botReply = "📝 Taking you to your Notes section!";
      navigate("/notes");
    } else if (text.includes("placement")) {
      botReply = "🎯 Let's check your Placement updates!";
      navigate("/placement");
    } else if (text.includes("github")) {
      botReply = "💻 Redirecting to GitHub Tracker!";
      navigate("/github-tracker");
    } else if (text.includes("dashboard")) {
      botReply = "📈 Heading to your Dashboard!";
      navigate("/dashboard");
    } else if (text.includes("games")) {
      botReply = "🎮 Time for some Educational Games!";
      navigate("/educational-games");
    } else if (text.includes("calculator")) {
      botReply = "🧮 Opening Calculators for you!";
      navigate("/calculators");
    } else if (text.includes("job")) {
      botReply = "💼 Opening Job Selector!";
      navigate("/job-selector");
    } else if (text.includes("announcement")) {
      botReply = "📢 Taking you to Announcements!";
      navigate("/announcements");
    } else if (text.includes("hi") || text.includes("hello")) {
      botReply =
        "👋 Hey there! You can ask me things like 'show my attendance' or 'open notes'.";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    }, 500);
  };

  return (
    <div>
      {/* 💬 Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          borderRadius: "50%",
          background: "#007bff",
          color: "white",
          width: "55px",
          height: "55px",
          border: "none",
          cursor: "pointer",
          fontSize: "22px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          zIndex: 9999, // 👈 keeps button always on top
        }}
      >
        💬
      </button>

      {/* 💬 Chat Window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "85px",
            right: "20px",
            width: "340px",
            height: "420px",
            background: isDarkMode ? "#1f1f1f" : "#f9f9f9",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "10px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.6)",
            color: isDarkMode ? "white" : "black",
            border: isDarkMode ? "1px solid #333" : "1px solid #ccc",
            zIndex: 9999, // 👈 keeps chat window above all components
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  alignSelf:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                  background:
                    msg.sender === "user"
                      ? "#007bff"
                      : isDarkMode
                      ? "#333"
                      : "#ddd",
                  color:
                    msg.sender === "user"
                      ? "white"
                      : isDarkMode
                      ? "white"
                      : "black",
                  padding: "8px 12px",
                  borderRadius: "10px",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "6px" }}>
            <input
              type="text"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "none",
                outline: "none",
              }}
            />
            <button
              onClick={handleSend}
              style={{
                background: "#007bff",
                border: "none",
                color: "white",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
