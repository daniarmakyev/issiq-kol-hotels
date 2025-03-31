export interface LocalizedText {
    en: string;
    ru: string;
    kg: string;
    kz: string;
}

export interface LocalizedStringArray {
    en: string[];
    ru: string[];
    kg: string[];
    kz: string[];
}

export interface Geo {
    latitude: number;
    longitude: number;
}

export interface Contact {
    phone: string;
    email: string;
}

export interface Availability {
    check_in: string;
    check_out: string;
    total_count: number;
    available_count: number;
}

interface Policies {
    pets_allowed: boolean;
    cancellation: LocalizedText;
}


// interface Owner {
//     id: number;
//     type: string;
//     name: LocalizedText;
//     phone: string;
//     email: string;
// }

export interface House {
    id?: number | string;
    name: LocalizedText;
    location: LocalizedText;
    geo: Geo;
    price: number;
    currency: string;
    limit: number;
    beds: number;
    rooms: number;
    bathrooms: number;
    square: number;
    category: string;
    type: string;
    amenities: LocalizedStringArray;
    services: LocalizedStringArray;
    description: LocalizedText;
    contact: Contact;
    images: string[];
    availability: Availability;
    policies: Policies;
    owner: string;
    services_count: number;
    amenities_count: number;
    rating: number
}
export interface IPag {
    first: number;
    prev: boolean | number;
    next: boolean | number;
    last: number;
    pages: number;
    items: number;
    data?: House[];
}
export interface HousesResponse {
    houses: IPag | null;
    special: House[];
    house: House[],
    favorites: House[],
    created: House[];
    userRented: {
        rentedBef: House[],
        rented: House[],
    }
    all:House[]
}



export interface LocalizedText {
    en: string;
    ru: string;
    kg: string;
    kz: string;
}
export interface User {
    id?: string | number;
    type?: string;
    name?: LocalizedText;
    phone?: string;
    email?: string;
    password?: string;
    payment?: number;
    rented?: string[];
    rented_before?: string[];
    favorites?: string[];
    avaible_hotels?: string[];
    disable_hotels?: string[];
}
export interface UserRespons {
    user: User | null;
    owner: User | null
}


export type HouseFormProps = {
    onSubmit: (house: House) => void;
    onClose: () => void;
    user: User
};

