import { findProductIndexInCookieArray, getElementLabel, selectFirstInput, _, _A } from "../../helpers.js";
import { currentProduct } from "./product-customize.js";
export function loadProduct(product) {
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
    attachListenersToProduct();
}
function attachListenersToProduct() {
    var _a;
    (_a = _("#product-svg")) === null || _a === void 0 ? void 0 : _a.addEventListener("load", function () {
        const productSvgObject = _('#product-svg');
        const startOverIcon = _('.start-over-icon');
        const productSvg = productSvgObject === null || productSvgObject === void 0 ? void 0 : productSvgObject.contentDocument;
        const paths = productSvg === null || productSvg === void 0 ? void 0 : productSvg.querySelectorAll('path');
        const pathFillOriginalColors = [...paths].map((path) => { return path.getAttribute('fill'); });
        attachDefaultListeners();
        function attachDefaultListeners() {
            paths === null || paths === void 0 ? void 0 : paths.forEach((path) => {
                path.addEventListener('click', () => {
                    let selectedColorInput = _('input[name="color"]:checked');
                    path.setAttribute('style', `fill: ${selectedColorInput === null || selectedColorInput === void 0 ? void 0 : selectedColorInput.value}`);
                });
            });
            startOverIcon === null || startOverIcon === void 0 ? void 0 : startOverIcon.addEventListener('click', () => {
                restartPathFillColors();
            });
        }
        function restartPathFillColors() {
            paths === null || paths === void 0 ? void 0 : paths.forEach((path, index) => {
                path.setAttribute('style', `fill: ${pathFillOriginalColors[index]}`);
            });
        }
    });
}
export function toggleSaveProductButtonView(isSaved) {
    const saveProductButton = _('.save-product-button');
    const saveProductText = _('.save-product-text');
    saveProductButton.classList.toggle('product-saved', isSaved);
    saveProductText.innerHTML = isSaved ? 'UNSAVE' : 'SAVE';
}
export function checkSelectedColor() {
    const colorContainers = _A('.color-selector-input');
    const selectedColorInput = _('input[name="color"]:checked');
    colorContainers.forEach((colorContainer) => {
        const inputLabel = getElementLabel(colorContainer);
        inputLabel.classList.remove('checked');
    });
    const selectedInputLabel = _(`label[for='${selectedColorInput.id}']`);
    selectedInputLabel.classList.add('checked');
}
export function toggleColorMenu(event) {
    if (!(event.currentTarget instanceof HTMLDivElement)) {
        return;
    }
    const currentButton = event.currentTarget;
    const colorMenu = _('.color-types-list');
    const colorOptions = [...colorMenu.children];
    colorOptions.forEach((colorOption) => {
        const isSelectedOption = colorOption == currentButton;
        colorOption.classList.toggle('selected-color-option', isSelectedOption);
        const colorOptionId = colorOption.id;
        const colorOptionField = _(`div[for="${colorOptionId}"]`);
        colorOptionField.classList.toggle('none', !isSelectedOption);
        if (isSelectedOption) {
            selectFirstInput(colorOptionField);
            checkSelectedColor();
        }
    });
}
