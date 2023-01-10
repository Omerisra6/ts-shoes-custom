import { Product } from "../../../products.js";
import { updateCartProductsCount, updateSavedProductsList } from "../../components/header-helpers.js";
import { attachHeaedrListeners } from "../../components/header.js";
import { getProduct } from "../../db-helpers.js";
import { addProductToCookieArray, findProductIndexInCookieArray, removeProductFromCookieArray, selectFirstInput, _, _A } from "../../helpers.js";
import { checkSelectedColor, loadProduct, toggleColorMenu, toggleSaveProductButtonView } from "./product-customize-helpers.js";

const colorContainers: NodeListOf<HTMLElement> = _A( '.color-selector-input' )! 
const saveProductButton: HTMLDivElement = _( '.save-product-button' )
const addToCartButton: HTMLDivElement   = _( '.add-to-bag-button' )
const colorMenu: HTMLDivElement         = _( '.color-types-list' )
const ownColorLabel: HTMLLabelElement   = _( '.own-color-label' )
const ownColorInput: HTMLInputElement   = _ ( '.own-color-input' )
const ownColorRadioInput: HTMLInputElement   = _ ( '.own-radio-input' )

export let currentProduct: Product = { id: "0", company: "", name: "", svgFileName: "" }

loadProduct( getProduct( 1 ) )
selectFirstColorInput()
attachHeaedrListeners()
attachProductCustomizeListener()

function selectFirstColorInput( ) 
{
    const firstColorList: HTMLDivElement = _( '[for="solid-colors-option"]')    
    selectFirstInput( firstColorList )
}

function attachProductCustomizeListener()
{
    colorContainers.forEach( ( colorContainer: HTMLElement ) => {

        colorContainer.addEventListener( 'click', ( event ) => {
    
            if ( event.currentTarget instanceof HTMLInputElement )
            {   
                checkSelectedColor()
            }
        })
    })

    saveProductButton.addEventListener( 'click', () =>{ 

        const productIndex: number = findProductIndexInCookieArray( 'saved_products', currentProduct )

        if ( productIndex !== -1 ) 
        {
            removeProductFromCookieArray( 'saved_products', productIndex )
            toggleSaveProductButtonView( false )
            updateSavedProductsList()
            return
        }

        addProductToCookieArray( 'saved_products', currentProduct )     
        toggleSaveProductButtonView( true )
        updateSavedProductsList()
    })


    addToCartButton.addEventListener( 'click', () =>{

        const productWithCustomize:Product    =  currentProduct
        const productSvg                      = _( '#product-svg' )  
        productWithCustomize.customization    = productSvg

        addProductToCookieArray( 'cart_products', productWithCustomize )
        updateCartProductsCount()
    })

    const colorOptions: Array< Element > = [ ...colorMenu.children ]
    colorOptions.forEach( ( colorOption: Element ) => {

        colorOption.addEventListener( 'click', ( e: Event ) => {
            toggleColorMenu( e )
        })
    })

    ownColorLabel.addEventListener( 'click', () => {

        ownColorInput.click()
    })

    ownColorInput.addEventListener( 'change', () => {

       ownColorRadioInput.value = ownColorInput.value 
       ownColorRadioInput.id    = ownColorInput.value 
       ownColorLabel.htmlFor    = ownColorInput.value 
       ownColorLabel.style.backgroundColor     =  ownColorInput.value
    })    
}