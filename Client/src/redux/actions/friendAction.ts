import { addFriends, resRequest, confirmFriend, pendFriend } from '../reducer/friendReducer';
import { LIST_USERS as User } from '../../utils/constants';
import axios from 'axios';

//Agregar amigos
export const addFriend = (emailUser: string, emailFriend: string) => async (dispatch: any) => {
		let frReque: object[];
		try {
			console.log("soy el rompe culos 3mil --->",emailUser,emailFriend)
			frReque = (await axios.get(User + `newFriendRequest?emailUser=${emailUser}&emailFriend=${emailFriend}`)).data;
			console.log("soy el rompe culos ------------>",frReque)
			dispatch(addFriends(frReque))
			// dispatch(confirmFriend(frReque)); //esto puede romper
		} catch (error) {
			console.error('Esto ocurrio en el back ' + error);
		}

	};

//Respuesta a la solicitud y eliminar solicitud
export const resReque = (emailUser: string, emailFriend: string, res: string) => async (dispatch: any) => {
		let responseReque: object[];
		try {
			responseReque = (await axios.get(User + `responseRequestFriend?email=${emailUser}&emailFriend=${emailFriend}&response=${res}`)).data;
			dispatch(resRequest(responseReque));
		} catch (error) {
			console.error('Esto ocurrio en el back ' + error);
		};
	};

//Amigos confirmados
export const confFriend = (emailUser: string) => async (dispatch: any) => {
	try {
		let friendList: object[] = (await axios.get(User + `friendsConfirmed?email=${emailUser}`)).data;
		console.log("---------> no pos sisoy",friendList)
		if(typeof(friendList) === 'object') dispatch(confirmFriend(friendList));
		
	} catch (error) {
		console.error('Esto ocurrio en el back ' + error);
	};
};

//Solicitudes pendientes
export const pendingFriend = (emailUser: string) => async (dispatch: any) => {

	let pending: object[];
	try {
		pending = (await axios.get(User + `friendsPending?email=${emailUser}`)).data;
		dispatch(pendFriend(pending));
	} catch (error) {
		console.error('Esto ocurrio en el back ' + error);
	};
};
