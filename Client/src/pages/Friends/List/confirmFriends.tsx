import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { confFriend, resReque } from '../../../redux/actions/friendAction';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Cards } from "../Cards/Card";
import styles from './listFriend.module.css';


export const ConfirFriends = () => {
  const dispatch = useAppDispatch();
  const { user }: any = useAuth0();
  const friendsConfirmed = useAppSelector((state) => state.friendReducer.friendsConfirmed);


  useEffect(() => {
    dispatch(confFriend(user?.email))
  }, [user?.email]);

  const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
      dispatch(resReque(user?.email, friendsConfirmed[0]?.FriendInListEmail, ev.currentTarget.value))
      .then(() => {
          dispatch(confFriend(user.email));
      });
  }

  return (
    <div>
      <h4 className={styles.title}>List friends of {user?.name}</h4>
      <div className={styles.card}>
      {friendsConfirmed.map((friend: unknown, index: number) => {
        return (
          <div className={styles.friends} key={index}>
            <Cards key={index} friend={friend}/>
            <button className={styles.deletFriend} value='remove' onClick={handleResponse}>X</button>
          </div>
        )
      })}
      </div>
    </div>
  )  
};