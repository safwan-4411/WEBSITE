import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Product } from '../data/products';
import { ProductCard } from './ProductCard';

interface SearchPageProps {
  products: Product[];
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onToggleLike: (product: Product) => void;
  likedItems: Product[];
  initialSearchTerm?: string;
}

export const SearchPage: React.FC<SearchPageProps> = ({ 
  products, 
  onBack, 
  onAddToCart,
  onToggleLike,
  likedItems,
  initialSearchTerm = ''
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

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

        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Search Products</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find exactly what you're looking for from our collection
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Search for products, categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full py-4 pl-16 pr-6 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="mb-8">
            <p className="text-gray-300 text-center">
              {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
            </p>
          </div>
        )}

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

        {searchTerm && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">
              No products found matching "{searchTerm}"
            </p>
            <p className="text-gray-500 mt-2">
              Try searching for different keywords or browse our categories
            </p>
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-xl">Start typing to search products</p>
            <p className="text-gray-500 mt-2">
              Search by product name or category
            </p>
          </div>
        )}

        {/* Search Stats */}
        {searchTerm && filteredProducts.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-white/5 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/10">
              <div>
                <div className="text-2xl font-bold text-white">{filteredProducts.length}</div>
                <div className="text-gray-400 text-sm">Results</div>
              </div>
              <div className="w-px h-8 bg-white/20"></div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {new Set(filteredProducts.map(p => p.category)).size}
                </div>
                <div className="text-gray-400 text-sm">Categories</div>
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
        )}
      </div>
    </div>
  );
};