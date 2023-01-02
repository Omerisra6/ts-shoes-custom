import { Product } from "../../products.js"
import { findProductIndexInCookieArray, getElementLabel, _, _A } from "../helpers.js"
import { currentProduct } from "./product-customize.js"

export function loadProduct( product: Product ):void
{
    const { id, company, name, svgFileName }                = product
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
        const colorContainers: NodeListOf<HTMLElement> = _A( '.color-selector-input' )! 
        let selectedColorInput: HTMLInputElement = _( 'input[name="color"]:checked' )!
    
        attachDefaultListeners()
    
        function attachDefaultListeners()
        {
            paths?.forEach( ( path: SVGPathElement ) =>{
    
                path.addEventListener( 'click', () => {
                    path.setAttribute( 'style', `fill: ${ selectedColorInput?.value }` )
                })
            });
    
            startOverIcon?.addEventListener( 'click', () => {
    
                restartPathFillColors()
            })

            colorContainers.forEach( ( colorContainer: HTMLElement ) => {

                colorContainer.addEventListener( 'click', ( event ) => {
            
                    if ( event.currentTarget instanceof HTMLInputElement )
                    { 
                        selectedColorInput = event.currentTarget
                        checkSelectedColor()
                    }
                })
            })
    
        }
    
    
        function restartPathFillColors(){
    
            paths?.forEach( ( path: SVGPathElement, index: number ) => {
    
                path.setAttribute( 'style', `fill: ${pathFillOriginalColors[ index ]}`  )
            });
        }

        function checkSelectedColor(){
        
            colorContainers.forEach( ( colorContainer: HTMLElement ) => { 
        
                const inputLabel = getElementLabel( colorContainer )            
                inputLabel.classList.remove( 'checked' )
            })
            
            const selectedInputLabel = _( `label[for='${selectedColorInput.id}']` )
            selectedInputLabel.classList.add( 'checked' )
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