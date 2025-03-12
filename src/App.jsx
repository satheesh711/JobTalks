import { ToastContainer } from 'react-toastify';
import { AuthLayout } from './components/Authentication/AthenticationLayout';
import AuthenticanGuard from './components/Authentication/AuthentionGuard';
import { LoginForm } from './components/Authentication/LoginForm';
import { SignupForm } from './components/Authentication/SignupForm';
import Companies from './components/Main/Companies';
import Home from './components/Main/Home';
import Navbar from './components/Main/Navbar';
import Reviews from './components/Main/Reviews';
import Salaries from './components/Main/Salaries';
import Landing from './pages/Landing/Landing';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import CompanyProfile from './components/Main/CompanyProfile';
import ErrorBoundary from './components/Main/ErrorBoundary';
import AddReview from './components/Main/AddReview';
import Search from './components/Main/Search';

const AuthenticatedLayout = () => (
  <div className="min-vh-100 d-flex flex-column">
    <Navbar />
    <main className="flex-grow-1">
      <Outlet />
    </main>
  </div>
);

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />
      } />

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
          path="/home"
          element={
            <AuthenticanGuard>
              <AuthenticatedLayout />
            </AuthenticanGuard>
          }
        >
          <Route path='/home' element={<Home />} />
          <Route path="companies" element={<Companies />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="search" element={<Search />} />
          <Route path="salaries" element={<Salaries />} />
            <Route path="companies/:id" element={
          <ErrorBoundary>
              <CompanyProfile />
          </ErrorBoundary>
              } />
            <Route path="companies/:id/review/new" element={
          <ErrorBoundary>
              <AddReview />
          </ErrorBoundary>
        } />
       

        </Route>
      </Routes>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
