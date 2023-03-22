import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './Add/addFriends';
import { PendingFr } from './Pending/pendingFriends';
import { ConfirFriends } from './List/confirmFriends';
import styles from "./Friends.module.scss";
import NavbarPhone from '../../phone/navBarPhone/navBarPhone';


export const Friends = () => {
	return (
		<div>
				{window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
			<div className={styles.container}>
				<div className={styles.containerPendings}>
					<AddiFriend />
					<PendingFr />
				</div>
				<div className={styles.containerListFriends}>
					<ConfirFriends />
				</div>
			</div>

		</div>
	);
};
