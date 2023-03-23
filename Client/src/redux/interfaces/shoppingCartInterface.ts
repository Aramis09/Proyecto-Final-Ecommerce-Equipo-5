export interface shoppingCartReducerState{
    listProductsShoppingCartUser: Array<object>,
    totalAmount: number, 
    successMsg: string,
    errorMsg: string,
    listProductsShoppingCartGuest: Array<object>,
    emptyUserDBShoppingCart: boolean,
    finalPriceForCheckout: number,
}