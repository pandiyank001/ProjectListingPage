import { Product } from '../Types/Product';

export const sortProducts = (products: Product[], sortOption: string): Product[] => {
  switch (sortOption) {
    case "newest":
      return [...products].sort((a, b) => b.id - a.id);
    case "popular":
      return [...products].sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
    case "price-high":
      return [...products].sort((a, b) => b.price - a.price);
    case "price-low":
      return [...products].sort((a, b) => a.price - b.price);
    case "recommended":
    default:
      return [...products];
  }
};
