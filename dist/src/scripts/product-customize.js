var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { attachHeaedrListeners } from "./components/header.js";
import { getProduct } from "./db-helpers.js";
import { addProductToCookieArray, findProductIndexInCookieArray, removeProductFromCookieArray, _, _A } from "./helpers.js";
const saveProductButton = _('.save-product-button');
const saveProductText = _('.save-product-text');
const addToCartButton = _('.add-to-bag-button');
export let currentProduct = { id: "0", company: "", name: "", svgFileName: "" };
loadProduct(getProduct(1));
attachHeaedrListeners();
attachProductCustomizeListener();
function attachProductCustomizeListener() {
    saveProductButton.addEventListener('click', () => {
        const productIndex = findProductIndexInCookieArray('saved_products', currentProduct);
        if (productIndex !== -1) {
            removeProductFromCookieArray('saved_products', productIndex);
            toggleSaveProductButtonView(false);
            return;
        }
        addProductToCookieArray('saved_products', currentProduct);
        toggleSaveProductButtonView(true);
    });
    addToCartButton.addEventListener('click', () => {
        const productWithCustomize = currentProduct;
        const productSvg = _('#product-svg > svg');
        productWithCustomize.customization = productSvg;
        addProductToCookieArray('cart_products', productWithCustomize);
    });
}
function loadProduct(product) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, company, name, svgFileName } = product;
        const productView = _('.product');
        const productName = _('.product-name');
        const productSvgObject = _('#product-svg');
        productView.dataset.productId = id;
        productName.innerHTML = name;
        productSvgObject.data = 'src/assets/products/' + svgFileName;
        currentProduct.id = id;
        currentProduct.company = company;
        currentProduct.name = name;
        currentProduct.svgFileName = svgFileName;
        const isProductSaved = findProductIndexInCookieArray('saved_products', product) !== -1;
        toggleSaveProductButtonView(isProductSaved);
        yield attachListenersToProduct();
    });
}
function attachListenersToProduct() {
    var _a;
    (_a = _("#product-svg")) === null || _a === void 0 ? void 0 : _a.addEventListener("load", function () {
        const productSvgObject = _('#product-svg');
        const startOverIcon = _('.start-over-icon');
        const productSvg = productSvgObject === null || productSvgObject === void 0 ? void 0 : productSvgObject.contentDocument;
        const paths = productSvg === null || productSvg === void 0 ? void 0 : productSvg.querySelectorAll('path');
        const pathFillOriginalColors = [...paths].map((path) => { return path.getAttribute('fill'); });
        const colorContainers = _A('.color-selector-input');
        let selectedColorInput = _('input[name="color"]:checked');
        attachDefaultListeners();
        function attachDefaultListeners() {
            paths === null || paths === void 0 ? void 0 : paths.forEach((path) => {
                path.addEventListener('click', () => {
                    path.setAttribute('style', `fill: ${selectedColorInput === null || selectedColorInput === void 0 ? void 0 : selectedColorInput.value}`);
                });
            });
            startOverIcon === null || startOverIcon === void 0 ? void 0 : startOverIcon.addEventListener('click', () => {
                restartPathFillColors();
            });
            colorContainers.forEach((colorContainer) => {
                colorContainer.addEventListener('click', (event) => {
                    if (event.currentTarget instanceof HTMLInputElement) {
                        selectedColorInput = event.currentTarget;
                        checkSelectedColor();
                    }
                });
            });
        }
        function restartPathFillColors() {
            paths === null || paths === void 0 ? void 0 : paths.forEach((path, index) => {
                path.setAttribute('style', `fill: ${pathFillOriginalColors[index]}`);
            });
        }
        function checkSelectedColor() {
            colorContainers.forEach((colorContainer) => {
                const inputLabel = getElementLabel(colorContainer);
                inputLabel.classList.remove('checked');
            });
            const selectedInputLabel = _(`label[for='${selectedColorInput.id}']`);
            selectedInputLabel.classList.add('checked');
        }
    });
}
function toggleSaveProductButtonView(isSaved) {
    saveProductButton.classList.toogle('product-saved', isSaved);
    saveProductText.innerHTML = isSaved ? 'UNSAVE' : 'SAVE';
}
