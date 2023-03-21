import React, { useState,useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { searchFriendEmailController } from "../../Controller/searchFriendEmailController";

interface Friend  {
    accept: string
   UserMail : string,
   FriendInListEmail: string,
}

export const MakeGift: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFriendEmail, setSelectedFriendEmail] = useState<string>("");
  const [friendListResponse,setFriendListResponse]=useState([])
  const { user } = useAuth0();
  const emailUser = user?.email;
  const emailHardCodeado = 'rocha@gmail.com'
  const handleYesNoSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  function handleSelectEmailChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedFriendEmail(event.target.value);
  }

  const searchFriendEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('ando bien ')
      const emailSearch= event.target.value
      searchFriendEmailController(emailHardCodeado,emailSearch).then(
       friend=>setFriendListResponse(friend)
      )
  }
  console.log('soy friendListResponse:',friendListResponse)
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
            onChange={(event) => searchFriendEmailHandler(event)}
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
              {friendListResponse?.map((property : Friend) => {
                return (
                <option key={property.FriendInListEmail} value={property.FriendInListEmail}>
                  {property.FriendInListEmail}
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

              
              //   const paraMapear = [
              //     {
              //       accept: "true",
              //       UserEmail: "aramisjaime48@gmail.com",
              //       FriendInListEmail: "nahuelElPeluca@gmail.com",
              //     },
              //     {
              //       accept: "true",
              //       UserEmail: "aramisjaime48@gmail.com",
              //       FriendInListEmail: "nahuelSenioRedux@gmail.com",
              //     },
              //   ];
              //   const filteredFriendEmails = response?.map(
              //     (friend) => friend.FriendInListEmail
              //   ); // ['nahuelElPeluca@gmail.com',nahuelSenioRedux@gmail.com]
              //console.log("SOY LOS EMAILS FILTRADOS-->>", filteredFriendEmails);