import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Importing all necessary icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaPlayCircle, FaFileAlt,
  FaRecycle, FaLeaf, FaHourglassHalf, FaLandmark, FaTrash, FaUserFriends, FaLightbulb,
  FaVideo, FaBookOpen, FaCertificate
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
// +++ Data for the Learning Modules
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const courses = [
  {
    icon: <FaRecycle />,
    title: "Source Segregation",
    tag: "45% waste reduction potential",
    tagColor: "bg-green-100 text-green-800",
    points: [
      "Wet vs Dry waste classification",
      "Color-coded bin system",
      "Hazardous waste identification",
      "Best practices for households",
    ],
  },
  {
    icon: <FaLeaf />,
    title: "Composting Techniques",
    tag: "25% organic waste diverted",
    tagColor: "bg-green-100 text-green-800",
    points: [
      "Home composting methods",
      "Vermicomposting setup",
      "Bokashi composting technique",
      "Troubleshooting common issues",
    ],
  },
  {
    icon: <FaHourglassHalf />,
    title: "How Waste Management Works?",
    points: [
      "Waste generation: Understanding the source",
      "Collection: The first step in the chain",
      "Segregation: Sorting for value",
      "Transportation: Moving waste efficiently",
      "Processing & Recycling: Creating new from old",
      "Final Disposal: Landfills and beyond",
    ],
  },
  {
    icon: <FaLandmark />,
    title: "Case Studies & Incidents (India)",
    points: [
      "Ghaziabad Landfill fire: A lesson in safety",
      "Indore: Cleanest city success story",
      "Bellandur Lake fires (Bengaluru): Environmental impact",
      "Kolkata waste segregation drive: A community effort",
      "Surat: Swachh Bharat Success Story (Gujarat)",
    ],
  },
  {
    icon: <FaTrash />,
    title: "Types of Waste Generated",
    points: [
      "Wet / Organic Waste: From kitchen to compost",
      "Dry Waste: Paper, plastic, glass, and metal",
      "E-Waste: The growing challenge of electronics",
      "Hazardous Waste: Batteries, paints, and chemicals",
    ],
  },
  {
    icon: <FaUserFriends />,
    title: "What Citizens Can Do?",
    points: [
      "Segregation at home: The power of one",
      "Composting Kitchen Waste: Turn scraps into soil",
      "Reducing Single-Use Plastics: A crucial step",
      "Participating in Cleanliness Drives",
    ],
  },
  {
    icon: <FaLightbulb />,
    title: "Future of Waste Management",
    points: [
      "Smart Bins with IoT sensors",
      "AI for Waste Sorting and efficiency",
      "Waste to Energy plants: Power from trash",
      "Circular Economy & Sustainability goals",
    ],
  },
];


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN LEARN PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function LearnPage() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto py-10 px-4">
        {/* Learning Hub Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <FaBookOpen className="text-cyan-800" />
            Learning Hub
          </h1>
          <p className="text-gray-600 mt-2">Master sustainable waste management through interactive learning</p>
        </div>

        {/* User Progress Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-10 border-t-4 border-cyan-700">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Your Progress</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <ProgressStat value="4/6" label="Modules Completed" />
            <ProgressStat value="18" label="Videos Watched" icon={<FaVideo />} />
            <ProgressStat value="850" label="Learning Points" />
            <ProgressStat value="12" label="Certificates" icon={<FaCertificate />} />
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Helper Components
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const ProgressStat = ({ value, label, icon }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <p className="text-3xl font-bold text-cyan-800 flex items-center justify-center gap-2">
      {icon} {value}
    </p>
    <p className="text-sm text-gray-500 mt-1">{label}</p>
  </div>
);

const CourseCard = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <div className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="text-3xl text-green-600 mt-1">{course.icon}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
          </div>
        </div>
        {course.tag && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${course.tagColor}`}>
            {course.tag}
          </span>
        )}
      </div>
      <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600">
        {course.points.map((point, i) => <li key={i}>{point}</li>)}
      </ul>
    </div>
    <div className="bg-gray-50 p-4 flex justify-end gap-4 border-t">
      <button className="flex items-center gap-2 text-sm font-semibold text-red-800 hover:text-cyan-800">
        <FaPlayCircle /> Watch Video
      </button>
      <button className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black">
        <FaFileAlt /> Read More
      </button>
    </div>
  </div>
);

