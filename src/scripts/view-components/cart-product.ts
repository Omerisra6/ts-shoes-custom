import { CartProduct } from "../products.js";
import { updateCartProductsCount } from "../components/header/header-helpers.js";
import { removeCartProduct, updateCartProduct } from "../db-handlers.js";
import { adjustQuantityValue } from "../helpers.js";
import { updateTotalPrice } from "../pages/checkout/checkout.js";

export const CartProductView = ( cartProduct: CartProduct ): HTMLDivElement => {
    
    const cartProductElement = document.createElement( 'div' )
    cartProductElement.classList.add( 'cart-product' )

    cartProductElement.innerHTML = 
    `<div class="cart-product-details-container">

        <object class="cart-product-image" id="product-svg" type="image/svg+xml">${ cartProduct.customization }</object>

        <div class="cart-product-details">

            <div class="cart-product-type">Shoes</div>
            <div class="cart-product-title">${ cartProduct.name }</div>
            
            <div class="cart-product-sku-and-brand-container">

                <div class="cart-product-sku-container">

                    <span class="sku-text">SKU:</span>
                    <span class="sku">${ cartProduct.id }</span>

                </div>

                <div class="cart-product-brand-container">

                    <span class="brand-text">Brand:</span>
                    <span class="brand">${ cartProduct.company }</span>

                </div>

            </div>

            <div class="free-shipping-container">

                <span class="free-shipping-text">Free Shipping</span>
                <span class="free-shipping-icon material-icons md-icon">local_shipping</span>

            </div>
        </div>


    </div>

    <div class="cart-product-quantity-and-price">

            
        <div class="quantity-control">
            <button class="quantity-btn minus-quntity-button"><svg viewBox="0 0 409.6 409.6">
                <g>
                <g>
                    <path d="M392.533,187.733H17.067C7.641,187.733,0,195.374,0,204.8s7.641,17.067,17.067,17.067h375.467 c9.426,0,17.067-7.641,17.067-17.067S401.959,187.733,392.533,187.733z" />
                </g>
                </g>
            </svg></button>
            <input type="number" class="quantity-input" value="${ cartProduct.quantity ?? 1 }" step="1" min="1" max="" name="quantity" readonly>
            <button class="quantity-btn  plus-quntity-button"><svg viewBox="0 0 426.66667 426.66667">
                <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0" /></svg>
            </button>
        </div>
            
        
        <div class="cart-product-price-container">
            <div class="compare-at-price ${ ! cartProduct.compareAtPrice && 'none' }">$${ cartProduct.compareAtPrice ?? '' }.00</div>
            <div class="price">$${ cartProduct.price }.00</div>
        </div>
    </div>`

    attachListenersToProductQuantity( cartProductElement, cartProduct )

    return cartProductElement
}

function attachListenersToProductQuantity( cartProductElement: HTMLDivElement, cartProduct: CartProduct) 
{
    attachListenerToMinusButton( cartProductElement, cartProduct )    
    attachListenerToPlusButton( cartProductElement, cartProduct )
}

function attachListenerToMinusButton( cartProductElement: HTMLDivElement, cartProduct: CartProduct ) 
{
    const cartProductQuantityInput = cartProductElement.querySelector( '.quantity-input' ) as HTMLInputElement
    const cartProductQuantityMinus = cartProductElement.querySelector( '.minus-quntity-button' )

    cartProductQuantityMinus.addEventListener( 'click', () => { 

        if ( cartProductQuantityInput.value === '1' ) 
        {   
            removeCartProductElement( cartProduct, cartProductElement )
            updateTotalPrice()
            updateCartProductsCount()
            return
        }

        adjustQuantityValue( cartProductQuantityInput, -1  )
        cartProduct.quantity = parseInt( cartProductQuantityInput.value )
        updateCartProduct( cartProduct )
        updateTotalPrice()
        updateCartProductsCount()
    })
}

function attachListenerToPlusButton( cartProductElement: HTMLDivElement, cartProduct: CartProduct ) 
{
    const cartProductQuantityInput = cartProductElement.querySelector( '.quantity-input' ) as HTMLInputElement
    const cartProductQuantityPlus  = cartProductElement.querySelector( '.plus-quntity-button' )

    cartProductQuantityPlus.addEventListener( 'click', () => { 

        adjustQuantityValue( cartProductQuantityInput, 1  ) 
        cartProduct.quantity = parseInt( cartProductQuantityInput.value )
        updateCartProduct( cartProduct )
        updateTotalPrice()
        updateCartProductsCount()
    })
}

function removeCartProductElement( cartProduct: CartProduct, cartProductElement: HTMLDivElement ) 
{
    cartProductElement.remove()
    removeCartProduct( cartProduct.customization )
}