import { currentProduct } from "./product-customize.js";
export function _(selector) {
    return document.querySelector(selector);
}
export function _A(selector) {
    return document.querySelectorAll(selector);
}
export function getElementLabel(element) {
    const containerId = element.id;
    const inputLabel = _(`label[for='${containerId}']`);
    return inputLabel;
}
export const debounce = (fn, ms = 300) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};
export const loadProduct = (product) => {
    const { id, company, name, svgFileName } = product;
    const productView = _('.product-view');
    const productName = _('.product-name');
    const productSvgObject = _('#product-svg');
    productView.dataset.productId = id;
    productName.innerHTML = name;
    productSvgObject.data = 'src/assets/products/' + svgFileName;
    currentProduct.id = id;
    currentProduct.company = company;
    currentProduct.name = name;
    currentProduct.svgFileName = svgFileName;
    attachListenersToProduct();
};
const attachListenersToProduct = () => {
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
};
