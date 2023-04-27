import { CartProduct, Product } from "./products.js";
import { getIndexByKey } from "./helpers.js";

export function addProductToStorage( newProduct: Product )
{
    const productsStorage = localStorage.getItem( 'saved_products' )
    const productsArray   = ! productsStorage ? [] : JSON.parse( productsStorage ) 
    productsArray.push( newProduct )    

    localStorage.setItem( 'saved_products', JSON.stringify( productsArray ) )

    return newProduct
}

export function addCartProductToStorage( newProduct: CartProduct )
{
    const cartProductsStorage = localStorage.getItem( 'cart_products' )
    const productsArray       = ! cartProductsStorage ? [] : JSON.parse( cartProductsStorage ) 

    const sameCustomCount = getSameCustomCount( productsArray, newProduct )
    if ( sameCustomCount > 0 ) 
    {        
        removeExistingCartProduct( productsArray, newProduct )
    }
    
    newProduct.quantity = sameCustomCount + 1

    productsArray.push( newProduct )    
    
    localStorage.setItem( 'cart_products', JSON.stringify( productsArray ) )

    return newProduct
}

export function removeProductFromStorage( productId: string )
{
    const productsStorage = localStorage.getItem( 'saved_products' )
    const productsArray   = productsStorage ? JSON.parse( productsStorage ) : []
    const productIndex    = getIndexByKey( productsArray, 'id', productId )
    const deletedProduct  = productsArray[ productIndex ]

    productsArray.splice( productIndex, 1 )
    localStorage.setItem( 'saved_products', JSON.stringify( productsArray ) )

    return deletedProduct
}

export function removeCartProductFromStorage( cartProductCustom: string)
{
    const cartProductsStorage = localStorage.getItem( 'cart_products' )
    const productsArray       = cartProductsStorage ? JSON.parse( cartProductsStorage ) : []
    const productIndex        = getIndexByKey( productsArray, 'customization', cartProductCustom )
    const deletedCartProduct  = productsArray[ productIndex ]

    productsArray.splice( productIndex, 1 )

    localStorage.setItem( 'cart_products', JSON.stringify( productsArray ) )

    return deletedCartProduct
}

export function updateCartProductInStorage( updatedCartProduct: CartProduct ) 
{
    const cartProductsStorage = localStorage.getItem( 'cart_products' )
    const productsArray       = cartProductsStorage ? JSON.parse( cartProductsStorage ) : []

    const updatedProductsArray = productsArray.map( ( cartProduct: CartProduct ) => {

        if ( cartProduct.customization === updatedCartProduct.customization ) 
        {
            return updatedCartProduct
        }

        return cartProduct
    })

    localStorage.setItem( 'cart_products', JSON.stringify( updatedProductsArray ) )
}

function removeExistingCartProduct( cartProductsArray: Array< CartProduct >, newProduct: CartProduct ) 
{
    const productIndex = getIndexByKey( cartProductsArray, 'customization', newProduct.customization )
    cartProductsArray.splice( productIndex, 1 )
}

function getSameCustomCount( productsArray: Array< CartProduct >, newProduct: CartProduct ): number
{
    return productsArray.reduce( ( quantity, cartProduct ) => {

        if ( cartProduct.customization === newProduct.customization && !! quantity ) 
        {
            quantity = quantity ?? cartProduct.quantity
        }

        return quantity
    }, 0)
}