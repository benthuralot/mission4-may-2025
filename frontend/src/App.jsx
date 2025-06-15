import { useState } from "react";
import ChatBox from "./ChatBox";
import Header from "./components/Header";
import Footer from "./components/Footer";

function ChatApp() {
  const [messages, setMessages] = useState([
    {
      sender: "Tina",
      text: "I’m Tina. I help you to choose the right insurance policy. May I ask you a few personal questions to make sure I recommend the best policy for you?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async (text) => {
    setMessages((prev) => [...prev, { sender: "You", text }]);
    setIsTyping(true);

    const MIN_TYPING_DELAY = 1500;
    const startTime = Date.now();

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: text }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      const aiReply = data.response;

      const elapsed = Date.now() - startTime;
      const waitTime =
        elapsed < MIN_TYPING_DELAY ? MIN_TYPING_DELAY - elapsed : 0;

      setTimeout(() => {
        setMessages((prev) => [...prev, { sender: "Tina", text: aiReply }]);
        setIsTyping(false);
      }, waitTime);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "Tina",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header />

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "50vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChatBox
            messages={messages}
            isTyping={isTyping}
            onSend={sendMessage}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ChatApp;
