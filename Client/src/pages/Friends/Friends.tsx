import { NavBar } from '../../components/NavBar/NavBar';
import { AddiFriend } from './addFriends';
// import { ResFriend } from './resFriends';
import { PendingFr } from './pendingFriends';


export const Friends = () => {
	return (
		<div>
			<NavBar />
			<h4>List friends</h4>
			<div>
				<AddiFriend />
				{/* <ResFriend /> */}
				<PendingFr />
			</div>
		</div>
	);
};
