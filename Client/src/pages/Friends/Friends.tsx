import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './Add/addFriends';
import { PendingFr } from './Pending/pendingFriends';
import { ConfirFriends } from './List/confirmFriends';
import styles from "./Friends.module.scss";
import NavbarPhone from '../../phone/navBarPhone/navBarPhone';
import { useState } from "react";

export const Friends = () => {
	const [flagFriendWasAccepted,setFlag] = useState(0);

	const wayToSendFlag = (signal:number) => {
		setFlag(signal);
	};

	return (
		<div>
			{window.innerWidth > 959 ?<NavBar /> : <NavbarPhone/>}
			<div className={styles.container}>
				<div className={styles.containerPendings}>
					<AddiFriend />
					<PendingFr 
					wayFlagToUpdate = {wayToSendFlag}
					/>
				</div>
				<div className={styles.containerListFriends}>
					<ConfirFriends 
					flag = {flagFriendWasAccepted}
					/>
				</div>
			</div>

		</div>
	);
};
