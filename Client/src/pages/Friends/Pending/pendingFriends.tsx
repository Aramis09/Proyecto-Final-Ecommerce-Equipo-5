import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { pendingFriend, resReque } from "../../../redux/actions/friendAction";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import styles from "./pendingFriends.module.scss";

interface FriendRequest {
  UserEmail: string;
}

interface PendingFriendsProps {
  wayFlagToUpdate: (value: number) => void;
}

export const PendingFr = (props: PendingFriendsProps) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated }: any = useAuth0();
  const friendsPending: FriendRequest[] = useAppSelector(
    (state) => state.friendReducer.FriendsPending
  );

  useEffect(() => {
    if (user?.email && isAuthenticated) {
      dispatch(pendingFriend(user?.email));
    }
  }, [user?.email, isAuthenticated]);

  const handleResponse = (ev: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(
      resReque(
        user?.email,
        friendsPending[0]?.UserEmail,
        ev.currentTarget.value
      )
    ).then(() => {
      dispatch(pendingFriend(user?.email));
    });

    if (ev.currentTarget.value === "accept") {
      props.wayFlagToUpdate(Math.random());
    }
  };

  if (user?.email_verified && isAuthenticated) {
    if (friendsPending.length > 0) {
      return (
        <div className={styles.container}>
          {friendsPending.map((pend: FriendRequest, index: number) => {
            return (
              <div className={styles.cards} key={index}>
                <span className={styles.resquets}>{pend.UserEmail}</span>
                <button
                  className={styles.buttonRejected}
                  value="rejected"
                  onClick={handleResponse}
                >
                  X
                </button>
                <button
                  className={styles.buttonAccept}
                  value="accept"
                  onClick={handleResponse}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className={styles.noReg}>
          <span className={styles.register}>Register to add your friends</span>
        </div>
      );
    }
  }
};
