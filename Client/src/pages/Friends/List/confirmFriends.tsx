import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { confFriend, resReque } from '../../../redux/actions/friendAction';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Cards } from "../Cards/Card";
import { useState } from "react";
import styles from './listFriend.module.scss';
import { searchFriendEmailController } from "../../../Controller/searchFriendEmailController";
import console from "console";

interface Friend  {
  accept: string
 UserMail : string,
 FriendInListEmail: string,
};

interface MakeGiftProps {
  onVariableChange: (value: string) => void;
};

export const ConfirFriends = (flag:any) => {
  const dispatch = useAppDispatch();
  const friendsConfirmed = useAppSelector((state) => state.friendReducer.friendsConfirmed);
  const [friendListResponse,setFriendListResponse]=useState([]);
  const { user } = useAuth0();
  const emailUser = user?.email;

  useEffect(() => {
    // @ts-ignore
    dispatch(confFriend(user?.email));
  }, [user?.email,flag]);
  
  
  useEffect(() => {
    // @ts-ignore
    setFriendListResponse(friendsConfirmed);
  }, [friendsConfirmed]);

    const searchFriendEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailSearch= event.target.value;
    if(!emailSearch.length) {
      // @ts-ignore
      dispatch(confFriend(user?.email))
    };
    searchFriendEmailController(emailUser,emailSearch).then(
     friend => setFriendListResponse(friend)
    );
};

  return (
    <div className={styles.container}>
      <div className={styles.containerCards}>
        

    <input
    className={styles.inputSearch}
      onChange={(event) => searchFriendEmailHandler(event)}
      placeholder="Find your friend"
      >
    </input>

      {friendListResponse.map((friend: any, index: number) => {
        return (
            <Cards key={index} friend={friend}/>
        )
      })}
      </div>
    </div>
  );
};







