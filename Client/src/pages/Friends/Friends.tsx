import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './Add/addFriends';
import { PendingFr } from './Pending/pendingFriends';
import { ConfirFriends } from './List/confirmFriends';

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
