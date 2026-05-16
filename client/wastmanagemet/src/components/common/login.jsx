import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// NOTE: You'll need to replace this with the actual path to your background image.
// For this example, I'm using a placeholder.
const bg = '../../assests/image.png';

// --- Helper Functions ---

/**
 * Sets a cookie in the browser.
 * @param {string} name - The name of the cookie.
 * @param {string} value - The value of the cookie.
 * @param {number} days - The number of days until the cookie expires.
 */
function setCookie(name, value, days) {
  const expire = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expire}; path=/`;
}


// --- SVG Icon Component ---

const WasteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 text-green-700"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);


// --- User Type Button Component ---

const UserTypeButton = ({ type, selectedType, setSelectedType }) => {
  const isSelected = type === selectedType;
  const baseClasses =
    "w-full py-2.5 text-sm font-semibold leading-5 rounded-lg focus:outline-none transition-all duration-300 ease-in-out";
  const selectedClasses =
    "bg-green-600 text-white shadow-md hover:bg-green-700";
  const unselectedClasses =
    "text-gray-700 hover:bg-teal-100 hover:text-green-700 dark:text-gray-300 dark:hover:bg-gray-700";

  return (
    <button
      type="button"
      onClick={() => setSelectedType(type)}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </button>
  );
};


// --- Main App Component (Login Page) ---

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Corresponds to 'role'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission to log the user in.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post(
        `http://localhost:8060/api/${userType}/login`, // Use userType for the role in the URL
        {
          email: email,
          password: password,
          role: userType // The backend might also expect the role in the body
        }
      );

      // Using alert as in the original code, but a toast notification would be better UX
      alert(response.data.message);

      // Set the authentication token in a cookie
      setCookie("token", response.data.token, 1);

      // Navigate to the dashboard on successful login
      navigate('/');

    } catch (err) {
      // Handle login errors
      if (err.response && err.response.data && err.response.data.message) {
        // Prefer the specific error message from the server
        setError(err.response.data.message);
      } else {
        // Fallback to a generic error message
        setError(err.message || "An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen font-sans bg-gray-100">
      {/* Blurred Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${bg}')`,
          filter: "blur(6px)",
          transform: "scale(1.05)"
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-700/40 to-blue-700/40"></div>

      {/* Foreground Form */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl mx-4 border-t-4 border-green-600">
        <div className="flex flex-col items-center space-y-2">
          <WasteIcon />
          <h1 className="text-3xl font-bold text-green-700">
            Smart Waste Portal
          </h1>
          <p className="text-gray-500">Sign in to your portal</p>
        </div>

        {/* User Type Selector */}
        <div className="flex p-1 space-x-1 bg-blue-100 rounded-xl">
          <UserTypeButton type="user" selectedType={userType} setSelectedType={setUserType} />
          <UserTypeButton type="worker" selectedType={userType} setSelectedType={setUserType} />
          <UserTypeButton type="admin" selectedType={userType} setSelectedType={setUserType} />
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              required
              className="peer w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label
              htmlFor="email"
              className="absolute left-4 -top-3.5 text-green-700 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm"
            >
              Email Address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="peer w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label
              htmlFor="password"
              className="absolute left-4 -top-3.5 text-green-700 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          {error && <p className="text-sm text-red-600 text-center font-medium">{error}</p>}

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-600 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-medium text-green-700 hover:text-green-800">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-transform transform hover:scale-105"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center justify-center">
          <span className="h-px w-1/3 bg-gray-300"></span>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <span className="h-px w-1/3 bg-gray-300"></span>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5 mr-2" />
            Continue with Google
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700">
            <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="Facebook" className="h-5 w-5 mr-2 bg-white rounded-full" />
            Continue with Facebook
          </button>
        </div>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-green-700 hover:text-green-800">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
