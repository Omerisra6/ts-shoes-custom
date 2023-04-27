import { Product } from "../../products.js"
import { getCartProductsCount, getSavedProducts } from "../../db-handlers.js"
import { _ } from "../../helpers.js"
import { NoSavedMessage } from "../../view-components/no-saved-products-message.js"
import { ProductView } from "../../view-components/product-view.js"

export function updateSavedProductsList()
{
    const savedProdtctsListElement = _( '.saved-products-list' )    
    const savedProductList         = getSavedProducts()
    
    if ( ! savedProdtctsListElement ) 
    {
        return
    }

    savedProdtctsListElement.innerHTML = ''

    if ( savedProductList.length === 0 ) 
    {
        const noSavedElement = NoSavedMessage()
        savedProdtctsListElement.append( noSavedElement )
        return
    }

    savedProductList.forEach( ( product ) => {
        
        savedProdtctsListElement.append( ProductView( product ) )
    })
}

export function updateCartProductsCount()
{
    const cartProductsCount = _( '.cart-products-count' )    
    if ( ! cartProductsCount ) 
    {
        return
    }

    cartProductsCount.innerHTML = getCartProductsCount().toString()
}

export function attachListenersToProductView( productViewElement: HTMLDivElement, product: Product )
{
    productViewElement.addEventListener( 'click', () => navigateToProduct( product ) ) 

    const productObject = productViewElement.querySelector<HTMLObjectElement>( 'object' )

    productObject?.addEventListener( 'load', () => { attachListenersToViewSvg( productObject, product ) } )
}

function navigateToProduct( product: Product )
{
    const productUrl      = `/?id=${ product.id }`
    window.location.href  = productUrl
}

function attachListenersToViewSvg( productObject: HTMLObjectElement, product: Product )
{
    const productSvgDocument = productObject.contentDocument
    const productSvg = productSvgDocument?.querySelector( 'svg' )
    if ( ! productSvg ) 
    {
        return
    }

    productSvg.style.cursor = 'pointer'
    productSvg.addEventListener( 'click', () => navigateToProduct( product ) )
}