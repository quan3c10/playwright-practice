export interface Address {
    fullName: string;
    addressLines: string[];
    cityStatePostcode: string;
    country: string;
    phone: string;
}

import { Product } from '../ui/ProductModels'; // Adjust the path as needed

export class CartProduct implements Product {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    availability: string;
    condition: string;
    brand: string;
    total: string;
}