"use strict";
var _a;
(_a = document.getElementById("product-svg")) === null || _a === void 0 ? void 0 : _a.addEventListener("load", function () {
    const colorContainers = _A('.color-selector-input');
    const startOverIcon = _('.start-over-icon');
    const productSvgObject = _('#product-svg');
    const productSvg = productSvgObject === null || productSvgObject === void 0 ? void 0 : productSvgObject.contentDocument;
    const paths = productSvg === null || productSvg === void 0 ? void 0 : productSvg.querySelectorAll('path');
    const pathFillOriginalColors = [...paths].map((path) => {
        return path.getAttribute('fill');
    });
    let selectedColorInput = _('input[name="color"]:checked');
    checkSelectedColor();
    attachDefaultListeners();
    function attachDefaultListeners() {
        paths === null || paths === void 0 ? void 0 : paths.forEach((path) => {
            path.addEventListener('click', (event) => {
                if (event.currentTarget instanceof SVGPathElement) {
                    path.setAttribute('style', `fill: ${selectedColorInput === null || selectedColorInput === void 0 ? void 0 : selectedColorInput.value}`);
                }
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
