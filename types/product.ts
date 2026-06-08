export type ProductCategory = string;

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  categorySlug?: string;
  price: string;
  image: string;
  description: string;
  featured?: boolean;
};

export type CategoryFeature = {
  name: ProductCategory;
  image: string;
  copy: string;
};
