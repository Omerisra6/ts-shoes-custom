
export const NoSavedMessage = ( ) => {

    const noSavedElement = document.createElement( "span" )
    noSavedElement.classList.add( 'no-saved-message' )

    noSavedElement.innerHTML = `No saved products`
    return noSavedElement
}