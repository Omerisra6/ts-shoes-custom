export const NoProductsError = (): HTMLDivElement => {

    const noProductsErrorElement = document.createElement( 'div' )
    noProductsErrorElement.classList.add( 'no-products-error' )

    noProductsErrorElement.innerHTML = 'No Products Found'
    return noProductsErrorElement
}
