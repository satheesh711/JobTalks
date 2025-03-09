import { AuthLayout } from './components/Authentication/AthenticationLayout';
import { LoginForm } from './components/Authentication/LoginForm';
import { SignupForm } from './components/Authentication/SignupForm';
import Home from './pages/Home/Home';
import Landing from './pages/Landing/Landing';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />

        <Route path="/" element={<Navigate to="/landing" />} />

        <Route 
          path="/login" 
          element={
            <AuthLayout 
              title="Welcome back" 
              subtitle="Login in to your account to continue"
            >
              <LoginForm />
            </AuthLayout>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <AuthLayout 
              title="Create an account" 
              subtitle="Sign up to get started"
            >
              <SignupForm />
            </AuthLayout>
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
