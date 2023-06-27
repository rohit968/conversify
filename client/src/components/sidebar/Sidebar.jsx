import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../UserContext";

const Sidebar = ({ setSelectedUserId, selectedUserId, setMessages }) => {
  const [wsserver, setWSServer] = useState(null);
  const [peopleOnline, setPeopleOnline] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    autoConnectToWebSocketServer();
  }, []);

  const autoConnectToWebSocketServer = () => {
    const ws = new WebSocket("wss://conversify-backend.onrender.com");
    setWSServer(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => autoConnectToWebSocketServer());
  };

  const handleMessage = (e) => {
    const recievedMessages = JSON.parse(e.data);
    console.log(recievedMessages);
    if ("online" in recievedMessages) {
      const people = [];
      recievedMessages.online.forEach(({ userId, name, photo }) => {
        if (userId) {
          people.push({
            userId,
            name,
            photo,
          });
        }
      });
      const distinctArr = Array.from(
        new Set(people.map((obj, key = obj.userId) => obj.userId))
      ).map((id, key = id) => {
        return people.find((obj) => obj.userId === id);
      });
      setPeopleOnline(distinctArr);
    } else {
      if (recievedMessages.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...recievedMessages, isOur: false }]);
      }
    }
  };

  const onlinePeopleExcSelf = peopleOnline.filter(
    (p) => p.userId !== userData?.userId
  );

  console.log(userData);

  console.log(onlinePeopleExcSelf);

  return (
    <div>
      {onlinePeopleExcSelf?.map((people, key = people.userId) => (
        <div
          onClick={() => setSelectedUserId(people.userId)}
          className={
            "flex w-full gap-4 px-4 py-2 items-center border-b border-slate-400 cursor-pointer bg-slate-100" +
            (people.userId !== selectedUserId ? "border-none" : "")
          }
        >
          <div className="h-10 w-10">
            <img
              src={`https://conversify-backend.onrender.com/uploads/${people?.photo}`}
              className="h-full w-full object-cover rounded-full"
              alt="profile-pic"
            />
          </div>
          <div className="w-full rounded-sm my-2 p-1">{people.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
