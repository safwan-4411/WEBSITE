import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, Search } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface CategoryPageProps {
  category: string;
  products: Product[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({ 
  category, 
  products, 
  onBack, 
  onAddToCart 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = products.filter(product => 
    product.category === category && 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryDescription = (cat: string) => {
    switch (cat) {
      case 'Trimmers':
        return 'Professional grooming tools for precision styling and maintenance.';
      case 'Dryers':
        return 'High-performance hair dryers for salon-quality results at home.';
      case 'Toys':
        return 'Fun and educational toys that spark creativity and imagination.';
      case 'Lamps':
        return 'Modern lighting solutions to illuminate your space with style.';
      default:
        return 'Discover our premium collection of products.';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20"></div>
      </div>

      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px), 
                         linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative container mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-white hover:text-purple-300 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        {/* Category Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{category}</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {getCategoryDescription(category)}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={`Search ${category.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
              onToggleLike={onToggleLike}
              isLiked={likedItems.some(item => item.id === product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">
              {searchTerm 
                ? `No ${category.toLowerCase()} found matching "${searchTerm}"`
                : `No ${category.toLowerCase()} available at the moment.`
              }
            </p>
          </div>
        )}

        {/* Category Stats */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
            <div>
              <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
              <div className="text-gray-400 text-sm">Products</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <div className="text-2xl font-bold text-white">
                {filteredProducts.reduce((sum, p) => sum + p.reviews, 0)}
              </div>
              <div className="text-gray-400 text-sm">Reviews</div>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <div className="text-2xl font-bold text-white">
                {filteredProducts.length > 0 
                  ? (filteredProducts.reduce((sum, p) => sum + p.rating, 0) / filteredProducts.length).toFixed(1)
                  : '0.0'
                }
              </div>
              <div className="text-gray-400 text-sm">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};