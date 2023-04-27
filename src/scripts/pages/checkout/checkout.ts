import { CartProduct } from "../../products.js";
import { attachHeaedrListeners } from "../../components/header/header.js";
import { getCartProducts, totalPrice } from "../../db-handlers.js";
import { _ } from "../../helpers.js";
import { CartProductView } from "../../view-components/cart-product.js";
import { NoProductsError } from "../../view-components/no-products-error.js";

const productsContainer: HTMLDivElement   = _( '.cart-products-container' )
const totalPriceContainer: HTMLDivElement = _( '.total-number' )

attachHeaedrListeners()
renderCartProducts()
updateTotalPrice()

function renderCartProducts(): void 
{
    const cartProducts: Array< CartProduct > = getCartProducts()    
    
    if ( cartProducts.length === 0 ) 
    {   
        productsContainer.appendChild( NoProductsError() )
        return
    }

    cartProducts.forEach( ( product ) => {

        productsContainer.appendChild( CartProductView( product ) )
    })
}

export function updateTotalPrice()
{    
    totalPriceContainer.innerHTML = `$${ totalPrice }.00`
}