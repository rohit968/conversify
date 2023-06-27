import { useState } from "react";
import ChatArea from "../components/chatarea/ChatArea";
import Header from "../components/header/Header";
import MessageForm from "../components/messageForm/MessageForm";
import Sidebar from "../components/sidebar/Sidebar";

const ChatPage = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  console.log(messages);
  return (
    <div className="bg-gray-100 max-h-screen">
      <Header />
      <div
        className="flex gap-2 p-2 m-auto"
        style={{ height: "89vh", width: "95%" }}
      >
        <div className="w-1/3 bg-white p-2 rounded-lg">
          <Sidebar
            setSelectedUserId={setSelectedUserId}
            selectedUserId={selectedUserId}
            messages={messages}
            setMessages={setMessages}
          />
        </div>
        <div className="flex flex-col w-2/3 bg-cyan-100 p-3 rounded-lg">
          <div className="flex-grow relative h-full">
            <ChatArea
              selectedUserId={selectedUserId}
              messages={messages}
              setMessages={setMessages}
            />
          </div>
          {selectedUserId && (
            <div>
              <MessageForm
                selectedUserId={selectedUserId}
                setMessages={setMessages}
                messages={messages}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
