import { ShoppingCart } from "../ShoppingCart/ShoppingCart";
import styles from "./SubNavbar.module.scss";
const SubNavbar = () => {
    return (
        <div className={styles.container}>
            <ShoppingCart/>
        </div>
    );
};
export default SubNavbar;