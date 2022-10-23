function _( selector: any ): any
{
    return document.querySelector( selector )
}

function _A( selector: any): NodeListOf<any>|null
{
    return document.querySelectorAll( selector )
}

function getElementLabel( element: HTMLElement ): HTMLElement
{
    const containerId: string     = element.id
    const inputLabel: HTMLElement = _( `label[for='${ containerId }']`)   
    return inputLabel
}