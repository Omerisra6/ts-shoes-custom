import { CartProduct, Product, productList } from "./products.js"
import { addCartProductToStorage, addProductToStorage, getLocalStorage, removeCartProductFromStorage, removeProductFromStorage, updateCartProductInStorage } from "./localstorage.js"

export let totalPrice = getTotalPrice()

export const getProduct: Function = ( id: string ): Product|undefined => {

    return productList.find( ( product: Product ) => { return product.id == id  }) as Product
}

export const getSavedProduct = ( id: string ): Product|undefined => {

    const savedProductStorage: string            = getLocalStorage( 'saved_products' )
    const savedProductList: Array< CartProduct > = savedProductStorage ? JSON.parse( savedProductStorage ) : []
    return savedProductList.find( ( product: Product ) => { return product.id === id } )
}

export const searchProducts: Function = ( searchVal: string ): Array< Product > => {

    return productList.filter( ( product: Product ) => {
        
        return Object.values( product ).some( ( productAttribute: any ) => {

            if ( typeof productAttribute !== 'string' ) 
            {
                return false    
            }
            
            return productAttribute.includes( searchVal ) 
        } )  
    }) as Array<Product>
}

export const getCartProducts = (): Array< CartProduct > => {

    const cartProductStorage: string            = getLocalStorage( 'cart_products' )
    const cartProductList: Array< CartProduct > = cartProductStorage ? JSON.parse( cartProductStorage ) : []
    return cartProductList
}

export const getCartProductsCount = (): number => 
{
    const cartProductsArray: Array< CartProduct > = getCartProducts()    
    const QuantityArray: Array< number >          = cartProductsArray.map( ( cartProduct ) => { return cartProduct.quantity ?? 1 } )
    return QuantityArray.reduce( ( acc: number, val: number ) => acc + val, 0 );
}

export const getSavedProducts = (): Array< Product > => {

    const savedProductStorage: string            = getLocalStorage( 'saved_products' )
    const savedProductList: Array< CartProduct > = savedProductStorage ? JSON.parse( savedProductStorage ) : []
    return savedProductList
}

export const removeCartProduct = ( cartProductCustom: string ) => { 

    removeCartProductFromStorage( cartProductCustom ) 
    totalPrice = getTotalPrice()
}

export const removeSavedProduct = ( productId: string ) => { removeProductFromStorage( productId ) }

export const addProduct = ( product: Product ) => addProductToStorage( product )   

export const addCartProduct = ( cartProduct: CartProduct ) => { 

    addCartProductToStorage( cartProduct ) 
    totalPrice = getTotalPrice()
}

export const updateCartProduct = ( cartProduct: CartProduct ) => {
    updateCartProductInStorage( cartProduct )    
    totalPrice = getTotalPrice()
}

function getTotalPrice( ): number
{
    const cartProductsStorage: string           = getLocalStorage( 'cart_products' )
    const productsArray: Array< CartProduct >   = cartProductsStorage ? JSON.parse( cartProductsStorage ) : []
    
    return productsArray.reduce( ( sum: number, cartProduct: CartProduct ) => {
        
        const productQuantity = cartProduct.quantity ?? 1
        sum += productQuantity * cartProduct.price        
        
        return sum
    }, 0)
}