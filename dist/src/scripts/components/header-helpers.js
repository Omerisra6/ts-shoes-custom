import { getCookie, _ } from "../helpers.js";
import { NoSavedMessage } from "../view-components/no-saved-products-message.js";
import { ProductView } from "../view-components/product-view.js";
export function updateSavedProductsList() {
    const savedProdtctsListElement = _('.saved-products-list');
    const savedProductsCookie = getCookie('saved_products');
    const savedProductList = savedProductsCookie ? JSON.parse(savedProductsCookie) : [];
    savedProdtctsListElement.innerHTML = '';
    if (savedProductList.length === 0) {
        const noSavedElement = NoSavedMessage();
        savedProdtctsListElement.append(noSavedElement);
        return;
    }
    savedProductList.forEach((product) => {
        const productViewElement = ProductView(product);
        savedProdtctsListElement.append(productViewElement);
    });
}
export function updateCartProductsCount() {
    const cartProductsCount = _('.cart-products-count');
    const cartProductCookie = getCookie('cart_products');
    const cartProductList = cartProductCookie ? JSON.parse(cartProductCookie) : [];
    cartProductsCount.innerHTML = cartProductList.length.toString();
}
