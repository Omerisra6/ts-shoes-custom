"use strict";
function _(selector) {
    return document.querySelector(selector);
}
function _A(selector) {
    return document.querySelectorAll(selector);
}
function getElementLabel(element) {
    const containerId = element.id;
    const inputLabel = _(`label[for='${containerId}']`);
    return inputLabel;
}
