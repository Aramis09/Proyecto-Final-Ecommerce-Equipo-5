import style from './ShoppingCartModal.module.css';

export const ShoppingCartModal = () => {
    return (
        <>
            <div className={style.modalContainer} >
                <p>IMAGEN</p>
                <p>NOMBRE PRODUCTO</p>
                <p>PRECIO PRODUCTO</p>
                <p>VALOR TOTAL</p>
                <button>COMPRAR</button>
            </div>
        </>
    )
}