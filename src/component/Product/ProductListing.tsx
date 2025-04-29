import { useState, useEffect, useCallback, useRef } from "react";
import { Heart, ShoppingCart, User, ChevronDown, Search, Check, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import FilterSidebar from "../Layout/Sidebar";
import { Product } from "../../Types/Product";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import Footer from "../Layout/Footer";
import { checkIsMobile, sortOptions } from "../../utils";
import { fetchProducts } from "../../services";
import { sortProducts } from "../../utils/SortProducts";

export default function ProductListing() {
  const { isAuthenticated, logout, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(checkIsMobile());
    };
  
    handleResize();
    window.addEventListener('resize', handleResize);
  
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log(activeFilters)
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    getProducts();
  }, []);

  const handleFilterChange = useCallback((filters: Record<string, string[]>) => {
    setActiveFilters(filters);
    
    if (Object.keys(filters).length === 0) {
      setFilteredProducts(products);
      return;
    }
    
    let result = [...products];
    
    if (filters.idealFor && filters.idealFor.length > 0) {
      result = result.filter(product => {
        const category = product.category.toLowerCase();
        
        if (filters.idealFor.includes('men') && 
            (category.includes('men') || category === "electronics")) {
          return true;
        }
        
        if (filters.idealFor.includes('women') && 
            (category.includes('women') || category === "jewelery")) {
          return true;
        }
        
        if (filters.idealFor.includes('kids') && 
            category.includes('kid')) {
          return true;
        }
        
        return false;
      });
    }
    
    if (filters.customizable && filters.customizable.includes('yes')) {
      result = result.filter(product => 
        product.description.toLowerCase().includes('custom') || 
        product.title.toLowerCase().includes('custom')
      );
    }
    
    setFilteredProducts(result);
  }, [products]);

  const sortedProducts = sortProducts(filteredProducts, sortOption);


  const handleSortOptionSelect = (optionId: string) => {
    setSortOption(optionId);
    setShowSortDropdown(false);
    
    if (optionId === "recommended") {
      setActiveFilters({});
    }
    
    if (isMobile) {
      setShowFilters(false);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const displayName = user?.name ? user.name : user?.email?.split('@')[0] || "User";

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Menu className="h-6 w-6 cursor-pointer" onClick={toggleMobileMenu} />
              )}
              <div className="font-bold text-xl">LOGO</div>
            </div>
            <div className="hidden md:block text-xl font-semibold absolute left-1/2 transform -translate-x-1/2">Logo</div>
            <div className="flex items-center space-x-4">
              <Search className="h-5 w-5 cursor-pointer" />
              <Heart className="h-5 w-5 cursor-pointer" />
              <ShoppingCart className="h-5 w-5 cursor-pointer" />
              {!isMobile && isAuthenticated && (
                <div className="relative" ref={userDropdownRef}>
                  <User 
                    className="h-5 w-5 cursor-pointer hover:text-gray-600" 
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  />
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-md z-10 border border-gray-200">
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-gray-200">
                          <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center">
                            <User className="h-6 w-6 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-medium">{displayName}</div>
                            <div className="text-sm text-gray-500">{user?.email}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setShowUserDropdown(false);
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {!isMobile && !isAuthenticated && (
                <Link to="/sign-in">
                  <User className="h-5 w-5 cursor-pointer" />
                </Link>
              )}
              {!isMobile && (
                <div className="flex items-center cursor-pointer">
                  <span className="text-sm">ENG</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </div>
              )}
            </div>
          </div>

          <AnimatePresence>
            {isMobile && showMobileMenu && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="py-4 border-t border-gray-200 mt-4"
              >
                <nav className="flex flex-col space-y-3">
                  <a href="#" className="text-gray-800 hover:text-gray-600">SHOP</a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">SKILLS</a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">STORIES</a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">ABOUT</a>
                  <a href="#" className="text-gray-800 hover:text-gray-600">CONTACT US</a>
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center space-x-2 text-gray-800">
                        <User className="h-4 w-4" />
                        <span>{displayName}</span>
                      </div>
                      <button
                        onClick={logout}
                        className="text-left text-gray-800 hover:text-gray-600"
                      >
                        SIGN OUT
                      </button>
                    </>
                  ) : (
                    <Link to="/sign-in" className="text-gray-800 hover:text-gray-600">
                      SIGN IN
                    </Link>
                  )}
                  <div className="flex items-center text-gray-800">
                    <span className="text-sm">ENG</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          <nav className="hidden md:flex justify-center space-x-8 py-4">
            <a href="#" className="text-gray-800 hover:text-gray-600">SHOP</a>
            <a href="#" className="text-gray-800 hover:text-gray-600">SKILLS</a>
            <a href="#" className="text-gray-800 hover:text-gray-600">STORIES</a>
            <a href="#" className="text-gray-800 hover:text-gray-600">ABOUT</a>
            <a href="#" className="text-gray-800 hover:text-gray-600">CONTACT US</a>
          </nav>
        </div>
      </header>

      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">DISCOVER OUR PRODUCTS</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-4">
            {!isMobile && <span className="font-medium">{sortedProducts.length} ITEMS</span>}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              {showFilters && !isMobile ? <X className="h-4 w-4 mr-1" /> : null}
              {isMobile ? "FILTER" : (showFilters ? "HIDE FILTER" : "SHOW FILTER")}
            </button>
          </div>

          <div className="relative" ref={sortDropdownRef}>
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center text-gray-800 hover:text-gray-600"
            >
              {isMobile ? "SORT" : (sortOptions.find(option => option.id === sortOption)?.label || "RECOMMENDED")} 
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            <AnimatePresence>
              {showSortDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-60 bg-white shadow-lg rounded-md z-10 border border-gray-200"
                >
                  <ul className="py-2">
                    {sortOptions.map((option) => (
                      <li key={option.id}>
                        <button
                          onClick={() => handleSortOptionSelect(option.id)}
                          className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          {sortOption === option.id && <Check className="h-4 w-4 mr-2" />}
                          <span className={sortOption === option.id ? "ml-0" : "ml-6"}>{option.label}</span>
                          {option.id === "recommended" && (
                            <span className="ml-2 text-xs text-gray-500">(Clear filters)</span>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {isMobile && showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="fixed inset-0 z-50 bg-white overflow-y-auto"
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold">Filters</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <FilterSidebar onFilterChange={handleFilterChange} />
                <div className="mt-8 flex justify-end">
                  <button 
                    className="px-6 py-2 bg-black text-white rounded"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col md:flex-row gap-8 mt-6">
          {!isMobile && showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full md:w-64 shrink-0"
            >
              <FilterSidebar onFilterChange={handleFilterChange} />
            </motion.div>
          )}

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-8">{error}</div>
            ) : sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No products match your selected filters.</p>
                <button 
                  onClick={() => setActiveFilters({})}
                  className="mt-4 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}