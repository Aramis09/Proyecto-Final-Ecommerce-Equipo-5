export interface productReducerState{
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
    successMsg: string,
    errorMsg: string
}