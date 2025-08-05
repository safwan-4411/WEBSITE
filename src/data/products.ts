export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Professional Hair Trimmer",
    price: 89,
    originalPrice: 129,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 324,
    category: "Trimmers",
    isSale: true
  },
  {
    id: 2,
    name: "Ionic Hair Dryer",
    price: 149,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 189,
    category: "Dryers",
    isNew: true
  },
  {
    id: 3,
    name: "LED Desk Lamp",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 156,
    category: "Lamps",
    isSale: true
  },
  {
    id: 4,
    name: "Remote Control Car",
    price: 45,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 278,
    category: "Toys"
  },
  {
    id: 5,
    name: "Cordless Beard Trimmer",
    price: 65,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 203,
    category: "Trimmers",
    isNew: true
  },
  {
    id: 6,
    name: "Ceramic Hair Dryer",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 145,
    category: "Dryers",
    isSale: true
  },
  {
    id: 7,
    name: "Smart Floor Lamp",
    price: 129,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 89,
    category: "Lamps"
  },
  {
    id: 8,
    name: "Educational Building Blocks",
    price: 35,
    image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 412,
    category: "Toys",
    isNew: true
  },
  {
    id: 9,
    name: "Precision Nose Trimmer",
    price: 29,
    originalPrice: 39,
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=400&h=400&fit=crop",
    rating: 4.4,
    reviews: 167,
    category: "Trimmers",
    isSale: true
  },
  {
    id: 10,
    name: "Travel Hair Dryer",
    price: 59,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop",
    rating: 4.3,
    reviews: 98,
    category: "Dryers"
  },
  {
    id: 11,
    name: "RGB Gaming Lamp",
    price: 89,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    category: "Lamps",
    isNew: true
  },
  {
    id: 12,
    name: "Interactive Robot Toy",
    price: 119,
    originalPrice: 149,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 156,
    category: "Toys",
    isSale: true
  }
];

export const categories = ["All", "Trimmers", "Dryers", "Toys", "Lamps"];