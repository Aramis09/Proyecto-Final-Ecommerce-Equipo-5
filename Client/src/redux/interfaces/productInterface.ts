import { Game } from "../../types";

export interface productReducerState{
    allProductsData: Game[]
    searchedData: Array<object>,
    details: object,
    topProductsData: Array<object>,
    carouselData: Array<object>,
    searchObject: object
    searchedName: string,
    selectedFilterGenreData: Array<object>,
    selectedFilterPlatformData: Array<object>,
    selectedFilterPriceRangeData: Array<number>,
    selectedAlphabeticOrderData: string,
    selectedPriceOrderData: string,
    todaysDiscount: object,

    discountGloballyApplied: boolean,
    adminDiscount: boolean,
    successMsg: string,
    errorMsg: string
}
