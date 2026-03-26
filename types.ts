export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number; // Base price (for 1 Pound) - kept for backward compatibility
  prices: Record<string, number>;
  image: string;
  category: string;
  subCategory?: string;
  isBestseller?: boolean;
  isNew?: boolean;
  tags?: string[];
}

export interface CartItem extends MenuItem {
  cartId: string; // Unique ID for the cart entry (combining item ID + weight)
  selectedWeight: string;
  quantity: number;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
}

export interface NavLink {
  name: string;
  href: string;
}