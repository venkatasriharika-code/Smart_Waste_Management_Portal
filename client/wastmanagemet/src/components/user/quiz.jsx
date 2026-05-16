import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Importing all necessary icons
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaRecycle, FaLeaf,
  FaTrashAlt, FaListOl, FaClock, FaArrowLeft
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
// +++ Data for the Quiz Levels
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const quizLevels = [
  {
    id: 1,
    title: "Recycling Basics",
    description: "Test your knowledge on what can and cannot be recycled.",
    icon: <FaRecycle />,
    color: "blue",
    details: {
      type: "Multiple Choice",
      questions: 10,
      time: "5 minutes",
    },
  },
  {
    id: 2,
    title: "Composting Fun",
    description: "Learn the fundamentals of turning waste into wealth.",
    icon: <FaLeaf />,
    color: "green",
    details: {
      type: "True / False",
      questions: 15,
      time: "7 minutes",
    },
  },
  {
    id: 3,
    title: "Trash Challenge",
    description: "A challenging quiz on hazardous and e-waste management.",
    icon: <FaTrashAlt />,
    color: "red",
    details: {
      type: "Mixed Format",
      questions: 20,
      time: "10 minutes",
    },
  },
];


// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ MAIN QUIZ PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function QuizPage() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto py-10 px-4">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center gap-3">
            <FaQuestionCircle className="text-cyan-800" />
            Quiz Zone
          </h1>
          <p className="text-gray-600 mt-2">Select a level to test your knowledge and earn points!</p>
        </div>

        {/* Conditional Rendering: Show Levels or Details */}
        {!selectedQuiz ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quizLevels.map((quiz) => (
              <QuizLevelCard key={quiz.id} quiz={quiz} onSelect={() => setSelectedQuiz(quiz)} />
            ))}
          </div>
        ) : (
          <QuizDetailsCard quiz={selectedQuiz} onBack={() => setSelectedQuiz(null)} />
        )}
      </main>
    </div>
  );
}

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// +++ Helper Components
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Card for showing the quiz level choice
const QuizLevelCard = ({ quiz, onSelect }) => {
  const colors = {
    blue: "from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    green: "from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    red: "from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
  };

  return (
    <div
      onClick={onSelect}
      className={`bg-gradient-to-br ${colors[quiz.color]} text-white p-8 rounded-xl shadow-lg cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center`}
    >
      <div className="text-6xl mb-4">{quiz.icon}</div>
      <h3 className="text-2xl font-bold mb-2">{quiz.title}</h3>
      <p className="text-sm opacity-90">{quiz.description}</p>
    </div>
  );
};

// Card for showing details of the selected quiz
const QuizDetailsCard = ({ quiz, onBack }) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg relative animate-fade-in">
      <button
        onClick={onBack}
        className="absolute top-4 left-6 text-gray-500 hover:text-gray-800 transition-colors"
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="text-center">
        <div className={`text-6xl mb-4 text-${quiz.color}-500 inline-block`}>{quiz.icon}</div>
        <h2 className="text-3xl font-bold text-gray-800">{quiz.title}</h2>
      </div>

      <div className="mt-8 border-t pt-6">
        <ul className="space-y-4 text-lg">
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-600 flex items-center gap-2"><FaQuestionCircle /> Type:</span>
            <span className="font-bold text-gray-800">{quiz.details.type}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-600 flex items-center gap-2"><FaListOl /> Questions:</span>
            <span className="font-bold text-gray-800">{quiz.details.questions}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="font-semibold text-gray-600 flex items-center gap-2"><FaClock /> Time Limit:</span>
            <span className="font-bold text-gray-800">{quiz.details.time}</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button className={`w-full bg-${quiz.color}-500 hover:bg-${quiz.color}-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105`}>
          Start Quiz
        </button>
      </div>
    </div>
  );
};



