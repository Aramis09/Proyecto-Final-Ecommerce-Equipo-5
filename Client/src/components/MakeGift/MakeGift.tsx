import React, { useState,useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { searchFriendEmailController } from "../../Controller/searchFriendEmailController";

interface Friend  {
    accept: string
   UserMail : string,
   FriendInListEmail: string,
}

interface MakeGiftProps {
    onVariableChange: (value: string) => void;
  }

export const MakeGift: React.FC<MakeGiftProps> = ({onVariableChange}) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [selectedFriendEmail, setSelectedFriendEmail] = useState<string>("");
  const [friendListResponse,setFriendListResponse]=useState([])
  const { user } = useAuth0();
  const emailUser = user?.email;

  const handleYesNoSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleSelectEmailChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFriendEmail(event.target.value);
    onVariableChange(event.target.value);
  }

  const searchFriendEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
      const emailSearch= event.target.value
      searchFriendEmailController(emailUser,emailSearch).then(
       friend=>setFriendListResponse(friend)
      )
  }
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
              <option value="select a option">
              "select a option"
                </option>
              {friendListResponse?.map((property : Friend) => {
                return (
                <option key={property.FriendInListEmail} value={property.FriendInListEmail}>
                  {property.FriendInListEmail}
                </option>
                )
              })}
            </select>
            <p>Your have selected your friend's email :{selectedFriendEmail}</p>
          </div>
      )}
    </>
  );
};
