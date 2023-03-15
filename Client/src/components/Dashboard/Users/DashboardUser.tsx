import { DashboardNav } from "../Nav/DashboardNav";
import { usersExample } from "../userExample";
import styles from './DashboardUsers.module.css'

export const DashboardUser = () => {
  return (
    <>
      <DashboardNav />
      <section className={styles['user-container']}>
        <h3>Users</h3>
        <div className={styles['user-info'] }>
          <p>id</p>
          <p>name</p>
          <p>email</p>
          <p>Admin</p>
        </div>
        {usersExample.map(({ id, name, email, admin }) => (
          <div className={styles['user-items']} key={id}>
            <p>{id}</p>
            <p>{name}</p>
            <p>{email}</p>
            <p>{admin}</p>
          </div>
        ))}
      </section>
    </>
  );
};
