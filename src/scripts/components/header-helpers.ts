import { Product } from "../../products.js"
import { getCookie, _ } from "../helpers.js"
import { NoSavedMessage } from "../view-components/no-saved-products-message.js"
import { ProductView } from "../view-components/product-view.js"

export function updateSavedProductsList(): void
{
    const savedProdtctsListElement: HTMLDivElement  = _( '.saved-products-list' )    
    const savedProductsCookie: string               = getCookie( 'saved_products' )
    const savedProductList: Array< Product >        = savedProductsCookie ? JSON.parse( savedProductsCookie ) : []
    savedProdtctsListElement.innerHTML              = ''

    if ( savedProductList.length === 0 ) 
    {
        const noSavedElement: HTMLSpanElement = NoSavedMessage()
        savedProdtctsListElement.append( noSavedElement )
        return
    }

    savedProductList.forEach( ( product: Product ) => {

        const productViewElement: HTMLDivElement = ProductView( product )
        savedProdtctsListElement.append( productViewElement )
    })
}

export function updateCartProductsCount(): void
{
    const cartProductsCount: HTMLDivElement  = _( '.cart-products-count' )    
    const cartProductCookie: string          = getCookie( 'cart_products' )
    const cartProductList: Array< Product >  = cartProductCookie ? JSON.parse( cartProductCookie ) : []
    cartProductsCount.innerHTML              = cartProductList.length.toString()
}

