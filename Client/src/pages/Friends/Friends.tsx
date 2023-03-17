import { NavBar } from '../../components/NavBar/NavBar';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { addFriend, confFriend, resReque, pendingFriend } from "../../redux/actions/friendAction";
import { useEffect, useState } from 'react';

interface FriendRequest {
	emailUser: string;
	emailFriend: string;
}

export const Friends = () => {
	const dispatch = useAppDispatch();
    let newFriendRequest = useAppSelector((state)=>state.friendReducer.newFriendRequest);
    let FriendsPending = useAppSelector((state)=>state.friendReducer.FriendsPending);
	const [friendRequest, setFriendRequest] = useState<FriendRequest>({ emailUser: '', emailFriend: '' });

	useEffect(() => {
		if (newFriendRequest.length > 0) {
			dispatch(addFriend(newFriendRequest[0], newFriendRequest[1]));
		}
	}, [newFriendRequest]);
	
	const handleAddFriend = () => {
		dispatch(addFriend(friendRequest.emailUser, friendRequest.emailFriend));
		setFriendRequest({ emailUser: '', emailFriend: '' });
	}
	return (
		<div>
			<NavBar />
			<h4>List friends</h4>
			<div>
				<input
					type='text'
					placeholder='Email User'
					value={friendRequest.emailUser}
					onChange={(ev) =>
						setFriendRequest({ ...friendRequest, emailUser: ev.target.value })
					}
				/>
				<input
					type='text'
					placeholder='Email Friend'
					value={friendRequest.emailFriend}
					onChange={(ev) =>
						setFriendRequest({ ...friendRequest, emailFriend: ev.target.value })
					}
				/>
				<button onClick={handleAddFriend}>Add Friend</button>
			</div>
			<h4>{FriendsPending}</h4>
		</div>
	);
};
