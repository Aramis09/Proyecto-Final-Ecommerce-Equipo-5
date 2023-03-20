import styles from "./Card.module.css";

export const Cards = ({ friend, index }: any | number) => {
    return (
			<div className={styles.card} key={index}>
				<h4>{friend.FriendInListEmail}</h4>
			</div>
		);
};