import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { getAllMessagesRoute, sendMessageRoute } from '../utils/API';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from "uuid"

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState (null);
  const scrollRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      if (currentChat && currentUser) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    };

    fetchData();
  }, [currentChat, currentUser]);

  const handleSendMsg = async (msg) => {
    if (currentUser && currentChat) {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      socket.current.emit("send-msg", {
        to:currentChat._id,
        from:currentUser._id,
        message: msg,
      })
      const msgs = [...messages];
      msgs.push({ fromSelf: true, message:msg });
      setMessages(msgs);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        // console.log({msg});
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour:"smooth"})
  },[messages]);

  return (
    <>
      {currentChat && currentUser && (
        <div className="p-4 w-full  gap-[0.1rem] overflow-hidden">
          <div className="flex justify-between border-b-4 mb-2 border-pink-200 items-center px-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                  className="h-12 sm:h-12 max-w-full"
                />
              </div>
              <div className="text-2xl font-bold text-zinc-900">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <div className="flex flex-col gap-2 overflow-auto text-zinc-200 h-3/4 overflow-y-auto scrollbar-thin  scrollbar-thumb-pink-300 scrollbar-track-pink-100">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}
                  
                  className={`flex items-center ${
                    message.fromSelf ? 'flex justify-end' : 'flex justify-start'
                  }`}
                >
                  <div
                  key={message.id}
                    className={`messageContent p-4 ${
                      message.fromSelf ? 'bg-zinc-900 rounded-lg ' : 'bg-gray-400 rounded-lg'
                    }`}
                    
                  >
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}
    </>
  );
};

export default ChatContainer;