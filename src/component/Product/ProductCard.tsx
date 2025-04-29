import { useState, useEffect } from "react";
import { Heart } from 'lucide-react';
import { motion } from "framer-motion";
import { Product } from "../../Types/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
        />
        {product.inStock === false && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
            <span className="text-sm font-medium uppercase">Out of Stock</span>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow-sm"
      >
        <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>

      <div className="mt-2 md:mt-4 flex justify-between">
        <div>
          <h3 className="text-xs md:text-sm font-medium text-gray-900 line-clamp-1">{product.title}</h3>
          <p className="mt-1 text-xs md:text-sm text-gray-500 line-clamp-1">{product.category}</p>
        </div>
        <p className="text-xs md:text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
      </div>

      {(isMobile || isHovered) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${isMobile ? "static mt-2" : "absolute inset-x-0 bottom-0"} bg-white p-2 shadow-lg rounded-b-lg`}
        >
          <button className="w-full py-1 md:py-2 bg-black text-white text-xs md:text-sm font-medium rounded">
            Add to Cart
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}