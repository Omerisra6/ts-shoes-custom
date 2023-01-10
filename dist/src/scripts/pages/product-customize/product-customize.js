import { updateCartProductsCount, updateSavedProductsList } from "../../components/header-helpers.js";
import { attachHeaedrListeners } from "../../components/header.js";
import { getProduct } from "../../db-helpers.js";
import { addProductToCookieArray, findProductIndexInCookieArray, removeProductFromCookieArray, selectFirstInput, _, _A } from "../../helpers.js";
import { checkSelectedColor, loadProduct, toggleColorMenu, toggleSaveProductButtonView } from "./product-customize-helpers.js";
const colorContainers = _A('.color-selector-input');
const saveProductButton = _('.save-product-button');
const addToCartButton = _('.add-to-bag-button');
const colorMenu = _('.color-types-list');
const ownColorLabel = _('.own-color-label');
const ownColorInput = _('.own-color-input');
const ownColorRadioInput = _('.own-radio-input');
export let currentProduct = { id: "0", company: "", name: "", svgFileName: "" };
loadProduct(getProduct(1));
selectFirstColorInput();
attachHeaedrListeners();
attachProductCustomizeListener();
function selectFirstColorInput() {
    const firstColorList = _('[for="solid-colors-option"]');
    selectFirstInput(firstColorList);
}
function attachProductCustomizeListener() {
    colorContainers.forEach((colorContainer) => {
        colorContainer.addEventListener('click', (event) => {
            if (event.currentTarget instanceof HTMLInputElement) {
                checkSelectedColor();
            }
        });
    });
    saveProductButton.addEventListener('click', () => {
        const productIndex = findProductIndexInCookieArray('saved_products', currentProduct);
        if (productIndex !== -1) {
            removeProductFromCookieArray('saved_products', productIndex);
            toggleSaveProductButtonView(false);
            updateSavedProductsList();
            return;
        }
        addProductToCookieArray('saved_products', currentProduct);
        toggleSaveProductButtonView(true);
        updateSavedProductsList();
    });
    addToCartButton.addEventListener('click', () => {
        const productWithCustomize = currentProduct;
        const productSvg = _('#product-svg');
        productWithCustomize.customization = productSvg;
        addProductToCookieArray('cart_products', productWithCustomize);
        updateCartProductsCount();
    });
    const colorOptions = [...colorMenu.children];
    colorOptions.forEach((colorOption) => {
        colorOption.addEventListener('click', (e) => {
            toggleColorMenu(e);
        });
    });
    ownColorLabel.addEventListener('click', () => {
        ownColorInput.click();
    });
    ownColorInput.addEventListener('change', () => {
        ownColorRadioInput.value = ownColorInput.value;
        ownColorRadioInput.id = ownColorInput.value;
        ownColorLabel.htmlFor = ownColorInput.value;
        ownColorLabel.style.backgroundColor = ownColorInput.value;
    });
}
