import { CartProduct, Product } from "../../products.js"
import { updateCartProductsCount, updateSavedProductsList } from "../../components/header/header-helpers.js"
import { addCartProduct, addProduct, getSavedProduct, removeSavedProduct } from "../../db-handlers.js"
import { _, _A, getSvgPathFillColors } from "../../helpers.js"
import { currentProduct } from "./product-customize.js"
import { checkSelectedColor, toggleColorMenu, toggleSaveProductButtonView } from "./product-customize-helpers.js"

export function attachListenersToSaveProduct(  ) 
{
    const saveProductButton: HTMLDivElement = _( '.save-product-button' )
    saveProductButton.addEventListener( 'click', () => { 

        const savedProduct: Product|undefined = getSavedProduct( currentProduct.id )

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
    const colorContainers: NodeListOf<HTMLElement> = _A( '.color-selector-input' )! 

    colorContainers.forEach( ( colorContainer: HTMLElement ) => {

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
    const addToCartButton: HTMLDivElement   = _( '.add-to-bag-button' )

    addToCartButton.addEventListener( 'click', () =>{

        const productSvgObject: HTMLObjectElement =  _( '#product-svg' )
        const productSvgDocument: Document        =  productSvgObject.contentDocument
        const productSvg: SVGElement              = productSvgDocument.querySelector( 'svg' )
        const productSvgString: string            = productSvg.outerHTML
        
        const productWithCustomize: CartProduct =  
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
    const colorMenu: HTMLDivElement         = _( '.color-types-list' )
    const colorOptions: Array< Element >    = [ ...colorMenu.children ]

    colorOptions.forEach( ( colorOption: Element ) => {

        colorOption.addEventListener( 'click', ( e: Event ) => {

            toggleColorMenu( e )
        })
    })
}

export function attachListenersToOwnColorLabel()
{
    const ownColorLabel: HTMLLabelElement   = _( '.own-color-label' )
    const ownColorInput: HTMLInputElement   = _ ( '.own-color-input' )

    ownColorLabel.addEventListener( 'click', () => {

        ownColorInput.click()
    })
}

export function attachListenersToOwnColorInput()
{
    const ownColorLabel: HTMLLabelElement        = _( '.own-color-label' )
    const ownColorInput: HTMLInputElement        = _ ( '.own-color-input' )
    const ownColorRadioInput: HTMLInputElement   = _ ( '.own-radio-input' )

    ownColorInput.addEventListener( 'change', () => {

        ownColorRadioInput.value = ownColorInput.value 
        ownColorRadioInput.id    = ownColorInput.value 
        ownColorLabel.htmlFor    = ownColorInput.value 
        ownColorLabel.style.backgroundColor     =  ownColorInput.value
     })    
}

export function attachListenersToSvgPaths( paths: NodeListOf<SVGPathElement> )
{
    paths?.forEach( ( path: SVGPathElement ) =>{

        path.addEventListener( 'click', () => {

            let selectedColorInput: HTMLInputElement = _( 'input[name="color"]:checked' )!
            path.setAttribute( 'style', `fill: ${ selectedColorInput?.value }` )
        })
    });
}

export function attachListenersToStartOver( paths: NodeListOf<SVGPathElement> )
{
    const startOverIcon: HTMLElement = _( '.start-over-icon' )!
    const pathOriginalColors: Array<string> = getSvgPathFillColors( paths )

    startOverIcon?.addEventListener( 'click', () => {

        restartPathFillColors( paths, pathOriginalColors )
    })
}

function restartPathFillColors( paths: NodeListOf<SVGPathElement>, pathOriginalColors: Array< string > )
{
   

    paths?.forEach( ( path: SVGPathElement, index: number ) => {

        path.setAttribute( 'style', `fill: ${pathOriginalColors[ index ]}`  )
    });
}
