import { createSlice } from '@reduxjs/toolkit';
import { friendsReducerState } from '../interfaces/friendInterface';

const initialState: friendsReducerState = {
	newFriendRequest: [],
	responseRequest: '',
	friendsConfirmed: [],
	FriendsPending: [],
};

export const friendReducer = createSlice({
	name: 'friendReducer',
	initialState,
	reducers: {
		addFriends: (state, action) => {
			state.newFriendRequest = action.payload;
		},
		resRequest: (state, action) => {
			state.responseRequest = action.payload;
		},
		confirmFriend: (state, action) => {
			state.friendsConfirmed = action.payload;
		},
		pendFriend: (state, action) => {
			state.FriendsPending = action.payload;
		},
	},
});

export const { addFriends, resRequest, confirmFriend, pendFriend } = friendReducer.actions;
export default friendReducer.reducer;
