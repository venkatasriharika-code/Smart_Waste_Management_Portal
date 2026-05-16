import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Using the same placeholder for a consistent background
const bg = 'https://placehold.co/1920x1080/22c55e/ffffff?text=Smart+Waste+Management';

// --- SVG Icon Component (Reused from Login) ---

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

// --- User Type Button Component (Reused from Login) ---

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

// --- Main Signup Component ---

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('user'); // Corresponds to 'role'
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  /**
   * Handles the form submission to register a new user.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation: check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      // The API endpoint changes based on the selected userType (role)
      const response = await axios.post(
        `http://localhost:8060/api/${userType}/register`,
        {
          name,
          email,
          password,
          role: userType,
        }
      );

      // Handle successful registration
      setSuccess("Registration successful! Redirecting to login...");
      
      // Redirect to the login page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      // Handle registration errors from the backend
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
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
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl mx-4 border-t-4 border-green-600">
        <div className="flex flex-col items-center space-y-2">
          <WasteIcon />
          <h1 className="text-3xl font-bold text-green-700">
            Create an Account
          </h1>
          <p className="text-gray-500">Join the Smart Waste initiative</p>
        </div>

        {/* User Type Selector */}
        <div className="flex p-1 space-x-1 bg-blue-100 rounded-xl">
          <UserTypeButton type="user" selectedType={userType} setSelectedType={setUserType} />
          <UserTypeButton type="worker" selectedType={userType} setSelectedType={setUserType} />
          <UserTypeButton type="admin" selectedType={userType} setSelectedType={setUserType} />
        </div>

        {/* Signup Form */}
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {/* Reusing the floating label input style from the login page */}
          <div className="relative">
            <input id="name" name="name" type="text" required
              className="peer w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="name" className="absolute left-4 -top-3.5 text-green-700 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
              Full Name
            </label>
          </div>
          <div className="relative">
            <input id="email" name="email" type="email" required
              className="peer w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="email" className="absolute left-4 -top-3.5 text-green-700 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
              Email Address
            </label>
          </div>
          <div className="relative">
            <input id="password" name="password" type="password" required
              className="peer w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password" className="absolute left-4 -top-3.5 text-green-700 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
              Password
            </label>
          </div>
          <div className="relative">
            <input id="confirmPassword" name="confirmPassword" type="password" required
              className="peer w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <label htmlFor="confirmPassword" className="absolute left-4 -top-3.5 text-green-700 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-3.5 peer-focus:text-green-700 peer-focus:text-sm">
              Confirm Password
            </label>
          </div>
          
          {error && <p className="text-sm text-red-600 text-center font-medium">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center font-medium">{success}</p>}

          <div>
            <button
              type="submit"
              className="group relative flex justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-transform transform hover:scale-105"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="pt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-700 hover:text-green-800">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
