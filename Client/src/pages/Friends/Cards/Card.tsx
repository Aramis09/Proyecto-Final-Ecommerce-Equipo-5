import { useAuth0 } from "@auth0/auth0-react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { confFriend, resReque } from '../../../redux/actions/friendAction';
import styles from "./Card.module.scss";

export const Cards = ({ friend, index }: any | number) => {
	const dispatch = useAppDispatch();
	const { user }: any = useAuth0();
	const friendsConfirmed = useAppSelector((state) => state.friendReducer.friendsConfirmed);

	const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
		// @ts-ignore
		dispatch(resReque(user?.email, friendsConfirmed[0]?.FriendInListEmail, ev.currentTarget.value))
		.then(() => {
			dispatch(confFriend(user.email));
		});
	}
	return (
		<div className={styles.container}>
			<h4>{friend.FriendInListEmail}</h4>
			<button className={styles.deletFriend} value='remove' onClick={handleResponse}>Delete</button>
		</div>
	);
};
			// <div key={index} className = {styles.conatiner}>
			// </div>