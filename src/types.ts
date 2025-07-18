export type User = {
  _id: string;
  email: string;
  name: string;
  profileImageUrl: string;
  number: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type Product = {
  _id: string;
  productName: string;
  brand: string;
  price: number;
  sizes: string[];
  colors: string[];
  stock: number;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  productDescription: string;
  imageFile?: File[]; // For uploading new images
  productImages?: string[]; // For existing image URLs (optional on frontend)
  isFeatured?: boolean;
  discount: number;
  collections: string;
  bestSeller: boolean;
};

export type ProductsSearchResponse = {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type ProductsPages = {
  page: number;
};

export type SearchState = {
  searchQuery?: string;
  page: number;
  colors?: string[];
  categories?: string[];
  genders?: string[];
  price?: number;
  collections: string[];
};

export type CartItem = {
  product: string; // product _id
  quantity: number;
  size?: string; // Optional, e.g., "M", "L", etc.
};

export type CartType = {
  _id?: string;
  user: string;
  items: CartItem[];
  createdAt?: Date;
  updatedAt?: Date;
};

export interface GetCartType {
  items: {
    _id: string;
    quantity: number;
    size: string | null;
    product: {
      _id: string;
      productName: string;
      discount: number;
      brand: string;
      price: number;
      category: string;
      productImages: string[];
    };
  }[];
}

export interface Address {
  _id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  isDefault?: boolean;
}

export interface UserAddresses {
  _id: string; // Document ID of the UserAddress
  user: string; // User ID
  addresses: Address[]; // Array of address objects
}

// The type you get BACK from the API (full Order)
export type OrderType = {
  _id?: string;
  user: string;
  items: any[];
  shippingAddress: any;
  totalAmount?: number;
  status?: string;
  paymentMethod: string;
  paymentDetails?: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };
  createdAt?: string;
  updatedAt?: string;
};

// The type you SEND to the API when creating a new order
export type CreateOrderPayload = {
  items: any[];
  shippingAddress: any;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentDetails?: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  };
};

// types.ts or wherever you define types
export interface ProductDetails {
  _id: string;
  productName: string;
  price: number;
  discount?: number;
  productImages: string[];
  brand?: string;
}

export interface OrderItemWithProduct {
  product: ProductDetails;
  quantity: number;
  size: string;
}

export interface ShippingAddress {
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PaymentDetails {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface UserOrderWithProductDetails {
  _id: string;
  user: string;
  items: OrderItemWithProduct[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  paymentDetails?: PaymentDetails;
  createdAt: string;
  updatedAt: string;
}
