import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { confFriend, resReque } from '../../../redux/actions/friendAction';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Cards } from "../Cards/Card";
import styles from './listFriend.module.scss';


export const ConfirFriends = () => {
  const dispatch = useAppDispatch();
  const { user }: any = useAuth0();
  const friendsConfirmed = useAppSelector((state) => state.friendReducer.friendsConfirmed);


  useEffect(() => {
    dispatch(confFriend(user?.email))
  }, [user?.email]);



  return (
    <div className={styles.container}>
      <div className={styles.containerCards}>
      {friendsConfirmed.map((friend: any, index: number) => {
        return (
            <Cards key={index} friend={friend}/>
        )
      })}
      </div>
    </div>
  )  
};