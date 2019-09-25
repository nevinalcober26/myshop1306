
export class Product{
    id: number;
    productName: string;
    slug: string;
    description: string;
    additionalDescription: string;
    subtitle: string;
    additionalTitle: string;
    additionalSubtitle: string;
    image: string;
    category: string;
    color: string;
    size: number;
    stock: number;
    availability: string;
    wishlist: number;
    gallery: [
        {
            id: number;
            thumbnail: string;
            images: string;
        }
    ]
    pricingPlans:[
         {
            discountPrice : number;
            price: number;
            currency: string;
            membershipPrice: number;
         }
      ]
      sku: number;
      quantity: number;
}
