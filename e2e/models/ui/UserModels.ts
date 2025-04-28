export interface User {
    id: number;
    title: string;
    name: string;
    email: string;
    password: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
    addressInfo: AddressInfo;
}
export interface AddressInfo {
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
}