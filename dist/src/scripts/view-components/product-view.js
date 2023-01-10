import { loadProduct } from "../pages/product-customize/product-customize-helpers.js";
export const ProductView = (product) => {
    const productViewElement = document.createElement("div");
    productViewElement.classList.add('product-view');
    productViewElement.onclick = function () { loadProduct(product); };
    productViewElement.dataset.resultId = product.id;
    productViewElement.innerHTML = `
        <object class="product-view-image" data="./src/assets/products/${product.svgFileName}" type="image/svg+xml"></object>
        
        <div class="product-view-name-and-company">

            <div class="product-view-name">${product.name}</div>
            <div class="product-view-company">${product.company}</div>
            
        </div>

        <span class="material-icons xs-icon choose-product-icon">arrow_forward_ios</span>
    `;
    return productViewElement;
};
