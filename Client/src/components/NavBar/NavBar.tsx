import { Link } from "react-router-dom";
import { eraseSearchedData } from "../../redux/reducer/productReducer";
import { useAppDispatch } from "../../redux/hooks/hooks";
import style from "./NavBar.module.scss";
import { SearchBar } from "../SearchBar/SearchBar";
import { ShoppingCart } from '../../components/ShoppingCart/ShoppingCart';
import icon from "../../assets/joystick_icon.png";

export const NavBar = () => {

  const dispatch = useAppDispatch()

  const eraseSearch = () => {
    dispatch(eraseSearchedData())
  }

  return (
		<div className={style.mainContainer}>
			<nav>
				<ul className={style.listContainer}>
					<li>
						<Link to='/'>
							<img src={icon} alt='joystick_icon' onClick={eraseSearch} />
						</Link>
					</li>
					<li>
						<SearchBar />
					</li>
					<li>
						<ShoppingCart />
					</li>
					<li>
						<button className={style.loginButton}>LOGIN</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};
