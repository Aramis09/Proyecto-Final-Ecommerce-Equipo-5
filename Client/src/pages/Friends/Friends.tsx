import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './Add/addFriends';
import { PendingFr } from './Pending/pendingFriends';
import { ConfirFriends } from './List/confirmFriends';
import styles from "./Friends.module.css";
import NavbarPhone from '../../phone/navBarPhone/navBarPhone';


export const Friends = () => {
	return (
		<div>
			{window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
			<div className={styles.cont}>
				<AddiFriend />
				<PendingFr />
			</div>
			<div className={styles.container}>
				<ConfirFriends />
			</div>
		</div>
	);
};
