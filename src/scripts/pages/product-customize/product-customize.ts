import { Product } from "../../products.js";
import { attachHeaedrListeners } from "../../components/header/header.js";
import { getProduct } from "../../db-handlers.js";
import { _, _A } from "../../helpers.js";
import { loadProduct, selectFirstColorInput } from "./product-customize-helpers.js";
import 
{ 
    attachListenersToCartButton, attachListenersToColorContainers, attachListenersToColorOptions,
    attachListenersToOwnColorInput, attachListenersToOwnColorLabel, attachListenersToSaveProduct 
} from "./product-customize-listeners.js";


export let currentProduct: Product = { id: "0", company: "", name: "", svgFileName: "", price: 0 }

attachHeaedrListeners()
loadProduct( getCurrentProduct() )
selectFirstColorInput()
attachProductCustomizeListener()

function getCurrentProduct( ):Product 
{
    const url: URL = new URL( window.location.href )    
    const currentProductId: number = url.searchParams.get( 'id' ) ? parseInt( url.searchParams.get( 'id' ) ) : 1

    return getProduct( currentProductId )
}

function attachProductCustomizeListener()
{
    attachListenersToSaveProduct()

    attachListenersToColorContainers()

    attachListenersToCartButton()

    attachListenersToColorOptions()

    attachListenersToOwnColorLabel()

    attachListenersToOwnColorInput()
}

export function setCurrentProduct( product: Product )
{
    currentProduct = product
}