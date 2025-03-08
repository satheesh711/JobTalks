import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import HandleSignup from "../../components/Authentication/SignUp";
import HandleLogin from "../../components/Authentication/LogIn";
import HandleGoogleLogin from "../../components/Authentication/Google";
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};
    
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const BASE_URL = "http://localhost:3000/users";

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => password.length >= 6;

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  
  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row className="w-75 shadow rounded bg-white p-4">
        <Col md={6} className="d-flex align-items-center justify-content-center mb-4">
          <motion.img 
            src="auth-image.jpg" 
            alt="Auth Illustration" 
            className="img-fluid rounded" 
            style={{ width: "90%", objectFit: "cover" }}
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5 }}
          />
        </Col>
        <Col md={6} className="p-4 text-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary fw-bold">{isSignup ? "Sign Up" : "Log In"}</h2>
            <Form onSubmit={isSignup ? HandleSignup : HandleLogin} className="mt-4">
              {isSignup && (
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              )}
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  {password && (
                    <span className="ms-2">
                      {isPasswordValid ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaTimesCircle className="text-danger" />
                      )}
                    </span>
                  )}
                </div>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="w-100 mb-2"
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : isSignup ? "Sign Up" : "Log In"}
              </Button>
            </Form>
            <Button
              variant="danger"
              className="w-100 mb-2"
              onClick={HandleGoogleLogin}
              disabled={loading}
            >
              <i className="fab fa-google me-2"></i>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : "Sign in with Google"}
            </Button>
            <p className="mt-3 text-center">
              {isSignup ? "Already have an account? " : "Don't have an account? "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? "Log in" : "Sign up"}
              </span>
            </p>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;

