import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hooks';
import { addFriend } from '../../../redux/actions/friendAction';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './addFriends.module.scss';


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

	const handleAddFriend = (event:any) => {
		if (event.keyCode === 13) {
			dispatch(addFriend(friendRequest.emailUser, friendRequest.emailFriend));
			setFriendRequest({ emailUser: user?.email, emailFriend: '' });
		};
	};

	return (
		<div className={styles.container}>
			{/* <h4 className={styles.send}>Send Friend Requests</h4> */}
			<input
				className={styles.input}
				type='text'
				placeholder='Send request'
				value={friendRequest.emailFriend}
				onChange={(ev) =>
					setFriendRequest({ ...friendRequest, emailFriend: ev.target.value })
				}
				onKeyDown={handleAddFriend}
			/>
		</div>
	);
};
