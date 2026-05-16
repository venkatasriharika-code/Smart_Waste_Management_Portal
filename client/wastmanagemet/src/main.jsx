import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route, Link } from 'react-router-dom'

import './index.css'
import HomePage from './HomePage.jsx'
import Login from './components/common/login.jsx'
import Signup from './components/common/Signup.jsx'
import Profile from './components/user/profile.jsx'
import Learn from './components/user/learn.jsx'
import Quiz from './components/user/quiz.jsx'
import LiveTracking from './components/user/liveTracking.jsx'
import GeoTagging from './components/user/geoTagging.jsx'
import Purchase from './components/user/purchase.jsx'
import VehicleMapPage from './components/user/VehicleMapPage.jsx'


 
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/learn" element={<Learn/>}/>
          <Route path="/quiz" element={<Quiz/>}/> 
          <Route path="/track/:vehicleId" element={<VehicleMapPage/>}/>
          <Route path="/live-tracking" element={<LiveTracking/>}/>
          <Route path="/geo-tagging" element={<GeoTagging/>}/>
          <Route path="/purchase" element={<Purchase/>}/> 

        </Routes>
  </BrowserRouter>,
)
