export function _( selector: any ): any
{
    return document.querySelector( selector )
}

export function _A( selector: any): NodeListOf<any>|null
{
    return document.querySelectorAll( selector )
}

export function getElementLabel( element: HTMLElement ): HTMLElement
{
    const containerId: string     = element.id
    const inputLabel: HTMLElement = _( `label[for='${ containerId }']`)   
    return inputLabel
}

export const debounce = (fn: Function, ms = 300) => {

    let timeoutId: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) 
    {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

export function selectFirstInput( inputsContainer: Element )
{
    const colorInputs: NodeListOf<Element>  = inputsContainer.querySelectorAll( 'input[name="color"]' )    
    const firstColorInput: HTMLInputElement = ( colorInputs[ 0 ] as HTMLInputElement )
    
    firstColorInput.checked = true    
}

export function adjustQuantityValue( inputElement: HTMLInputElement, adjustment: number )
{
  let numberValue: number      = inputElement.valueAsNumber + adjustment
  const inputMinNumber: number = parseInt( inputElement.min )
  const inputMaxNumber: number = parseInt( inputElement.max )

  numberValue = numberValue < inputMinNumber ? inputMinNumber : numberValue
  numberValue = numberValue > inputMaxNumber ? inputMaxNumber : numberValue

  inputElement.value         = numberValue.toString()
}

export function countObjectsWithAttribute( arr: Array< { [ key: string] : any } >, key: string, value: any ) 
{
    return arr.reduce( ( count, obj ) => {

      if ( obj[ key ] == value ) 
      {
        return count + 1;
      }
      
      return count;
    }, 0);
}

export function getIndexByKey( arr: Array< { [ key: string] : any } >, key: string, value: any ): number
{
  return arr.findIndex( ( object ) => {
        
    return object[ key ] === value
  })
}
  