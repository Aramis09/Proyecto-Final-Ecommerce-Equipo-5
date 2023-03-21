import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './Add/addFriends';
import { PendingFr } from './Pending/pendingFriends';
import { ConfirFriends } from './List/confirmFriends';
import styles from "./Friends.module.css";


export const Friends = () => {
	return (
		<div>
			<NavBar />
			<div className={styles.cont} >
				<AddiFriend />
				<PendingFr />
				<ConfirFriends />
			</div>
		</div>
	);
};
