import { Product } from "../products";

export function setCookie( cname: string, cvalue: any, exdays: number ) 
{    
    const d = new Date();
    d.setTime( d.getTime() + ( exdays*24*60*60*1000 ) );
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie( cname: string ) :string
{
    let name = cname + "=";
    let decodedCookie = decodeURIComponent( document.cookie );
    let ca = decodedCookie.split( ';' );
    for( let i = 0; i <ca.length; i++ ) 
    {
        let c = ca[ i ];
        while ( c.charAt(0) == ' ' ) 
        {
            c = c.substring( 1) ;
        }

        if ( c.indexOf(name) == 0 ) 
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function addProductToCookieArray( cname: string, newProduct: Product )
{
    const productsCookie: string = getCookie( cname )

    const productsArray: Array< Product > = ! productsCookie ? [] : JSON.parse( productsCookie ) 
    productsArray.push( newProduct )
        
    setCookie( cname, JSON.stringify( productsArray ), 1 )
}

export function removeProductFromCookieArray( cname: string, producyIndex: number )
{
    const productsCookie: string = getCookie( cname )
    const productsArray: Array< Product > = JSON.parse( productsCookie ) 

    productsArray.splice( producyIndex, 1 )
        
    setCookie( cname, JSON.stringify( productsArray ), 1 )
}

export function findProductIndexInCookieArray( cname: string, searchedProduct: Product): number
{
    const productsCookie: string = getCookie( cname )

    if ( ! productsCookie ) 
    {
        return -1
    }   

    const productsArray: Array< Product > = JSON.parse( productsCookie ) 
    
    return productsArray.findIndex( ( product: Product ) => {
        
        return product.id === searchedProduct.id
    })
}