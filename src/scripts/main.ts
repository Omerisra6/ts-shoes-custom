document.getElementById( "product-svg" )?.addEventListener( "load", function(){

    const colorContainers: NodeListOf<HTMLElement> = _A( '.color-selector-input' )! 
    const startOverIcon: HTMLElement               = _( '.start-over-icon' )!
    const productSvgObject: HTMLObjectElement      = _( '#product-svg' )!
    const productSvg                               = productSvgObject?.contentDocument;
    const paths: NodeListOf<SVGPathElement>|null   = productSvg?.querySelectorAll( 'path' )!
    const pathFillOriginalColors: Array<string>    = [ ...paths ].map( ( path: SVGPathElement ) =>{

        return path.getAttribute( 'fill' )!
    })
    
    let selectedColorInput: HTMLInputElement = _( 'input[name="color"]:checked' )!
    
    checkSelectedColor()
    attachDefaultListeners()

    function attachDefaultListeners(){

        paths?.forEach( ( path: SVGPathElement ) =>{
  
            path.addEventListener( 'click', ( event: Event ) => {
                
                if ( event.currentTarget instanceof SVGPathElement) { 
    
                    path.setAttribute( 'style', `fill: ${ selectedColorInput?.value }` )
                }
            })
        });
    
        startOverIcon?.addEventListener( 'click', () => {
    
            restartPathFillColors()
        })
    
        colorContainers.forEach( ( colorContainer: HTMLElement ) => {
    
            colorContainer.addEventListener( 'click', ( event ) => {
    
                if ( event.currentTarget instanceof HTMLInputElement ) { 
    
                    selectedColorInput = event.currentTarget
                    checkSelectedColor()
                }
            
            })
        })
    }

    function restartPathFillColors(){

        paths?.forEach( ( path: SVGPathElement, index: number ) => {
    
            path.setAttribute( 'style', `fill: ${pathFillOriginalColors[ index ]}`  )
        });
    }
    
    function checkSelectedColor(){
        
        colorContainers.forEach( ( colorContainer: HTMLElement ) => { 
    
            const inputLabel = getElementLabel( colorContainer )            
            inputLabel.classList.remove( 'checked' )
        })
        
        const selectedInputLabel = _( `label[for='${selectedColorInput.id}']` )
        selectedInputLabel.classList.add( 'checked' )
    }
})