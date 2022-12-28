import { Product } from "../products.js"
import { currentProduct } from "./product-customize.js"

export function _( selector: any ): any
{
    return document.querySelector( selector )
}

export function _A( selector: any): NodeListOf<any>|null
{
    return document.querySelectorAll( selector )
}

export function getElementLabel( element: HTMLElement ): HTMLElement
{
    const containerId: string     = element.id
    const inputLabel: HTMLElement = _( `label[for='${ containerId }']`)   
    return inputLabel
}

export const debounce = (fn: Function, ms = 300) => {

    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) 
    {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};


export const loadProduct: Function = ( product: Product ) => {
    
    const { id, company, name, svgFileName }                = product
    const productView: HTMLDivElement              = _( '.product-view' )!
    const productName: HTMLElement                 = _( '.product-name' )!
    const productSvgObject: HTMLObjectElement      = _( '#product-svg' )!

    productView.dataset.productId = id
    productName.innerHTML = name
    productSvgObject.data = 'src/assets/products/' + svgFileName

    currentProduct.id = id
    currentProduct.company = company
    currentProduct.name = name
    currentProduct.svgFileName = svgFileName

    attachListenersToProduct()
}

const attachListenersToProduct: Function = () => {

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