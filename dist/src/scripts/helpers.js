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
export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
export function addProductToCookieArray(cname, newProduct) {
    const productsCookie = getCookie(cname);
    const productsArray = !productsCookie ? [] : JSON.parse(productsCookie);
    productsArray.push(newProduct);
    setCookie(cname, JSON.stringify(productsArray), 1);
}
export function removeProductFromCookieArray(cname, producyIndex) {
    const productsCookie = getCookie(cname);
    const productsArray = JSON.parse(productsCookie);
    productsArray.splice(producyIndex, 1);
    setCookie(cname, JSON.stringify(productsArray), 1);
}
export function findProductIndexInCookieArray(cname, searchedProduct) {
    const productsCookie = getCookie(cname);
    if (!productsCookie) {
        return -1;
    }
    const productsArray = JSON.parse(productsCookie);
    return productsArray.findIndex((product) => {
        return product.id === searchedProduct.id;
    });
}
