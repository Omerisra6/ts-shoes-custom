import { AppProductsPath } from "../../constants.js";
import { Product } from "../../products.js"
import { getSavedProduct } from "../../db-handlers.js";
import { getElementLabel, _, _A, selectFirstInput } from "../../helpers.js"
import { attachListenersToStartOver, attachListenersToSvgPaths } from "./product-customize-listeners.js";
import { setCurrentProduct } from "./product-customize.js"

export function loadProduct( product: Product ):void
{
    const { id, name, svgFileName }                = product
    const productView: HTMLDivElement              = _( '.product' )!
    const productName: HTMLElement                 = _( '.product-name' )!
    const productSvgObject: HTMLObjectElement      = _( '#product-svg' )!

    productView.dataset.productId = id
    productName.innerHTML         = name
    productSvgObject.data         = AppProductsPath + svgFileName

    setCurrentProduct( product )

    const isProductSaved: boolean = getSavedProduct( product.id ) !== undefined
    toggleSaveProductButtonView( isProductSaved )
    attachListenersToProduct()
}

function attachListenersToProduct(): void
{
    _( "#product-svg" )?.addEventListener( "load", function(){

        const productSvgObject: HTMLObjectElement      = _( '#product-svg' )!
        const productSvg                               = productSvgObject?.contentDocument;
        const paths: NodeListOf<SVGPathElement>        = productSvg?.querySelectorAll( 'path' )!    

        attachListenersToSvgPaths( paths )
        attachListenersToStartOver( paths )       
    })
}

export function toggleSaveProductButtonView( isSaved: boolean ): void
{
    const saveProductButton = _( '.save-product-button' )
    const saveProductText   = _( '.save-product-text' )

    saveProductButton.classList.toggle( 'product-saved', isSaved )
    saveProductText.innerHTML = isSaved ? 'UNSAVE' : 'SAVE'
}

export function checkSelectedColor()
{
    const colorContainers: NodeListOf<HTMLElement> = _A( '.color-selector-input' )! 
    const selectedColorInput: HTMLInputElement     = _( 'input[name="color"]:checked' )!
    
    colorContainers.forEach( ( colorContainer: HTMLElement ) => { 

        const inputLabel = getElementLabel( colorContainer )            
        inputLabel.classList.remove( 'checked' )
    })
    
    const selectedInputLabel = _( `label[for='${selectedColorInput.id}']` )
    selectedInputLabel.classList.add( 'checked' )
}

export function toggleColorMenu( event: Event )
{
    if ( ! ( event.currentTarget instanceof HTMLDivElement ) ) 
    { 
        return
    }

    const currentOption: HTMLDivElement          = ( event.currentTarget as HTMLDivElement )
    const colorMenu: HTMLDivElement              = _( '.color-types-list' )
    const colorOptions: Array< HTMLDivElement >  = [ ...colorMenu.children  ] as Array< HTMLDivElement >

    colorOptions.forEach( ( colorOption: HTMLDivElement ) => {

        setOptionView( colorOption, currentOption )
    })    
}

function setOptionView( colorOption: HTMLDivElement, currentOption: HTMLDivElement )
{
    const isSelectedOption: boolean = colorOption == currentOption 
    colorOption.classList.toggle( 'selected-color-option', isSelectedOption )

    const colorOptionId: string            = colorOption.id
    const colorOptionField: HTMLDivElement = _( `div[for="${ colorOptionId }"]` )
    
    colorOptionField.classList.toggle( 'none', ! isSelectedOption )

    if ( ! isSelectedOption ) 
    {
        return
    }

    selectFirstInput( colorOptionField )
    checkSelectedColor()
}

export function selectFirstColorInput( ) 
{
    const firstColorList: HTMLDivElement = _( '[for="solid-colors-option"]')    
    selectFirstInput( firstColorList )
}
