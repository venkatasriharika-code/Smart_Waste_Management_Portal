import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import smartbin from '../../assets/bins.png'

// Importing all necessary icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaStar, FaTag,
  FaBox, FaTools, FaSeedling, FaBookOpen, FaThLarge, FaCartPlus
} from 'react-icons/fa';

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ HEADER COMPONENT (Included directly as requested)
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Header = () => {
  const location = useLocation();

  const NavItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          isActive ? 'bg-[#5e5c5ed8] text-white' : 'hover:bg-cyan-600'
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  };

  return (
   <header className="sticky top-0 z-50 bg-white">
      {/* Dark Green Top Bar */}
      <div className="bg-gradient-to-l from-green-900 via-green-900 to-blue-900 text-white p-4 flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          
          <div>
            <h1 className="text-2xl font-bold tracking-wider">SMART WASTE MANAGEMENT PORTAL</h1>
            <p className="text-sm">Eco Tycoon: Ultimate Trash Collector</p>
          </div>
        </div>
      </div>
      {/* Main Navigation Bar */}
      <nav className="bg-green-600 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
              
              <NavItem to="/" icon={<FaHome />} label="Home" />
              <NavItem to="/login" icon={<FaSignInAlt />} label="Login" />
              <NavItem to="/learn" icon={<FaBook />} label="Learn" />
              <NavItem to="/quiz" icon={<FaQuestionCircle />} label="Quiz" />
              <NavItem to="/game-zone" icon={<FaGamepad />} label="Game Zone" />
            
              <NavItem to="/live-tracking" icon={<FaBroadcastTower />} label="Live Tracking" />
              <NavItem to="/geo-tagging" icon={<FaMapMarkerAlt />} label="Geo-Tagging" />
              <NavItem to="/purchase" icon={<FaShoppingCart />} label="Purchase" />
              <NavItem to="/profile" icon={<FaUserCircle />} label="Profile" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Data for the Products
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const products = [
  {
    id: 1,
    name: "Smart Segregation Bin Set",
    image_url: smartbin,
    description: "3-compartment smart bin with sensors for wet, dry, and hazardous waste.",
    rating: 4.8,
    reviews: 156,
    price: 299,
    originalPrice: 399,
    discount: "25% OFF",
    category: "Smart Bins",
  },
  {
    id: 2,
    name: "Compost Maker Kit",
    description: "Complete kit for home composting with organic activator and guide.",
    rating: 4.6,
    reviews: 88,
    price: 149,
    originalPrice: 199,
    discount: "25% OFF",
    category: "Tools & Equipment",
  },
  {
    id: 3,
    name: "Organic Waste Decomposer",
    description: "Accelerates composting process, 100% organic and eco-friendly.",
    rating: 4.7,
    reviews: 234,
    price: 49,
    originalPrice: 69,
    discount: "29% OFF",
    category: "Organic Products",
  },
];


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN PURCHASE PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function PurchasePage() {
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header cartCount={cartCount} />

      <main className="container mx-auto py-10 px-4">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Purchase - Eco Store</h1>
          <p className="text-gray-500 mt-1">Sustainable products for effective waste management</p>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-3">
          <CategoryButton icon={<FaThLarge />} label="All Products" active={activeCategory === 'All Products'} onClick={setActiveCategory} />
          <CategoryButton icon={<FaBox />} label="Smart Bins" active={activeCategory === 'Smart Bins'} onClick={setActiveCategory} />
          <CategoryButton icon={<FaTools />} label="Tools & Equipment" active={activeCategory === 'Tools & Equipment'} onClick={setActiveCategory} />
          <CategoryButton icon={<FaSeedling />} label="Organic Products" active={activeCategory === 'Organic Products'} onClick={setActiveCategory} />
          <CategoryButton icon={<FaBookOpen />} label="Educational" active={activeCategory === 'Educational'} onClick={setActiveCategory} />
        </div>

        {/* Featured Products Banner */}
        <div className="bg-green-600 text-white p-6 rounded-lg mb-8 shadow-md">
          <h2 className="text-2xl font-bold flex items-center gap-2"><FaTag /> Featured Products</h2>
          <p className="opacity-90">Special offers on our best-selling eco-friendly products!</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </div>
      </main>
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Helper Components
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Button for Category Filters
const CategoryButton = ({ icon, label, active, onClick }) => (
  <button
    onClick={() => onClick(label)}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${
      active ? 'bg-green-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200'
    }`}
  >
    {icon} {label}
  </button>
);


// Card for displaying a single product
const ProductCard = ({ product, onAddToCart }) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <div className="bg-gray-100 h-48 flex items-center justify-center">
      <img src={product.image_url} alt={product.name} className="object-cover w-full h-full" />
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
      <p className="text-gray-600 mt-2 text-sm flex-grow">{product.description}</p>
      
      <div className="flex items-center gap-2 mt-4">
        <FaStar className="text-yellow-500" />
        <span className="font-bold text-gray-700">{product.rating}</span>
        <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
      </div>

      <div className="flex items-baseline gap-3 mt-4">
        <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
        <p className="text-gray-500 line-through">₹{product.originalPrice}</p>
        <p className="text-green-600 font-semibold">{product.discount}</p>
      </div>
      
      <button 
        onClick={onAddToCart}
        className=""
      >
         Add to Cart
      </button>
    </div>
  </div>
);

