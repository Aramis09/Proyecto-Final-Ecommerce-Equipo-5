import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hooks';
import { addFriend, confFriend } from '../../../redux/actions/friendAction';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from './addFriends.module.scss';

export const AddiFriend = () => {
	const dispatch = useAppDispatch();
	const { user }: any = useAuth0();
	const [emailFriendFromInput,setEmailFriendFromInput] = useState("");

	const handlerAddFriend = (event:any) => {
		const emailUser = user?.email;
		if (event.keyCode === 13) {
			dispatch(addFriend(emailUser,emailFriendFromInput));
			dispatch(confFriend(user?.email));
			setEmailFriendFromInput("");
		};
	};

	return (
		<div className={styles.container}>
			<input
				className={styles.input}
				type='text'
				value={emailFriendFromInput}
				placeholder='send request'
				onChange={(ev) => setEmailFriendFromInput(ev.target.value)}
				onKeyDown={handlerAddFriend}
			/>
		</div>
	);
};
