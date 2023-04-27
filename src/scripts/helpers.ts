
export function _<T extends HTMLElement>(selector: string)
{
  return document.querySelector<T>(selector)
}

export function _A<T extends HTMLElement>(selector: string)
{
  return document.querySelectorAll<T>(selector)
}


export function getElementLabel( element: HTMLElement )
{
  const containerId  = element.id
  const elementLabel = _( `label[for='${ containerId }']`)   
  return elementLabel
}

export const debounce = ( fn: Function, ms = 300 ) => {

  let timeoutId: ReturnType<typeof setTimeout>
  return function ( this: any, ...args: any[] ) 
  {
    clearTimeout( timeoutId );
    timeoutId = setTimeout( () => fn.apply( this, args ), ms );
  }
}

export function adjustQuantityValue( inputElement: HTMLInputElement, adjustment: number )
{
  let numberValue      = inputElement.valueAsNumber + adjustment
  const inputMinNumber = parseInt( inputElement.min )
  const inputMaxNumber = parseInt( inputElement.max )

  numberValue = numberValue < inputMinNumber ? inputMinNumber : numberValue
  numberValue = numberValue > inputMaxNumber ? inputMaxNumber : numberValue

  inputElement.value = numberValue.toString()
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
  
export function selectFirstInput( inputsContainer: Element )
{
  const colorInputs     = inputsContainer.querySelectorAll( 'input[name="color"]' )    
  const firstColorInput = ( colorInputs[ 0 ] as HTMLInputElement )
  
  firstColorInput.checked = true    
}

export function getSvgPathFillColors( paths: NodeListOf<SVGPathElement> ): Array< string >
{
  return [ ...paths ].map( ( path: SVGPathElement ) =>{ return path.getAttribute( 'fill' )! })
}

export function getSVGFromObject( ObjectElement: HTMLObjectElement )
{
  const svgDocument = ObjectElement.contentDocument

  return svgDocument?.querySelector<SVGAElement>( 'svg' )
}