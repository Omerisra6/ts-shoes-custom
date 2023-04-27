import { Product } from "../../products.js"
import { getCartProductsCount, getSavedProducts } from "../../db-handlers.js"
import { _ } from "../../helpers.js"
import { NoSavedMessage } from "../../view-components/no-saved-products-message.js"
import { ProductView } from "../../view-components/product-view.js"

export function updateSavedProductsList(): void
{
    const savedProdtctsListElement: HTMLDivElement  = _( '.saved-products-list' )    
    const savedProductList: Array< Product >        = getSavedProducts()
    
    savedProdtctsListElement.innerHTML              = ''

    if ( savedProductList.length === 0 ) 
    {
        const noSavedElement: HTMLSpanElement = NoSavedMessage()
        savedProdtctsListElement.append( noSavedElement )
        return
    }

    savedProductList.forEach( ( product: Product ) => {
        
        savedProdtctsListElement.append( ProductView( product ) )
    })
}

export function updateCartProductsCount(): void
{
    const cartProductsCount: HTMLDivElement  = _( '.cart-products-count' )    
    cartProductsCount.innerHTML              = getCartProductsCount().toString()
}

