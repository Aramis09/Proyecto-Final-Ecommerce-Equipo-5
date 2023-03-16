import { Friend } from "../../types";

export interface friendsReducerState {
	newFriendRequest: Friend[];
	responseRequest: Friend[];
	friendsConfirmed: Friend[];
	FriendsPending: Friend[];
}