import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "./styles/ChatBox.css";

function ChatBox({ messages = [], isTyping = false, onSend }) {
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };

  function cleanMarkdown(text) {
  return text.replace(/^```markdown\n/, "").replace(/```$/, "");
}

  return (
    <div className="chat-box">
      <div className="messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === "You" ? "user" : "ai"}`}
          >
            {msg.sender && <div className="sender-label">{msg.sender}</div>}

            <div className="markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  table({ children }) {
                    return <table className="markdown-table">{children}</table>;
                  },
                  img({ alt, src }) {
                    return <img className="markdown-image" alt={alt} src={src} />;
                  },
                }}
              >
                {cleanMarkdown(msg.text)}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="typing-indicator">
            <div className="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="typing-label">Tina is typing...</div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      <form className="input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          autoComplete="off"
          spellCheck={false}
          aria-label="Message input"
          autoFocus
        />
        <button
          type="submit"
          className="send-btn"
          disabled={!input.trim()}
          aria-disabled={!input.trim()}
          aria-label="Send message"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
