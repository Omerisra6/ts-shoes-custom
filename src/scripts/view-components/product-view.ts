import { attachListenersToProductView } from "../components/header/header-helpers.js"
import { AppProductsPath } from "../constants.js"
import { Product } from "../products.js"

export const ProductView = ( product: Product ) => {

    const productViewElement = document.createElement( "div" )
    
    productViewElement.classList.add( 'product-view' )
    productViewElement.dataset.resultId = product.id

    productViewElement.innerHTML = `
        <object class="product-view-image" data="${ AppProductsPath + product.svgFileName }" type="image/svg+xml"></object>
        
        <div class="product-view-name-and-company">

            <div class="product-view-name">${ product.name }</div>
            <div class="product-view-company">${ product.company }</div>
            
        </div>

        <span class="material-icons xs-icon choose-product-icon">arrow_forward_ios</span>
    `

    attachListenersToProductView( productViewElement, product )

    return productViewElement
}