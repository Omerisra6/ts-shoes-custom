import { searchProducts } from "../db-helpers.js";
import { debounce, _ } from "../helpers.js";
import { productView } from "../view-components/search-result.js";
const resultsContainer = _('.search-results-container');
const searchProductInput = _('.search-product-input');
export function attachHeaedrListeners() {
    searchProductInput.addEventListener('keyup', debounce(() => { searchInputOnChange(); }));
}
function searchInputOnChange() {
    const searchVal = searchProductInput.value;
    if (!searchVal) {
        resultsContainer.classList.add('invisible');
        return;
    }
    appendSearchResults(searchProducts(searchVal));
}
function appendSearchResults(searchResults) {
    resultsContainer.innerHTML = '';
    resultsContainer.classList.remove('invisible');
    if (searchResults.length === 0) {
        resultsContainer.innerHTML = '<div class="no-products-text">No products found<div>';
        return;
    }
    searchResults.forEach((result) => {
        resultsContainer.appendChild(productView(result));
    });
}
