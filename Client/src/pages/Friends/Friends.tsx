import { NavBar } from '../../components/NavBar/NavBar';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { addFriend, resReque, confFriend, pendingFriend } from "../../redux/actions/friendAction";
const ListFriendsConfirmed = [1, 2, 3];

export const Friends = () => {
    
    let adiFriend = useAppSelector((state) => state);




	if (ListFriendsConfirmed.length > 0) {
		return (
			<div>
				<NavBar />

				<h4>List friends</h4>
			</div>
		);
	} else {
		return (
			<div>
				<h4>You do not have friends now</h4>
				<button>Home</button>
			</div>
		);
	}
};
