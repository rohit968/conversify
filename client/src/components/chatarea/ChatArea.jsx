import axios from "axios";
import React, { useEffect, useRef } from "react";

const ChatArea = ({ selectedUserId, messages, setMessages }) => {
  const divUnderMessages = useRef(null);

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (selectedUserId) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  return (
    <div className="h-full flex items-end">
      {!selectedUserId && (
        <div className="flex justify-center m-auto text-slate-400 h-96 text-lg">
          Select a person to start chatting
        </div>
      )}

      {selectedUserId && (
        <div className="overflow-y-auto absolute inset-0 flex flex-col justify-end">
          {messages?.map((message) => (
            <div
              className={`flex flex-col  ${
                message.recipient !== selectedUserId ? "" : "items-end"
              }`}
            >
              <div
                className={`px-2 py-1 mb-2 rounded-md max-w-lg w-fit break-words ${
                  message.sender !== selectedUserId
                    ? "bg-white"
                    : "bg-cyan-600 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={divUnderMessages}></div>
        </div>
      )}
    </div>
  );
};

export default ChatArea;
