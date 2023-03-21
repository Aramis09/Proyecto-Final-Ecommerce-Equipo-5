import { Friend } from '../../types';

export interface friendsReducerState {
	newFriendRequest: Array<object>;
	responseRequest: string;
	friendsConfirmed: Array<object>;
	FriendsPending: Array<object>;
}
