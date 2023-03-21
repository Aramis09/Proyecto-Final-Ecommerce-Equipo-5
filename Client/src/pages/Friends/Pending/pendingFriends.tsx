import { useAppDispatch, useAppSelector } from '../../../redux/hooks/hooks';
import { pendingFriend, resReque } from '../../../redux/actions/friendAction';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import styles from './pendingFriends.module.css';


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
			dispatch(pendingFriend(user?.email));
		});
	};

	if (user?.email_verified && isAuthenticated) {
		if (friendsPending.length > 0) {
			return (
				<div className={styles.conta}>
					<div className={styles.user}>
						<span>Your Friends Requests: {user?.name}</span>
					</div>
					{friendsPending.map((pend: any, index: number) => {
						return (
							<div className={styles.cards} key={index}>
								<span className={styles.resquets}>
									Pending Friends Request: {pend.UserEmail}
								</span>
								<button className={styles.reje} value='rejected' onClick={handleResponse}>
									X
								</button>
								<button className={styles.accp} value='accept' onClick={handleResponse}>
									✓
								</button>
							</div>
						);
					})}
				</div>
			);
		} else {
			return (
				<div className={styles.noFrien}>
					<span className={styles.msg}>
						You don't have any friend requests
					</span>
				</div>
			);
		}
	} else {
		return (
			<div className={styles.noReg}>
				<span className={styles.register}>Register to add your friends</span>
			</div>
		);
	}
};
