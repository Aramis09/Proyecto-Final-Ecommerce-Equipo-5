import { DashboardNav } from "./Nav/DashboardNav";
import styles from "./Dashboard.module.css"
import NavbarPhone from "../../phone/navBarPhone/navBarPhone";
import { NavBar } from "../NavBar/NavBar";

export const Dashboard = () => {
  return (
    <section className={styles.container}>
      <DashboardNav />
    </section>
  );
};
