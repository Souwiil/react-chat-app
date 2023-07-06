import React from 'react';
import { useNavigate } from 'react-router-dom';

import {GiSamuraiHelmet} from 'react-icons/gi'
const Logout = () => {
    const navigate = useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate("/login")
    }

    return (
        <button onClick={handleClick}
        className='border-none p-2 rounded-lg text-pink-400 bg-zinc-900 flex justify-center items-center cursor-pointer text-3xl'>
            <GiSamuraiHelmet />
        </button>
    );
}

export default Logout;
