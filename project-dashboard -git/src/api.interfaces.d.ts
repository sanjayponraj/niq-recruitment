export interface Category {
    name: string;
    slug: string;
    url: string;
}

export interface Product {
    id: numberumber;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    sku: string[];
    weight: number;
    dimensions: {
        width: number;
        height: number;
        depth: number
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: any[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: any;
    images: string[];
    thumbnail: string
}

export interface ProductListing {
    products: Product[]
}