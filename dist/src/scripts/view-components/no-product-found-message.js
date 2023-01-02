export const NoProductsMessage = () => {
    const noProductsElement = document.createElement("div");
    noProductsElement.classList.add('no-products-text');
    noProductsElement.innerHTML = `No products found`;
    return noProductsElement;
};
