import React, { useEffect, useState } from "react";
import { IoSendSharp } from "react-icons/io5";

const MessageForm = ({ selectedUserId, setMessages, messages }) => {
  const [wsserver, setWSServer] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://conversify-backend.onrender.com");
    setWSServer(ws);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wsserver.readyState === WebSocket.OPEN) {
      // send message
      wsserver.send(
        JSON.stringify({
          recipient: selectedUserId,
          text: newMessage,
        })
      );
    } else {
      console.error("WebSocket connection is not open");
    }
    setNewMessage("");
    setMessages((prev) => [
      ...prev,
      {
        isOur: true,
        text: newMessage,
        recipient: selectedUserId,
      },
    ]);
  };

  return (
    <form
      className="flex items-center justify-evenly pt-4"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Enter your message here..."
        className="bg-white rounded-md p-2 w-11/12"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button
        type="submit"
        className="text-cyan-400 bg-teal-800 p-2 rounded-md text-2xl disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={newMessage.length <= 0}
      >
        <IoSendSharp />
      </button>
    </form>
  );
};

export default MessageForm;
