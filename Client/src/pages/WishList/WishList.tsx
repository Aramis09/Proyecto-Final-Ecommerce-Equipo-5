import { NavBar } from "../../components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { deleteItem } from "../../redux/actions/wishListAction";
import { useAuth0 } from "@auth0/auth0-react";
import { Card } from "../../components/Card/Card";
import style from './WishList.module.css';

export const WishList = () => {

    const wishListItems = useAppSelector(state => state.wishListReducer.wishListItems);
    const dispatch = useAppDispatch();
    const { user } = useAuth0();

    const deleteItemFromList = (id: string) => {
        dispatch(deleteItem(id));
    };

    return (
        <>
            <NavBar />
            <div className={style.mainContainer}>
                {
                    wishListItems.length > 0
                        ? wishListItems.map((el: any, index: number) => {
                            return (
                                <div className={style.itemsContainer}>
                                    <Card
                                        key={index}
                                        id={el.id}
                                        name={el.name}
                                        background_image={el.background_image}
                                        price={el.price} />
                                    <button
                                        className={style.deleteButton}
                                        onClick={ev => deleteItemFromList(el.id)}>
                                        X
                                    </button>
                                </div>
                            );
                        })
                        : <h3 className={style.msgListEmpty}>Your Wish List is empty</h3>
                }
            </div>
        </>
    );
};