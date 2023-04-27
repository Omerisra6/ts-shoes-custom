import { CartProduct, Product, productList } from "./products.js"
import { addCartProductToStorage, addProductToStorage, removeCartProductFromStorage, removeProductFromStorage, updateCartProductInStorage } from "./localstorage.js"

export let totalPrice = getTotalPrice()

export const getProduct = ( id: string ) => {

    return productList.find( ( product: Product ) => { return product.id == id  })
}

export const getSavedProduct = ( id: string ) => {

    const savedProductStorage = localStorage.getItem( 'saved_products' )
    const savedProductList    = savedProductStorage ? JSON.parse( savedProductStorage ) : []

    return savedProductList.find( ( product: Product ) => { return product.id === id } )
}

export const searchProducts = ( searchVal: string ): Array< Product > => {

    return productList.filter( ( product ) => {
        
        return Object.values( product ).some( ( productAttribute ) => {

            if ( typeof productAttribute !== 'string' ) 
            {
                return false    
            }
            
            return productAttribute.includes( searchVal ) 
        } )  
    })
}

export const getCartProducts = () => {

    const cartProductStorage = localStorage.getItem( 'cart_products' )
    const cartProductList    = cartProductStorage ? JSON.parse( cartProductStorage ) : []

    if ( ! ( cartProductList instanceof Array< CartProduct > ) ) 
    {
        return []  
    }

    return cartProductList
}

export const getCartProductsCount = (): number => 
{
    const cartProductsArray = getCartProducts()    
    const QuantityArray     = cartProductsArray.map( ( cartProduct ) => { return cartProduct.quantity ?? 1 } )

    return QuantityArray.reduce( ( acc: number, val: number ) => acc + val, 0 );
}

export const getSavedProducts = () => {

    const savedProductStorage = localStorage.getItem( 'saved_products' )
    const savedProductList    = savedProductStorage ? JSON.parse( savedProductStorage ) : []

    if ( ! ( savedProductList instanceof Array< CartProduct > ) ) 
    {
        return []  
    }
    
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

function getTotalPrice( )
{
    const cartProductsStorage = localStorage.getItem( 'cart_products' )
    const productsArray       = cartProductsStorage ? JSON.parse( cartProductsStorage ) : []
    
    return productsArray.reduce( ( sum: number, cartProduct: CartProduct ) => {
        
        const productQuantity = cartProduct.quantity ?? 1
        sum += productQuantity * cartProduct.price        
        
        return sum
    }, 0)
}