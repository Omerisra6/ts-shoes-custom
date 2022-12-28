import { Product  } from "../../products.js";
import { searchProducts } from "../db-helpers.js";
import { debounce, _  } from "../helpers.js"; 
import { productView } from "../view-components/search-result.js";

const resultsContainer: HTMLDivElement = _( '.search-results-container' )!
const searchProductInput: HTMLInputElement = _( '.search-product-input' )!

export function attachHeaedrListeners( )
{
    searchProductInput.addEventListener( 'keyup', debounce( () => { searchInputOnChange() } ) )
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
        resultsContainer.innerHTML = '<div class="no-products-text">No products found<div>'
        return
    }

    searchResults.forEach( ( result: Product ) => {

        resultsContainer.appendChild( productView( result ) )
    })
}

