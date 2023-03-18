/** @format */

import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { pendingFriend, resReque } from '../../../redux/actions/friendAction';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

export const PendingFr = () => {
	const dispatch = useAppDispatch();
	const { user, isAuthenticated }: any = useAuth0();
	const friendsPending = useAppSelector(
		(state) => state.friendReducer.FriendsPending,
	);

	useEffect(() => {
		if (user?.email && isAuthenticated) {
			dispatch(pendingFriend(user?.email));
		}
	}, [user?.email, isAuthenticated]);

	const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
		dispatch(
			resReque(
				user?.email,
				friendsPending[0]?.UserEmail,
				ev.currentTarget.value,
			),
		).then(() => {
			dispatch(pendingFriend(user.email));
		});
	};

	if (user?.email_verified && isAuthenticated) {
		if (friendsPending.length > 0) {
			return (
				<div>
					<span>Your Friends Requests: {user.email}</span>
					<br />
					{friendsPending.map((pend: any, index: number) => {
						return (
							<div key={index}>
								<span>Pending Friends Request: {pend.UserEmail}</span>
								<br />
								<button value='rejected' onClick={handleResponse}>
									X
								</button>
								<button value='accept' onClick={handleResponse}>
									✓
								</button>
							</div>
						);
					})}
				</div>
			);
		} else {
			return (
				<div>
					<span>You don't have any friend requests</span>
				</div>
			);
		}
	} else {
		return (
			<div>
				<span>Register to add your friends</span>
			</div>
		);
	}
};
