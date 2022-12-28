import { productList } from "../products.js";
export const getProduct = (id) => {
    return productList.find((product) => { return product.id == id; });
};
export const searchProducts = (searchVal) => {
    return productList.filter((product) => {
        return Object.values(product).some((productAttribute) => {
            if (typeof productAttribute !== 'string') {
                return false;
            }
            return productAttribute.includes(searchVal);
        });
    });
};
