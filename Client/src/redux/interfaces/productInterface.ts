export interface productReducerState{
    //all: Array<object>,
    searchObject: object
    details: object,
    carouselData: Array<object>,
    searchedData: Array<object>,
    topProductsData: Array<object>,
    searchedName: string,
    selectedFilterGenreData: Array<object>,
    selectedFilterPlatformData: Array<object>,
    selectedFilterPriceRangeData: Array<number>,
    selectedAlphabeticOrderData: string,
    selectedPriceOrderData: string, 
    successMsg: string,
    errorMsg: string
}