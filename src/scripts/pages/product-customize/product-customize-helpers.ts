import { Product } from "../../../products.js"
import { findProductIndexInCookieArray, getElementLabel, selectFirstInput, _, _A } from "../../helpers.js"
import { currentProduct } from "./product-customize.js"

export function loadProduct( product: Product ):void
{
    const { id, company, name, svgFileName }       = product
    const productView: HTMLDivElement              = _( '.product' )!
    const productName: HTMLElement                 = _( '.product-name' )!
    const productSvgObject: HTMLObjectElement      = _( '#product-svg' )!

    productView.dataset.productId = id
    productName.innerHTML = name
    productSvgObject.data = 'src/assets/products/' + svgFileName

    currentProduct.id = id
    currentProduct.company = company
    currentProduct.name = name
    currentProduct.svgFileName = svgFileName
    
    const isProductSaved: boolean = findProductIndexInCookieArray( 'saved_products', product ) !== -1
    toggleSaveProductButtonView( isProductSaved )
    attachListenersToProduct()
}

function attachListenersToProduct(): void
{
    _( "#product-svg" )?.addEventListener( "load", function(){

        const productSvgObject: HTMLObjectElement      = _( '#product-svg' )!
        const startOverIcon: HTMLElement               = _( '.start-over-icon' )!
        const productSvg                               = productSvgObject?.contentDocument;
        const paths: NodeListOf<SVGPathElement>        = productSvg?.querySelectorAll( 'path' )!    
        const pathFillOriginalColors: Array<string>    = [ ...paths ].map( ( path: SVGPathElement ) =>{ return path.getAttribute( 'fill' )! })

        attachDefaultListeners()
    
        function attachDefaultListeners()
        {
            paths?.forEach( ( path: SVGPathElement ) =>{
    
                path.addEventListener( 'click', () => {

                    let selectedColorInput: HTMLInputElement = _( 'input[name="color"]:checked' )!
                    path.setAttribute( 'style', `fill: ${ selectedColorInput?.value }` )
                })
            });
    
            startOverIcon?.addEventListener( 'click', () => {
    
                restartPathFillColors()
            })
        }
    
        function restartPathFillColors()
        {
            paths?.forEach( ( path: SVGPathElement, index: number ) => {
    
                path.setAttribute( 'style', `fill: ${pathFillOriginalColors[ index ]}`  )
            });
        }
        
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

    const currentButton: HTMLDivElement   = ( event.currentTarget as HTMLDivElement )
    const colorMenu: HTMLDivElement       = _( '.color-types-list' )
    const colorOptions: Array< Element > = [ ...colorMenu.children ]

    colorOptions.forEach( ( colorOption: Element ) => {

        const isSelectedOption: boolean = colorOption == currentButton 
        colorOption.classList.toggle( 'selected-color-option', isSelectedOption )

        const colorOptionId: string            = colorOption.id
        const colorOptionField: HTMLDivElement = _( `div[for="${ colorOptionId }"]` )
        
        colorOptionField.classList.toggle( 'none', ! isSelectedOption )

        if ( isSelectedOption ) 
        {
            selectFirstInput( colorOptionField )
            checkSelectedColor()
        }
    })    
}