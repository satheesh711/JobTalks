import { useState } from 'react'
// import './App.css'
import JobTalksLanding from './pages/Landing/Landing'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {

  return (
    <>
     <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/landing" element={<JobTalksLanding />} />
        {/* <Route path="/doclogin" element={<DocLogin />} />
        <Route path="/adlogin" element={<AdminLogin />} /> */}
        {/* Default Route */}
        <Route path="/" element={<Navigate to="/landing" />} />
        {/* Protected Admin Routes */}
        {/* <Route
          path="/admin"
          element={
            <AdminAuthGuard>
              <Admindash />
            </AdminAuthGuard>
          }
        /> */}
      </Routes>
    </Router>

    </>
  )
}

export default App
