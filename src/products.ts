export type Product = {
    id: string,
    company: string,
    name: string,
    svgFileName: string,
    customization?: string
}

export const productList: Array< Product > = 
[
    { id: "1", company: "nike", name: "AIR JORDAN ONE", svgFileName: "air-jordan-1.svg" },
    { id: "2", company: "nike", name: "AIR JORDAN FOUR", svgFileName: "air-jordan-four.svg" }
]
