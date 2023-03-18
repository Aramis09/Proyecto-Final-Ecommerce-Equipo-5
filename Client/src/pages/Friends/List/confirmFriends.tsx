import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { confFriend, resReque } from '../../../redux/actions/friendAction';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

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
      <h4>List friends</h4>
      {friendsConfirmed.map((friend: any, index: number) => {
        return (
          <div key={index}>
          <h4>{friend.FriendInListEmail}</h4>
          <button value='remove' onClick={handleResponse}>X</button>
          </div>
        )
      })}
    </div>
  )  
};