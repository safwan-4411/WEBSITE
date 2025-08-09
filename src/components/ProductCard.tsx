import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleLike: (product: Product) => void;
  isLiked: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onToggleLike, isLiked }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:transform hover:scale-105">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">NEW</span>
          )}
          {product.isSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">SALE</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => onToggleLike(product)}
          className={`absolute top-4 right-4 p-2 backdrop-blur-sm rounded-full transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/80 text-white opacity-100' 
              : 'bg-black/50 text-white hover:bg-purple-600/50 opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Add to Cart */}
        <button 
          onClick={() => onAddToCart(product)}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#cc73f8] hover:bg-[#b54fe0] text-white px-4 py-2 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-white font-semibold mb-2 group-hover:text-purple-300 transition-colors">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
              />
            ))}
          </div>
          <span className="text-gray-400 text-sm">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-lg">${product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};