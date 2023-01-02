
export const NoSavedMessage = ( ): HTMLSpanElement => {

    const noSavedElement: HTMLSpanElement = document.createElement( "span" )
    noSavedElement.classList.add( 'no-saved-message' )

    noSavedElement.innerHTML = `No saved products`

    return noSavedElement
}