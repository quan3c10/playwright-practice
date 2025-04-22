export interface Address {
    fullName: string;
    addressLines: string[];
    cityStatePostcode: string;
    country: string;
    phone: string;
}

import { Product } from './ProductModels'; // Adjust the path as needed

export class CheckoutProduct implements Product {
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