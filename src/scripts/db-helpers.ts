import { Product, productList } from "../products.js"

export const getProduct: Function = ( id: string ): Product => {

    return productList.find( ( product: Product ) => { return product.id == id  }) as Product
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