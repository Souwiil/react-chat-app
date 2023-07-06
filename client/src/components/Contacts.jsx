import React,{ useState,useEffect } from 'react';
import Logo from "../assets/1.png"
import { motion } from "framer-motion";
import { fadeIn } from "../motion";
import Search from './Search';

const Contacts = ({contacts, currentUser, changeChat}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [filteredContacts, setFilteredContacts] = useState(contacts);


  useEffect(() => {
    // console.log(contacts);
    if (currentUser) {
      setCurrentUserImage(currentUser.avatarImage);
      setCurrentUserName(currentUser.username);
    }
    setFilteredContacts(contacts); 
  }, [contacts, currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact); 
  };

  const handleSearch = (searchValue) => {
    if (searchValue.trim() !== "") {
      const filtered = contacts.filter(contact => {
        return contact.username.toLowerCase().includes(searchValue.toLowerCase());
      });
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <div className="lg:grid lg:grid-rows-[10%,75% 20%]  overflow-hidden rounded-lg border-none lg:w-4/12 w-48 bg-[#b1a29d]">
          <div className="flex flex-col items-center justify-center mt-2">
            <img className="h-10 sm:h-14" src={Logo} alt="logo" />
            <h3 className="text-zinc-950 lg:text-xl text-base font-bold uppercase">
              TAKUCHAT
            </h3>
            <div className="flex flex-col mb-4 w-auto ">
              <Search handleSearch={handleSearch} />
            </div>
          </div>
          <div className="contacts flex flex-col mb-4 items-center overflow-auto scrollbar-thin scrollbar-thumb-pink-300 scrollbar-track-pink-100">
            {filteredContacts.map((contact, index) => {
              return (
                <motion.div
                  variants={fadeIn("up", index * 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  className={`contact bg-zinc-950 bg-opacity-34 lg:min-h-20 cursor-pointer lg:w-11/12 sm:w-40 mt-2 lg:mt-4 rounded-md p-2 flex gap-2 lg:gap-4 items-center transition duration-500 ease-in-out ${
                    index === currentSelected ? "selected-current" : ""
                  }`}
                  key={contact._id}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                      className="lg:h-8 h-4"
                    />
                  </div>
                  <div className="username">
                    <h2 className="text-zinc-200 text-sm sm:text-base uppercase">
                      {contact.username}
                    </h2>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="current-user  bg-green-900 flex justify-center items-center gap-4 sm:gap-8">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
                className="h-12 sm:h-24 max-w-full"
              />
            </div>
            <div className="username">
              <h2 className="text-[#e8e8e8] text-lg sm:text-2xl">
                {currentUserName}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contacts;