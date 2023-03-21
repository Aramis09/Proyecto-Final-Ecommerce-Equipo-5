import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hooks';
import { addFriend } from '../../../redux/actions/friendAction';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './addFriends.module.css';


interface FriendRequest {
	emailUser: string;
	emailFriend: string;
}	

export const AddiFriend = () => {
	const dispatch = useAppDispatch();
	const { user }: any = useAuth0();

	let newFriendRequest: any = useAppSelector(
		(state) => state.friendReducer.newFriendRequest,
	);

	const [friendRequest, setFriendRequest] = useState<FriendRequest>({
		emailUser: user?.email,
		emailFriend: '',
	});

	useEffect(() => {
		if (newFriendRequest.length > 0) {
			dispatch(addFriend(newFriendRequest[0], newFriendRequest[1]));
		}
	}, [newFriendRequest]);

	const handleAddFriend = () => {
		dispatch(addFriend(friendRequest.emailUser, friendRequest.emailFriend));
		setFriendRequest({ emailUser: user?.email, emailFriend: '' });
	};

	return (
		<div className={styles.add}>
			<h4 className={styles.send}>Send Friend Requests</h4>
			<input
				className={styles.inp}
				type='text'
				placeholder='Email Friend'
				value={friendRequest.emailFriend}
				onChange={(ev) =>
					setFriendRequest({ ...friendRequest, emailFriend: ev.target.value })
				}
			/>
			<button className={styles.but} onClick={handleAddFriend}>
				Add Friend
			</button>
		</div>
	);
};
