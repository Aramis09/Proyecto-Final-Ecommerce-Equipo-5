import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { pendingFriend, resReque } from "../../redux/actions/friendAction";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

interface ResponseReque {
    emailUser: any;
    emailFriend: any;
    response: string;
}

export const PendingFr = () => {
    const dispatch = useAppDispatch();
    const { user }: any = useAuth0();
    const responseRequest = useAppSelector((state) => state.friendReducer.responseRequest);
	const friendsPending = useAppSelector((state) => state.friendReducer.FriendsPending);

    useEffect(() => {
        dispatch(pendingFriend(user?.email))
    },[])

    const [res, setRes] = useState<ResponseReque>({
        emailUser: user?.email,
        emailFriend: friendsPending[0]?.UserEmail,
        response: '',
    })

    const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(resReque(res.emailUser, res.emailFriend, ev.currentTarget.value));
        setRes({emailUser:user.email, emailFriend: friendsPending[0]?.UserEmail, response: ev.currentTarget.value})
    }

    if (friendsPending.length > 0 && user?.email) {
        return (
            <div>
                <span>Your Friends Requests: {user.email}</span>
                <br />
                {friendsPending.map((pend:any, index:number) => {
                    return (
                        <div key={index}>
                            <span>Pending Friends Request: {pend.UserEmail}</span>
                            <br />
                            <button value='rejected' onClick={handleResponse}>X</button>
                            <button value='accept' onClick={handleResponse}>✓</button>
                        </div>
                    )
                })}
            </div>
        )
    }
    else {
        return (
            <div>
                <span>You don't have any friend requests</span>
            </div>
        )
    }
    
};


