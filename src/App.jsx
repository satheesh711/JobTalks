// import './App.css'
import Landing from './pages/Landing/Landing';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home/Home';
import AuthPage from './pages/Authentication/Authentication';
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        {/* <Route path="/doclogin" element={<DocLogin />} />
        <Route path="/adlogin" element={<AdminLogin />} /> */}

        <Route path="/" element={<Navigate to="/landing" />} />

        <Route
          path="/Auth"
          element={
            // <AdminAuthGuard>
              <AuthPage />
            /* </AdminAuthGuard> */
          }
        />
        <Route
          path='/home'
          element={
            <Home />
          }
          />

      </Routes>
    </Router>

    </>
  )
}

export default App
