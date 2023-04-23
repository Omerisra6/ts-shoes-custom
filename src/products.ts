export interface Product
{
    id: string,
    company: string,
    name: string,
    svgFileName: string,
    price: number,
    compareAtPrice?: number,
}

export interface CartProduct extends Product
{
    customization: string,
    quantity?: number
}

export const productList: Array< Product > = 
[
    { id: "1", company: "nike", name: "AIR JORDAN ONE", svgFileName: "air-jordan-1.svg", price: 120, compareAtPrice: 159 },
    { id: "2", company: "nike", name: "AIR JORDAN FOUR", svgFileName: "air-jordan-four.svg", price: 120, compareAtPrice: 159 }
]
