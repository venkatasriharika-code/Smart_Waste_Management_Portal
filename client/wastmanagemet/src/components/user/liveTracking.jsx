import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// Importing all necessary icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaTruck, FaMapPin,
  FaRoute, FaClock, FaBatteryFull, FaSync, FaExclamationTriangle, FaPauseCircle
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
// +++ Initial Data for the Vehicles
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const initialVehicles = [
  {
    id: "WM001",
    sector: "Sector 15-20",
    status: "Active",
    current: "Sector 17, Block A",
    next: "Sector 18, Main Road",
    eta: "15 mins",
    capacity: 72,
  },
  {
    id: "WM002",
    sector: "Sector 21-25",
    status: "Active",
    current: "Sector 23, Park Street",
    next: "Sector 24, Mall Road",
    eta: "8 mins",
    capacity: 49,
  },
  {
    id: "WM003",
    sector: "Sector 26-30",
    status: "Idle",
    current: "Collection Center",
    capacity: 0,
  },
  {
    id: "WM004",
    sector: "Industrial Area",
    status: "Maintenance",
    current: "Maintenance Depot",
    capacity: 0,
  },
];

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN LIVE TRACKING PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function LiveTrackingPage() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const navigate = useNavigate();

  // Function to handle the refresh action
  const handleRefresh = () => {
    const statuses = ["Active", "Idle", "Maintenance"];
    
    const updatedVehicles = vehicles.map(vehicle => {
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      let newDetails = {};

      switch (newStatus) {
        case "Active":
          newDetails = {
            status: "Active",
            current: `Sector ${Math.floor(Math.random() * 50) + 1}, Block ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`,
            next: `Sector ${Math.floor(Math.random() * 50) + 1}, Main Road`,
            eta: `${Math.floor(Math.random() * 20) + 1} mins`,
            capacity: Math.floor(Math.random() * 101),
          };
          break;
        case "Idle":
          newDetails = {
            status: "Idle",
            current: "Collection Center",
            next: null,
            eta: null,
            capacity: 0,
          };
          break;
        case "Maintenance":
          newDetails = {
            status: "Maintenance",
            current: "Maintenance Depot",
            next: null,
            eta: null,
            capacity: 0,
          };
          break;
        default:
          break;
      }

      return { ...vehicle, ...newDetails };
    });

    setVehicles(updatedVehicles);
  };

  return (
    <div className="bg-[#f0f7f4] min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Live Vehicle Tracking</h1>
            <p className="text-gray-500 mt-1">Real-time tracking of waste collection vehicles</p>
          </div>
          <button 
            onClick={handleRefresh}
            className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <FaSync /> Refresh
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {vehicles.map(vehicle => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} onClick={() => navigate(`/track/${vehicle.id}`)} />
          ))}
        </div>
      </main>
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Helper Component: VehicleCard
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const VehicleCard = ({ vehicle, onClick }) => {
  const statusStyles = {
    Active: "bg-green-100 text-green-800",
    Idle: "bg-yellow-100 text-yellow-800",
    Maintenance: "bg-red-100 text-red-800",
  };

  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-lg hover:border-green-500 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2"><FaTruck /> {vehicle.id}</h3>
          <p className="text-sm text-gray-500">{vehicle.sector}</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyles[vehicle.status]}`}>
          {vehicle.status}
        </span>
      </div>

      {vehicle.status === 'Active' && (
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2 text-gray-700"><FaMapPin className="text-blue-500" /> <strong>Current:</strong> {vehicle.current}</p>
          <p className="flex items-center gap-2 text-gray-700"><FaRoute className="text-purple-500" /> <strong>Next:</strong> {vehicle.next}</p>
          <p className="flex items-center gap-2 text-gray-700"><FaClock className="text-orange-500" /> <strong>ETA:</strong> {vehicle.eta}</p>
        </div>
      )}
      
      {vehicle.status === 'Idle' && (
         <p className="flex items-center gap-2 text-sm text-gray-700"><FaPauseCircle className="text-yellow-500" /> <strong>Current:</strong> {vehicle.current}</p>
      )}

      {vehicle.status === 'Maintenance' && (
         <p className="flex items-center gap-2 text-sm text-gray-700"><FaExclamationTriangle className="text-red-500" /> <strong>Current:</strong> {vehicle.current}</p>
      )}

      <div className="mt-4">
        <label className="text-sm font-medium text-gray-600">Capacity</label>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${vehicle.capacity}%` }}></div>
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">{vehicle.capacity}%</p>
      </div>
    </div>
  );
};

