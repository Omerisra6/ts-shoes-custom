import { AppProductsPath } from "../../constants.js";
import { Product } from "../../products.js"
import { getSavedProduct } from "../../db-handlers.js";
import { getElementLabel, _, _A, selectFirstInput } from "../../helpers.js"
import { attachListenersToStartOver, attachListenersToSvgPaths } from "./product-customize-listeners.js";
import { setCurrentProduct } from "./product-customize.js"

export function loadProduct( product: Product|undefined )
{   
    if ( ! product ) 
    {
        return
    }    

    const { id, name, svgFileName }  = product
    const productView                = _( '.product' )
    const productName                = _( '.product-name' )
    const productSvgObject           = _<HTMLObjectElement>( '#product-svg' )

    if ( ! productView || ! productName || ! productSvgObject ) 
    {
        return
    }

    productView.dataset.productId = id
    productName.innerHTML         = name
    productSvgObject.data         = AppProductsPath + svgFileName

    setCurrentProduct( product )

    const isProductSaved = getSavedProduct( product.id ) !== undefined
    toggleSaveProductButtonView( isProductSaved )
    attachListenersToProduct()
}

function attachListenersToProduct()
{
    _( "#product-svg" )?.addEventListener( "load", function(){

        const productSvgObject = _<HTMLObjectElement>( '#product-svg' )!
        const productSvg       = productSvgObject?.contentDocument;
        const paths            = productSvg?.querySelectorAll( 'path' )!    

        attachListenersToSvgPaths( paths )
        attachListenersToStartOver( paths )       
    })
}

export function toggleSaveProductButtonView( isSaved: boolean )
{
    const saveProductButton = _( '.save-product-button' )
    const saveProductText   = _( '.save-product-text' )
    if ( ! saveProductButton || ! saveProductText ) 
    {
        return    
    }
    
    saveProductButton.classList.toggle( 'product-saved', isSaved )
    saveProductText.innerHTML = isSaved ? 'UNSAVE' : 'SAVE'
}

export function checkSelectedColor()
{
    const colorContainers    = _A( '.color-selector-input' )
    const selectedColorInput = _( 'input[name="color"]:checked' )
    
    colorContainers.forEach( ( colorContainer ) => { 

        const inputLabel = getElementLabel( colorContainer )            
        inputLabel?.classList.remove( 'checked' )
    })
    
    const selectedInputLabel = _( `label[for='${selectedColorInput?.id}']` )
    selectedInputLabel?.classList.add( 'checked' )
}

export function toggleColorMenu( event: Event )
{
    if ( ! ( event.currentTarget instanceof HTMLDivElement ) ) 
    { 
        return
    }

    const currentOption = event.currentTarget
    const colorMenu     = _( '.color-types-list' )
    if ( ! colorMenu ) 
    {
        return    
    }

    const colorOptions = [ ...colorMenu.children  ]

    colorOptions.forEach( ( colorOption ) => {

        if ( ! ( colorOption  instanceof HTMLDivElement ) ) 
        {
            return    
        }

        setOptionView( colorOption, currentOption )
    })    
}

function setOptionView( colorOption: HTMLDivElement, currentOption: HTMLDivElement )
{
    const isSelectedOption = colorOption == currentOption 
    colorOption.classList.toggle( 'selected-color-option', isSelectedOption )

    const colorOptionId    = colorOption.id
    const colorOptionField = _( `div[for="${ colorOptionId }"]` )
    
    colorOptionField?.classList.toggle( 'none', ! isSelectedOption )

    if ( ! isSelectedOption || ! colorOptionField ) 
    {
        return
    }

    selectFirstInput( colorOptionField )
    checkSelectedColor()
}

export function selectFirstColorInput( ) 
{
    const firstColorList = _( '[for="solid-colors-option"]')    
    if ( ! firstColorList ) 
    {
        return    
    }
    
    selectFirstInput( firstColorList )
}
