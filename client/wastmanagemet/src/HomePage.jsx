import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import heroBg from './assets/homepage.png';
import {FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";

// Importing all necessary icons from react-icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaRecycle, FaChartLine, 
  FaBullseye, FaCommentDots, FaUsers, FaBookOpen, FaFingerprint
} from 'react-icons/fa';

export default function HomePage() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">

      {/* ===== Top Header Section ===== */}
      <header>
        {/* Dark Green Top Bar */}
        <div className="bg-gradient-to-l from-green-900 via-green-900 to-blue-900 text-white p-4 flex flex-col items-center text-center"
        >
          <div className="flex items-center gap-3">
            
            <div>
              <h1 className="text-2xl font-bold tracking-wider">SMART WASTE MANAGEMENT PORTAL</h1>
              <p className="text-sm">Eco Tycoon: Ultimate Trash Collector</p>
            </div>
          </div>
        </div>

        {/* Lighter Green Ticker Bar */}
        <div className="bg-green-600 text-white py-2 overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex gap-8">
            <span className="flex items-center gap-2"> 🚨Track your nearby waste vehicle!</span>
            <span className="flex items-center gap-2"> 🚨Real-time GPS tracking available</span>
            <span className="flex items-center gap-2"> 🚨Get accurate ETA predictions</span>
            <span className="flex items-center gap-2"> 🚨Track your nearest collection points</span>
          </div>
        </div>
      </header>

      {/* ===== Main Navigation Bar ===== */}
      <nav className="bg-[#114556] text-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-4">
             
              <NavItem to="/" icon={<FaHome />} label="Home" active />
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

      {/* ===== Hero Section ===== */}
      <main
        className="relative flex items-center justify-center h-[55vh] bg-cover bg-center text-center text-white"
        
      >
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: `url(${heroBg})`,
     filter: "blur(9px)",
    transform: "scale(1.05)"
  }}
></div>

        <div className="relative z-10 p-4">
          <h2 className="text-5xl font-extrabold mb-4 ">Welcome to Smart Waste Management</h2>
          <p className="text-lg mb-8">Step into an interactive world where you learn, play, and take actions that lead to big environmental change..</p>
<Link
  to="/login"
  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 inline-block"
>
  Start Your Eco Journey
</Link>        </div>
      </main>

      {/* ===== Statistics Section (NEW) ===== */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard icon={<FaUsers className="text-blue-500" />} value="20K+" label="Active Users" />
            <StatCard icon={<FaRecycle className="text-green-500" />} value="2.5M kg" label="Waste Recycled" />
            <StatCard icon={<FaBullseye className="text-green-500" />} value="1.2M" label="Eco Points Earned" />
            <StatCard icon={<FaChartLine className="text-blue-500" />} value="30%" label="Carbon Footprint Reduced" />
          </div>
        </div>
      </section>

      {/* ===== Features Section (NEW) ===== */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FeatureCard
              icon={<FaBookOpen />}
              title="Interactive Learning"
              description="Interactive learning platform designed to educate users about waste segregation, recycling methods, eco-friendly practices, and sustainable waste management through engaging activities and educational content."
            />
            <FeatureCard
              icon={<FaGamepad />}
              title="Eco Tycoon Game"
              description="Gamified waste management experience where users collect, sort, recycle, and manage waste while learning sustainable environmental practices."
            />
            <FeatureCard
              icon={<FaBroadcastTower />}
              title="Real-time Tracking"
              description="Live GPS-based tracking system for monitoring waste collection vehicles, nearby collection points, and estimated arrival times."
            />
            <FeatureCard
              icon={<FaFingerprint />}
              title="Smart Technology"
              description="Advanced smart waste management features including geo-tagging, biometric authentication, and digital monitoring for efficient operations."
            />
          </div>
        </div>
      </section>

      {/* ===== Bottom Navigation Bar ===== */}
      <ChatWidget />
      <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_5px_rgba(0,0,0,0.1)] z-50">
        <div className="container mx-auto flex justify-around p-2">

          </div>
      </footer>

      {/* ===== Floating Action Button ===== */}
     

    </div>
  );
}

// ========= Helper Components =========

// NavItem: For the top navigation bar
const NavItem = ({ to, icon, label, active = false }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      active ? 'bg-green-600' : 'hover:bg-cyan-600'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

// BottomNavItem: For the fixed bottom footer
const BottomNavItem = ({ icon }) => (
  <button className="text-gray-600 hover:text-cyan-500 transition-colors">
    {icon}
  </button>
);

// StatCard: For the statistics section
const StatCard = ({ icon, value, label }) => (
  <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex flex-col items-center text-center">
    <div className="text-4xl mb-3">{icon}</div>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
    <p className="text-gray-500 mt-1">{label}</p>
  </div>
);

// FeatureCard: For the features section
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm flex items-start gap-5">
    <div className="text-green-600 text-3xl mt-1">
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  </div>
);
const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi 👋 I’m your Eco Assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Got it 👍 I’ll help you with your query!" }
      ]);
    }, 600);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-20 right-8 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        <FaCommentDots size={22} />
      </button>

      {/* Chat Box */}
      {open && (
        <div className="fixed bottom-20 right-8 w-[90vw] max-w-sm h-[70vh] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="bg-green-600 text-white flex justify-between items-center p-3">
            <h2 className="font-semibold">Eco Assistant</h2>
            <button onClick={() => setOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "ml-auto bg-green-500 text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              onClick={sendMessage}
              className="bg-green-600 text-white px-3 rounded-lg"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
