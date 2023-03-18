import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './addFriends';
import { PendingFr } from './pendingFriends';
import { ConfirFriends } from './confirmFriends';


export const Friends = () => {
	return (
		<div>
			<NavBar />
			<div>
				<AddiFriend />
				<PendingFr />
				<ConfirFriends />
			</div>
		</div>
	);
};
