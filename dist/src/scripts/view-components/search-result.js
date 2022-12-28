import { loadProduct } from "../helpers.js";
export const productView = (product) => {
    const resultElement = document.createElement("div");
    resultElement.classList.add('search-result');
    resultElement.onclick = function () { loadProduct(product); };
    resultElement.dataset.resultId = product.id;
    resultElement.innerHTML = `
        <object class="product-image-result" data="./src/assets/products/${product.svgFileName}" type="image/svg+xml"></object>
        
        <div class="product-name-and-company-result">

            <div class="product-name-result">${product.name}</div>
            <div class="product-company-result">${product.company}</div>
            
        </div>

        <span class="material-icons xs-icon choose-result-icon">arrow_forward_ios</span>
    `;
    return resultElement;
};
