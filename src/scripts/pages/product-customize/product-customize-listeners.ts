import { updateCartProductsCount, updateSavedProductsList } from "../../components/header/header-helpers.js"
import { addCartProduct, addProduct, getSavedProduct, removeSavedProduct } from "../../db-handlers.js"
import { _, _A, getSVGFromObject, getSvgPathFillColors } from "../../helpers.js"
import { currentProduct } from "./product-customize.js"
import { checkSelectedColor, toggleColorMenu, toggleSaveProductButtonView } from "./product-customize-helpers.js"

export function attachListenersToSaveProduct(  ) 
{
    const saveProductButton = _( '.save-product-button' )

    saveProductButton?.addEventListener( 'click', () => { 

        const savedProduct = getSavedProduct( currentProduct.id )

        if ( savedProduct !== undefined ) 
        {            
            removeSavedProduct( currentProduct.id )
            toggleSaveProductButtonView( false )
            updateSavedProductsList()
            return
        }

        addProduct( currentProduct )     
        toggleSaveProductButtonView( true )
        updateSavedProductsList()
    })
}

export function attachListenersToColorContainers()
{
    const colorContainers = _A( '.color-selector-input' )! 

    colorContainers.forEach( ( colorContainer ) => {

        colorContainer.addEventListener( 'click', ( event ) => {
    
            if ( ! ( event.currentTarget instanceof HTMLInputElement ) )
            {   
                return
            }

            checkSelectedColor()
        })
    })
}

export function attachListenersToCartButton()
{
    const addToCartButton = _( '.add-to-bag-button' )
    if ( ! addToCartButton ) 
    {
        return
    }

    addToCartButton.addEventListener( 'click', () =>{

        const productSvgObject = _<HTMLObjectElement>( '#product-svg' )
        if ( ! productSvgObject ) 
        {
            return
        }

        const productSvg       = getSVGFromObject( productSvgObject )
        const productSvgString = productSvg?.outerHTML 
        if ( ! productSvgString ) 
        {
            return
        }

        const productWithCustomize =  
        {
            ...currentProduct,
            customization: productSvgString,
        }

        addCartProduct( productWithCustomize )
        updateCartProductsCount()
    })
}

export function attachListenersToColorOptions()
{
    const colorMenu  = _( '.color-types-list' )
    if ( ! colorMenu  ) 
    {
        return
    }
    
    const colorOptions = [ ...colorMenu.children ]
    colorOptions.forEach( ( colorOption ) => {

        colorOption.addEventListener( 'click', ( e ) => { toggleColorMenu( e ) })
    })
}

export function attachListenersToOwnColorLabel()
{
    const ownColorLabel = _( '.own-color-label' )
    const ownColorInput = _( '.own-color-input' )

    ownColorLabel?.addEventListener( 'click', () => { ownColorInput?.click() })
}

export function attachListenersToOwnColorInput()
{
    const ownColorLabel      = _<HTMLLabelElement>( '.own-color-label' )
    const ownColorInput      = _<HTMLInputElement>( '.own-color-input' )
    const ownColorRadioInput = _<HTMLInputElement>( '.own-radio-input' )

    if ( ! ownColorLabel || ! ownColorInput || ! ownColorRadioInput) 
    {
        return    
    }
    
    ownColorInput?.addEventListener( 'change', () => {

        ownColorRadioInput.value            = ownColorInput?.value 
        ownColorRadioInput.id               = ownColorInput?.value 
        ownColorLabel.htmlFor               = ownColorInput?.value 
        ownColorLabel.style.backgroundColor = ownColorInput?.value
     })    
}

export function attachListenersToSvgPaths( paths: NodeListOf<SVGPathElement> )
{
    paths.forEach( ( path ) =>{

        path.addEventListener( 'click', () => {

            let selectedColorInput = _<HTMLInputElement>( 'input[name="color"]:checked' )!
            path.setAttribute( 'style', `fill: ${ selectedColorInput?.value }` )
        })
    });
}

export function attachListenersToStartOver( paths: NodeListOf<SVGPathElement> )
{
    const startOverIcon       = _( '.start-over-icon' )!
    const pathOriginalColors  = getSvgPathFillColors( paths )

    startOverIcon.addEventListener( 'click', () => {

        restartPathFillColors( paths, pathOriginalColors )
    })
}

function restartPathFillColors( paths: NodeListOf<SVGPathElement>, pathOriginalColors: Array< string > )
{
    paths?.forEach( ( path: SVGPathElement, index: number ) => {

        path.setAttribute( 'style', `fill: ${ pathOriginalColors[ index ] }` )
    });
}
