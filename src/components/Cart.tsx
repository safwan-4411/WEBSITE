import React from 'react';
import { X, Minus, Plus, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data/products';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: Product[];
  likedItems: Product[];
  onRemoveFromCart: (productId: number) => void;
  onRemoveFromLikes: (productId: number) => void;
  onAddToCart: (product: Product) => void;
}

export const Cart: React.FC<CartProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  likedItems,
  onRemoveFromCart,
  onRemoveFromLikes,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = React.useState<'cart' | 'liked'>('cart');
  
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const cartItemCounts = cartItems.reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const uniqueCartItems = Array.from(new Set(cartItems.map(item => item.id)))
    .map(id => cartItems.find(item => item.id === id)!);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-black/90 backdrop-blur-xl border-l border-white/10">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('cart')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  activeTab === 'cart' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Cart ({cartItems.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('liked')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  activeTab === 'liked' 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Liked ({likedItems.length})</span>
              </button>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'cart' ? (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">Your cart is empty</p>
                    <p className="text-gray-500 text-sm">Add some products to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {uniqueCartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-gray-400 text-sm">${item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button 
                              onClick={() => onRemoveFromCart(item.id)}
                              className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600"
                            >
                              <Minus className="w-3 h-3 text-white" />
                            </button>
                            <span className="text-white text-sm w-8 text-center">
                              {cartItemCounts[item.id]}
                            </span>
                            <button 
                              onClick={() => onAddToCart(item)}
                              className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center hover:bg-purple-700"
                            >
                              <Plus className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {likedItems.length === 0 ? (
                  <div className="text-center py-12">
                    <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No liked products</p>
                    <p className="text-gray-500 text-sm">Heart some products to save them here</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {likedItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-white/5 rounded-lg p-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-white font-medium">{item.name}</h3>
                          <p className="text-gray-400 text-sm">${item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <button 
                              onClick={() => onAddToCart(item)}
                              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-full text-xs transition-colors"
                            >
                              Add to Cart
                            </button>
                            <button 
                              onClick={() => onRemoveFromLikes(item.id)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          {activeTab === 'cart' && cartItems.length > 0 && (
            <div className="border-t border-white/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-semibold">Total:</span>
                <span className="text-white font-bold text-xl">${cartTotal.toFixed(2)}</span>
              </div>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition-colors">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};