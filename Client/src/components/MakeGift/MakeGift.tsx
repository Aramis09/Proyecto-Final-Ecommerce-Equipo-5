import React, { useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

export const MakeGift: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [selectedFriendEmail, setSelectedFriendEmail] = useState("");
  const { user } = useAuth0();
  const emailUser = user?.email;

  const handleYesNoSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  function handleSelectEmailChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFriendEmail(event.target.value);
  }

  //PARA HACER LA PETICION AL BACK-End ( Lista de amigos)
  const searchFriendEmailHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmailSearch(event.target.value);
    const data = {
      emailUser,
      valurForSearch: emailSearch,
    };
    console.log("data", data);
    //const response = axios.get(`/user/searchFriends?searchFriend=${emailUser}&valurForSearch${emailSearch}`);
  };

  const paraMapear = [
    {
      accept: "true",
      UserEmail: "aramisjaime48@gmail.com",
      FriendInListEmail: "nahuelElPeluca@gmail.com",
    },
    {
      accept: "true",
      UserEmail: "aramisjaime48@gmail.com",
      FriendInListEmail: "nahuelSenioRedux@gmail.com",
    },
  ];

  const filteredFriendEmails = paraMapear?.map(
    (friend) => friend.FriendInListEmail
  ); // ['nahuelElPeluca@gmail.com',nahuelSenioRedux@gmail.com]
  console.log("SOY LOS EMAILS FILTRADOS-->>", filteredFriendEmails);

  return (
    <>
      <p>Do you wanna make a gift to a friend?</p>
      <select
        id="make-gift-select"
        value={selectedOption}
        onChange={handleYesNoSelectChange}
      >
        <option value="no">No</option>
        <option value="yes">Sí</option>
      </select>
      <br></br>
      {selectedOption === "yes" && (
        <>
          <p>Type your friend's email to make a search</p>
          <input
            value={emailSearch}
            onChange={(e) => searchFriendEmailHandler(e)}
            placeholder="Type at least a part of your friend's email"
          ></input>
        </>
      )}
      {selectedOption === "yes" && (
        
          <div>
            <select
              id="choose-friend-email-select"
              value={selectedFriendEmail}
              onChange={handleSelectEmailChange}
            >
              {filteredFriendEmails?.map((email) => {
                return (
                <option key={email} value={email}>
                  {email}
                </option>
                )
              })}
            </select>
            <p>Your email selected friend is {selectedFriendEmail}</p>
          </div>
          //Si elegiste un amigo para enviarle por mail el juego mostrame el boton Generate PaymentLink
        // {selectedFriendEmail && }
       
      )}
    </>
  );
};
