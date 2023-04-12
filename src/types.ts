export interface ICard {
  id: number;
  subjectId: number;
  subjectParentId: number;
  name: string;
  brand: string;
  brandId: number;
  siteBrandId: number;
  supplierId: number;
  sale: number;
  priceU: number;
  salePriceU: number;
  rating: number;
  feedbacks: number;
  colors: [
    {
      name: string;
    }
  ];
}
