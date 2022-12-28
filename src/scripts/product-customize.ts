import { Product } from "../products.js";
import { attachHeaedrListeners  } from "./components/header.js";
import { getProduct } from "./db-helpers.js";
import { loadProduct } from "./helpers.js";


export let currentProduct: Product = { id: "0", company: "", name: "", svgFileName: "" }

loadProduct( getProduct( 1 ) )
attachHeaedrListeners()
