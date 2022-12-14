import { Product  } from "../../products.js";
import { searchProducts } from "../db-helpers.js";
import { debounce, _  } from "../helpers.js"; 
import { NoProductsMessage } from "../view-components/no-product-found-message.js";
import { ProductView } from "../view-components/product-view.js";
import { updateCartProductsCount, updateSavedProductsList } from "./header-helpers.js";

const resultsContainer: HTMLDivElement     = _( '.search-results-container' )!
const searchProductInput: HTMLInputElement = _( '.search-product-input' )!

export function attachHeaedrListeners( )
{
    searchProductInput.addEventListener( 'keyup', debounce( () => { searchInputOnChange() } ) )
    updateSavedProductsList()
    updateCartProductsCount()
}

function searchInputOnChange() 
{
    const searchVal: string = searchProductInput.value    
    if ( ! searchVal )
    {
        resultsContainer.classList.add( 'invisible' )
        return
    }

    appendSearchResults( searchProducts( searchVal ) )
}

function appendSearchResults( searchResults: Array< Product > )
{    
    resultsContainer.innerHTML = ''
    resultsContainer.classList.remove( 'invisible' )

    if( searchResults.length === 0 )
    {
        const noProductsElement: HTMLDivElement = NoProductsMessage()
        resultsContainer.append( noProductsElement ) 
    }

    searchResults.forEach( ( result: Product ) => {

        resultsContainer.appendChild( ProductView( result ) )
    })
}

