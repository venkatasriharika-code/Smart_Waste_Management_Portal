import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Importing all necessary icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaMapPin, FaCamera,
  FaPaperPlane, FaCrosshairs, FaExclamationTriangle, FaTrash
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
// +++ MAIN GEO-TAGGING PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function GeoTaggingPage() {
  const [location, setLocation] = useState(null);
  const [mapUrl, setMapUrl] = useState('');
   const [status, setStatus] = useState('Fetching location...');
  const [report, setReport] = useState({
    issueType: 'Bin Overflowing',
    notes: '',
    photoName: ''
  });

  const updateMapUrl = (lat, lon) => {
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-0.005},${lat-0.005},${lon+0.005},${lat+0.005}&layer=mapnik&marker=${lat},${lon}`;
    setMapUrl(url);
  };
  
  const handleGetLocation = () => {
    setStatus('Fetching location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          updateMapUrl(latitude, longitude);
          setStatus('Location found!');
        },
        (error) => {
          console.error("Error getting location:", error);
          setStatus('Could not get location. Please enable permissions.');
          // Fallback to a default location
          const defaultLocation = { lat: 16.5062, lon: 80.6480 };
          setLocation(defaultLocation);
          updateMapUrl(defaultLocation.lat, defaultLocation.lon);
        }
      );
    } else {
      setStatus("Geolocation is not supported by your browser.");
      const defaultLocation = { lat: 16.5062, lon: 80.6480 };
      setLocation(defaultLocation);
      updateMapUrl(defaultLocation.lat, defaultLocation.lon);
    }
  };

  useEffect(() => {
    handleGetLocation(); // Get location on initial component mount
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setReport(prev => ({ ...prev, photoName: files[0] ? files[0].name : '' }));
    } else {
      setReport(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!location) {
      alert("Please provide a location before submitting.");
      return;
    }
    alert(`Report Submitted!\nLocation: ${location.lat.toFixed(4)}, ${location.lon.toFixed(4)}\nIssue: ${report.issueType}\nNotes: ${report.notes}\nPhoto: ${report.photoName || 'None'}`);
  };

  return (
    <div className="bg-[#f0f7f4] min-h-screen">
      <Header />
      <main className="container mx-auto py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <FaMapPin className="text-cyan-500" />
            Geo-tag an Issue
          </h1>
          <p className="text-gray-600 mt-2">Report overflowing bins or illegal dumping sites in your area.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Map and Location Section */}
          <div className="w-full lg:w-3/5">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border h-80 lg:h-[calc(100%-6rem)]">
              {mapUrl ? (
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  src={mapUrl}
                  title="Issue Location Map"
                ></iframe>
              ) : (
                 <div className="flex items-center justify-center h-full text-gray-500">{status}</div>
              )}
            </div>
            <button
              onClick={handleGetLocation}
              className="w-full mt-4 bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-cyan-600 transition"
            >
              <FaCrosshairs /> Get Current Location
            </button>
          </div>

          {/* Report Form Section */}
          <div className="w-full lg:w-2/5">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border h-full">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Report Details</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Coordinates</label>
                <div className="flex gap-2">
                  <input type="text" value={location ? `Lat: ${location.lat.toFixed(4)}` : 'Loading...'} readOnly className="w-1/2 bg-gray-100 p-2 rounded border"/>
                  <input type="text" value={location ? `Lon: ${location.lon.toFixed(4)}` : 'Loading...'} readOnly className="w-1/2 bg-gray-100 p-2 rounded border"/>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 mb-1">Type of Issue</label>
                <div className="relative">
                  <FaExclamationTriangle className="absolute top-3 left-3 text-gray-400" />
                  <select id="issueType" name="issueType" value={report.issueType} onChange={handleInputChange} className="w-full pl-10 p-2 rounded border appearance-none">
                    <option>Bin Overflowing</option>
                    <option>Illegal Dumping</option>
                    <option>Waste Not Collected</option>
                    <option>Damaged Public Bin</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea id="notes" name="notes" rows="4" value={report.notes} onChange={handleInputChange} placeholder="e.g., Behind the bus stop on the main road..." className="w-full p-2 rounded border"></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
                <label htmlFor="photo" className="w-full border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
                  <FaCamera className="text-3xl text-gray-400 mb-2"/>
                  <span className="text-sm text-gray-500">{report.photoName || 'Click to select a file'}</span>
                </label>
                <input type="file" id="photo" name="photo" onChange={handleInputChange} className="hidden" accept="image/*"/>
              </div>

              <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg flex items-center justify-center gap-2 hover:bg-green-700 transition">
                <FaPaperPlane /> Submit Report
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

