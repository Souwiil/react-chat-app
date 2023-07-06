
import React, {useState, useEffect} from 'react';


import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

import loader from '../assets/loader.gif'
import { avatarRoute } from '../utils/API';
import { Buffer } from 'buffer';


const Avatar = () => {
  const api = 'https://avatars.dicebear.com/api/adventurer';
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const checkUser = async () => {
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate('/login');
      }
    };

    checkUser();
  }, []);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
      return;
    } else{
      const user = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const { data } = await axios.post(`${avatarRoute}/${user._id}`, {
        image:avatars[selectedAvatar],
      });
      // console.log(data);
      if(data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem('chat-app-user',JSON.stringify(user));
        navigate('/')
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    }
  };

  //---------------------------------------------API des image------------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const imageIndex = Math.round(Math.random() * 1000);
        const image = await axios.get(`${api}/${imageIndex}.svg`);
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //---------------------------------------------API des image------------------------------------------------------------

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center flex-col gap-12 bg-zinc-900 h-screen w-screen'>
          <img src={loader} alt="loader" className="h-96" />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-12 bg-zinc-900 h-screen w-screen">
          <div className="text-[#e8e8e8]">
            <h1 className="text-2xl">
              Pick an avatar as your profile picture
            </h1>
          </div>
          <div className="flex gap-8">
            {avatars.map((avatar, index) => {
              return (
                <div
                key={index}
                  className={` cursor-pointer border-4 border-transparent p-4 rounded-full flex justify-center items-center transition duration-500 ease-in-out ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    className="h-24"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button
            className="bg-zinc-900  text-zinc-200 px-8 py-4 font-bold cursor-pointer rounded-full text-base uppercase transition duration-500 ease-in-out hover:bg-pink-400"
            onClick={setProfilePicture}
          >
            Set as Profile PIcture
          </button>
          <ToastContainer />
        </div>
      )};
    </>
  );
};

export default Avatar;
