import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Importing all necessary icons, including the new sign-out icon
import {
  FaHome, FaSignInAlt, FaBook, FaQuestionCircle, FaGamepad, FaBroadcastTower,
  FaMapMarkerAlt, FaShoppingCart, FaUserCircle, FaCog, FaEdit, FaLock, FaEnvelope, 
  FaMobileAlt, FaUserEdit, FaSignOutAlt
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
// +++ MAIN PROFILE PAGE COMPONENT
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // State for user data (you would fetch this from an API)
  const [userData, setUserData] = useState({
    fullName: 'John Doe',
    mobile: '9876543210',
    dob: '1995-08-15',
    gender: 'Male',
    state: 'California',
    district: 'Los Angeles',
    email: 'john.doe@example.com',
    userImage: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleLogout = () => {
    // In a real application, you would clear user session/token here
    console.log("User logged out");
    // e.g., history.push('/login');
  };

  // Helper component for form fields
  const FormField = ({ label, name, type = 'text', value, onChange }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
      />
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />

      <main className="container mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar Navigation */}
          <aside className="w-full md:w-1/4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-4">Settings</h3>
              <ul>
                <SidebarLink icon={<FaUserEdit />} label="My Profile" tabName="profile" activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarLink icon={<FaLock />} label="Account Settings" tabName="account" activeTab={activeTab} setActiveTab={setActiveTab} />
                <SidebarLink icon={<FaMobileAlt />} label="Update Contact" tabName="contact" activeTab={activeTab} setActiveTab={setActiveTab} />
              </ul>
            </div>
          </aside>

          {/* Content Area */}
          <div className="w-full md:w-3/4">
            
            {/* My Profile Section */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
                <div className="flex items-center gap-6 mb-6">
                  <img src={userData.userImage} alt="User" className="w-24 h-24 rounded-full object-cover"/>
                  <div>
                    <label htmlFor="userImage" className="cursor-pointer bg-cyan-800 text-white px-4 py-2 rounded-md hover:bg-cyan-800">Change Photo</label>
                    <input type="file" id="userImage" name="userImage" className="hidden" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField label="Full Name" name="fullName" value={userData.fullName} onChange={handleInputChange} />
                  <FormField label="Mobile Number" name="mobile" value={userData.mobile} onChange={handleInputChange} />
                  <FormField label="Date of Birth" name="dob" type="date" value={userData.dob} onChange={handleInputChange} />
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select name="gender" value={userData.gender} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                 <button className="mt-6 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition">Save Changes</button>
              </div>
            )}

            {/* Account Settings Section */}
            {activeTab === 'account' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Account Settings</h2>
                <div className="space-y-6">
                  <FormField label="State" name="state" value={userData.state} onChange={handleInputChange} />
                  <FormField label="District" name="district" value={userData.district} onChange={handleInputChange} />
                  <hr/>
                  <h3 className="font-semibold text-gray-700 pt-2">Change Password</h3>
                  <FormField label="New Password" name="newPassword" type="password" />
                  <FormField label="Confirm New Password" name="confirmPassword" type="password" />
                </div>
                <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition w-full sm:w-auto">Update Settings</button>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-600 transition w-full sm:w-auto"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}

            {/* Update Contact Section */}
            {activeTab === 'contact' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-2xl font-bold mb-6 text-gray-800">Update Contact Information</h2>
                 <div className="space-y-6">
                    <FormField label="Update Email" name="email" type="email" value={userData.email} onChange={handleInputChange} />
                    <FormField label="Update Mobile Number" name="mobile" value={userData.mobile} onChange={handleInputChange} />
                 </div>
                 <button className="mt-6 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition">Update Contact</button>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}

// Helper component for sidebar links
const SidebarLink = ({ icon, label, tabName, activeTab, setActiveTab }) => (
  <li className="mb-2">
    <button
      onClick={() => setActiveTab(tabName)}
      className={`w-full flex items-center gap-3 p-3 rounded-md text-left transition ${
        activeTab === tabName ? 'bg-cyan-800 text-white' : 'hover:bg-gray-200'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  </li>
);

