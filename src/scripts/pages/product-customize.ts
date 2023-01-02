import { Product } from "../../products.js";
import { updateCartProductsCount, updateSavedProductsList } from "../components/header-helpers.js";
import { attachHeaedrListeners  } from "../components/header.js";
import { getProduct } from "../db-helpers.js";
import { addProductToCookieArray, findProductIndexInCookieArray, removeProductFromCookieArray, _, _A } from "../helpers.js";
import { loadProduct, toggleSaveProductButtonView } from "./product-customize-helpers.js";

const saveProductButton = _( '.save-product-button' )
const addToCartButton   = _( '.add-to-bag-button' )

export let currentProduct: Product = { id: "0", company: "", name: "", svgFileName: "" }

loadProduct( getProduct( 1 ) )
attachHeaedrListeners()
attachProductCustomizeListener()

function attachProductCustomizeListener()
{
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
}