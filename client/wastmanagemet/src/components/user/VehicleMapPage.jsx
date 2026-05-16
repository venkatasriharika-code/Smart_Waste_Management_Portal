import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';

// Importing all necessary icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaTruck, FaArrowLeft,
  FaTachometerAlt, FaSignal, FaBatteryThreeQuarters
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
          isActive ? 'bg-[#5e5c5ed8]' : 'hover:bg-cyan-600'
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
// +++ MAIN VEHICLE MAP PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function VehicleMapPage() {
  const { vehicleId } = useParams();
  const navigate = useNavigate();
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    // Generate a random location around Vijayawada, India
    const lat = 16.5062 + (Math.random() - 0.5) * 0.1; // Latitude
    const lon = 80.6480 + (Math.random() - 0.5) * 0.1; // Longitude

    // Create an embed URL for OpenStreetMap with a marker
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.01},${lat-0.01},${lon+0.01},${lat+0.01}&layer=mapnik&marker=${lat},${lon}`;
    setMapUrl(url);
  }, [vehicleId]); // Rerun when the vehicleId changes

  return (
    <div className="bg-[#f0f7f4] min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tracking Vehicle: {vehicleId}</h1>
            <p className="text-gray-500 mt-1">Live location and status details</p>
          </div>
          <button 
            onClick={() => navigate('/live-tracking')}
            className="bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-700 transition"
          >
            <FaArrowLeft /> Back to List
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map Section */}
          <div className="w-full lg:w-2/3 h-96 lg:h-[60vh] bg-white rounded-xl shadow-lg overflow-hidden border">
            {mapUrl ? (
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                scrolling="no"
                marginHeight="0"
                marginWidth="0"
                src={mapUrl}
                title={`Map of ${vehicleId}`}
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full">Loading map...</div>
            )}
          </div>

          {/* Details Card Section */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-lg border">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-4">
                <FaTruck className="text-green-600" />
                Vehicle Details
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><FaSignal /> Status:</span>
                  <span className="font-bold text-green-600 bg-green-100 px-2 py-1 rounded">Active</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><FaTachometerAlt /> Speed:</span>
                  <span className="font-bold">45 km/h</span>
                </li>
                 <li className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><FaBatteryThreeQuarters /> Capacity:</span>
                  <span className="font-bold">72%</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-semibold flex items-center gap-2"><FaMapMarkerAlt /> Last Updated:</span>
                  <span className="font-bold">Just now</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

