import { CartProduct, Product } from "../products.js";
import { getIndexByKey } from "./helpers.js";

export function setLocalStorage( lcnName: string, lcValue: any ) 
{    
    localStorage.setItem( lcnName, lcValue )
}

export function getLocalStorage( lcName: string ) :any
{
   return localStorage.getItem( lcName )
}

export function addProductToStorage( newProduct: Product )
{
    const productsStorage: string         = getLocalStorage( 'saved_products' )
    const productsArray: Array< Product > = ! productsStorage ? [] : JSON.parse( productsStorage ) 
    productsArray.push( newProduct )    

    setLocalStorage( 'saved_products', JSON.stringify( productsArray ) )

    return newProduct
}

export function addCartProductToStorage( newProduct: CartProduct )
{
    const cartProductsStorage: string             = getLocalStorage( 'cart_products' )
    const productsArray: Array< CartProduct >     = ! cartProductsStorage ? [] : JSON.parse( cartProductsStorage ) 

    const sameCustomCount: number = getSameCustomCount( productsArray, newProduct )
    if ( sameCustomCount > 0 ) 
    {        
        removeExistingCartProduct( productsArray, newProduct )
    }
    
    newProduct.quantity = sameCustomCount + 1

    productsArray.push( newProduct )    
    
    setLocalStorage( 'cart_products', JSON.stringify( productsArray ) )

    return newProduct
}

export function removeProductFromStorage( productId: string )
{
    const productsStorage: string          = getLocalStorage( 'saved_products' )
    const productsArray: Array< Product >  = productsStorage ? JSON.parse( productsStorage ) : []
    const productIndex: number             = getIndexByKey( productsArray, 'id', productId )
    const deletedProduct: Product          = productsArray[ productIndex ]

    productsArray.splice( productIndex, 1 )
    setLocalStorage( 'saved_products', JSON.stringify( productsArray ) )

    return deletedProduct
}

export function removeCartProductFromStorage( cartProductCustom: string)
{
    const cartProductsStorage: string           = getLocalStorage( 'cart_products' )
    const productsArray: Array< CartProduct >   = cartProductsStorage ? JSON.parse( cartProductsStorage ) : []
    const productIndex: number                  = getIndexByKey( productsArray, 'customization', cartProductCustom )
    const deletedCartProduct: CartProduct       = productsArray[ productIndex ]

    productsArray.splice( productIndex, 1 )

    setLocalStorage( 'cart_products', JSON.stringify( productsArray ) )

    return deletedCartProduct
}

export function updateCartProductInStorage( updatedCartProduct: CartProduct ) 
{
    const cartProductsStorage: string           = getLocalStorage( 'cart_products' )
    const productsArray: Array< CartProduct >   = cartProductsStorage ? JSON.parse( cartProductsStorage ) : []

    const updatedProductsArray = productsArray.map( ( cartProduct: CartProduct ) => {

        if ( cartProduct.customization === updatedCartProduct.customization ) 
        {
            return updatedCartProduct
        }

        return cartProduct
    })

    setLocalStorage( 'cart_products', JSON.stringify( updatedProductsArray ) )
}

function removeExistingCartProduct( cartProductsArray: Array< CartProduct >, newProduct: CartProduct ) 
{
    const productIndex: number    = getIndexByKey( cartProductsArray, 'customization', newProduct.customization )
    cartProductsArray.splice( productIndex, 1 )
}

function getSameCustomCount( productsArray: Array< CartProduct >, newProduct: CartProduct ): number
{
    return productsArray.reduce( ( quantity: number, cartProduct: CartProduct ) => {

        if ( cartProduct.customization === newProduct.customization ) 
        {
            quantity = cartProduct.quantity
        }

        return quantity
    }, 0)
}