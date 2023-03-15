import { DashboardNav } from "./Nav/DashboardNav";
import styles from "./Dashboard.module.css"

export const Dashboard = () => {
  return (
    <section className={styles.container}>
      <DashboardNav />
    </section>
  );
};
