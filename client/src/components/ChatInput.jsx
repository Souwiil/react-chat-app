import React, { useState } from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({handleSendMsg}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


  //Recupere le code sur emoji-mart https://www.npmjs.com/package/emoji-mart
  const addEmoji = (e) => {
    const sym = e.unified.split("_");
    const codeArray = [];
    sym.forEach((el) => codeArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codeArray);
    setMsg(msg + emoji);
  };
  //Recupere le code sur emoji-mart https://www.npmjs.com/package/emoji-mart

  const sendChat = (e) => {
    e.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg('')
    }
  }
  

  return (
    <div className=" fixed bottom-20  w-3/5  flex  items-center justify-center gap-4 rounded-lg  p-0 sm:p-8 pb-1">
      <div className="flex items-center text-white gap-4">
        <div className="relative text-red-300 cursor-pointer text-3xl ">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div className="absolute bottom-12 left-0">
              <Picker
                data={data} 
                emojiSize={24}
                emojiButtonSize={36}
                onEmojiSelect={addEmoji}
              />
            </div>
          )}
        </div>
      </div>
      <form onSubmit={(e) => sendChat(e)} className=" w-full rounded-full flex items-center gap-8  bg-zinc-900">
        <input
          type="text"
          placeholder="type your message here"
          className="w-full bg-transparent text-zinc-200  pl-4 text-lg focus:outline-none"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="px-4 py-2 w-24  text-3xl rounded-3xl flex justify-center items-center bg-pink-300 ">
          <IoMdSend />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
