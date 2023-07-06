import React from 'react';
import  Hello from "../assets/4.gif"

const Welcome = ({ currentUser }) => {
    return (
      <div className='w-full'>
        <div className='flex h-4/5 justify-center items-center flex-col text-zinc-900'>
            <img className='h-80' src={Hello} alt="Robot-Hello" />
            <h1 className='text-2xl'>
        {currentUser ? (
          <>
            Bienvenue, <span className='text-pink-700 font-bold text-lg'>{currentUser.username} !</span>
          </>
        ) : (
          "Chargement de l'utilisateur..."
        )}
      </h1>
            <h3>Please select a chat to Start Messaging</h3>
        </div>
        </div>
    );
}

export default Welcome;
