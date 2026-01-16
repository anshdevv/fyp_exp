// import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

// export default function App() {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [sessionId] = useState(uuidv4()); // unique per user/session

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMsg = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");

//     const res = await fetch("http://localhost:8000/chat", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_input: input, session_id: sessionId }),
//     });

//     const data = await res.json();
//     const botMsg = { sender: "bot", text: data.reply };
//     setMessages((prev) => [...prev, botMsg]);
//   };

//   // ... UI same as befor
//   return (
//     <div className="flex flex-col items-center h-screen bg-gray-100 p-4">
//       <h1 className="text-xl font-bold mb-4">🏥 Hospital CSR Chatbot</h1>

//       <div className="w-full max-w-md bg-white shadow rounded-lg p-3 overflow-y-auto flex-1 mb-3">
//         {messages.map((msg, i) => (
//           <div key={i} className={`mb-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
//             <span
//               className={`inline-block px-3 py-2 rounded-xl ${
//                 msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
//               }`}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="flex w-full max-w-md">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-1 border rounded-l-lg p-2"
//         />
//         <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r-lg">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
import { useEffect, useRef, useState } from "react";
// import { useRef, useState } from "react";
import "./index.css";
// import "../../agent_testing/test3.py"

export default function App() {
  // console.log("inside app")
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  const [sessionId] = useState(uuidv4()); // unique per user/session


  const sendMessage = async () => {
    console.log("send message triggered")
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_input: input, session_id: sessionId }),
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
    console.log(messages)
  };
  return (
    <div className="app">
      <div className="chat-container">
        <header className="chat-header">
          <div>
            <h1>CityCare Hospital</h1>
            <span>Patient Support</span>
          </div>
          <button className="call-btn" >Call</button>
        </header>

        <main className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`bubble mb-2 ${msg.sender === "user" ? "text-right user" : "text-left bot"}`}>
              <div
                className={`bubble msg_generl ${msg.sender === "user" ? "bg-blue-500 text-white user " : "bg-gray-200 bot"
                  }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* {loading && (
            <div className="typing">
              <span></span><span></span><span></span>
            </div>
          )} */}
          <div ref={bottomRef} />
        </main>

        <footer className="chat-input">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
          />
          <button onClick={sendMessage}>Send</button>
        </footer>
      </div>
    </div>
  );
}

