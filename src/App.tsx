import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, ChevronDown, Phone, Search, Filter } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { CategoryFilter } from './components/CategoryFilter';
import { CategoryPage } from './components/CategoryPage';
import { products, categories, Product } from './data/products';

function HomePage() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setCartCount(prev => prev + 1);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Purple gradient blur effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[128px] opacity-20"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[128px] opacity-20"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 1px, transparent 1px), 
                         linear-gradient(90deg, rgba(0, 0, 0, 0.2) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6">
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-white text-2xl font-bold">SM</div>
              
              <div className="flex items-center space-x-8">
                {/* Nav Items */}
                <div className="flex items-center space-x-6">
                  {['Products'].map((item) => (
                    <div key={item} className="group relative">
                      <button className="flex items-center space-x-1 text-white hover:text-purple-300 transition-colors">
                        <span>{item}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <div className="absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                        <button onClick={() => handleCategoryClick('Trimmers')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/20">Trimmers</button>
                        <button onClick={() => handleCategoryClick('Dryers')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/20">Dryers</button>
                        <button onClick={() => handleCategoryClick('Toys')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/20">Toys</button>
                        <button onClick={() => handleCategoryClick('Lamps')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-600/20">Lamps</button>
                      </div>
                    </div>
                  ))}
                  
                  {/* Search */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowSearch(!showSearch)}
                      className="text-white hover:text-purple-300 transition-colors"
                    >
                      <Search className="w-6 h-6" />
                    </button>
                    {showSearch && (
                      <div className="absolute top-full right-0 mt-2 w-80 bg-black/90 backdrop-blur-lg rounded-lg p-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 border border-white/20 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
                            autoFocus
                          />
                        </div>
                        {searchTerm && (
                          <div className="mt-3 max-h-60 overflow-y-auto">
                            {filteredProducts.slice(0, 5).map((product) => (
                              <div key={product.id} className="flex items-center space-x-3 p-2 hover:bg-purple-600/20 rounded-lg cursor-pointer">
                                <img src={product.image} alt={product.name} className="w-10 h-10 object-cover rounded" />
                                <div>
                                  <p className="text-white text-sm">{product.name}</p>
                                  <p className="text-gray-400 text-xs">${product.price}</p>
                                </div>
                              </div>
                            ))}
                            {filteredProducts.length === 0 && (
                              <p className="text-gray-400 text-sm p-2">No products found</p>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Cart & Contact */}
                <div className="flex items-center space-x-4">
                  <button className="relative">
                    <ShoppingCart className="w-6 h-6 text-white hover:text-purple-300 transition-colors" />
                    {cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#cc73f8] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </button>
                  <button className="flex items-center space-x-2 bg-white text-black px-4 py-2 rounded-full hover:bg-purple-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    <span>Contact</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-32 pb-16">
        <div className={`max-w-3xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="text-6xl font-bold text-white mb-6">
            Discover the Trendiest Products
          </h1>
          <p className={`text-xl text-gray-300 mb-8 transition-all delay-200 duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            Everyone's Talking About
            From viral toys to must-have gadgets — we bring the internet's favorite finds to your doorstep.
          </p>
          <div className={`flex space-x-4 transition-all delay-400 duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <button className="bg-[#cc73f8] hover:bg-[#b54fe0] text-white px-8 py-3 rounded-full transition-colors">
              Shop Now
            </button>
            <button className="border border-white/20 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors">
              Best Sellers
            </button>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="relative container mx-auto px-6 py-16">
        <div className="flex items-center justify-center mb-12">
          <Filter className="text-white w-5 h-5 mr-4" />
          <span className="text-white mr-6">Filter by category:</span>
        </div>

        <CategoryFilter 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>

      {/* Products Section */}
      <section className="relative container mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No products found matching your criteria.</p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-2xl font-bold mb-4">SM</h3>
              <p className="text-gray-400 mb-4">Quality electronics and accessories for your everyday needs.</p>
              <div className="flex space-x-4">
                <button className="text-gray-400 hover:text-white transition-colors">Facebook</button>
                <button className="text-gray-400 hover:text-white transition-colors">Instagram</button>
                <button className="text-gray-400 hover:text-white transition-colors">Twitter</button>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Electronics</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sale</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Product Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Warranty</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe for exclusive offers and updates.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                />
                <button className="bg-[#cc73f8] hover:bg-[#b54fe0] text-white px-6 py-2 rounded-r-full transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 SM Electronics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CategoryPageWrapper({ category }: { category: string }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <CategoryPage
      category={category.charAt(0).toUpperCase() + category.slice(1)}
      products={products}
      onBack={handleBack}
      onAddToCart={handleAddToCart}
    />
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:category" element={<CategoryRouteHandler />} />
      </Routes>
    </Router>
  );
}

function CategoryRouteHandler() {
  const { category } = useParams<{ category: string }>();
  return <CategoryPageWrapper category={category || 'trimmers'} />;
}

export default App;