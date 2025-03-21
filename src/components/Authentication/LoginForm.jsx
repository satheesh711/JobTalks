import { useState } from 'react';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../Services/firebase';
import { checkUserExists, addUser, checkCredentials, getUserId} from '../../Services/users';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(0,"")
});

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userMessage, setUserMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data) => {
    try {
      setIsLoading(true);
      const userExists = await checkUserExists(data.email);
      if (!userExists) {
        setUserMessage('User not found. Please sign up first')
        toast.error('User not found. Please sign up first.');
        return;
      }
      const checkCredential = await checkCredentials(data.email,data.password)
      if(!checkCredential)
      {
        setUserMessage("Please Check Your Credentials")
        toast.error('Please Check Your Credentials');
        return ;
      }
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success('Successfully logged in!');
      const id = await getUserId(data.email)
      navigate('/home' ,  { state: { id } });
    } catch (error) {
      setUserMessage("Invalid credentials email");
      toast.error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const userExists = await checkUserExists(result.user.email);
      
      if (!userExists) {
        const userData = {
          id: Date.now().toString(),
          name: result.user.displayName,
          email: result.user.email,
          method: 'google'
        };
        await addUser(userData);
      }

      toast.success('Successfully logged in with Google!');
      const id = await getUserId(result.user.email)
      navigate('/home', { state: { id } });
    } catch (error) {
      setUserMessage("Failed to login with Google")
      toast.error('Failed to login with Google');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <div className="input-group">
            <span className="input-group-text">
              <Mail size={20} className="text-muted" />
            </span>
            <input
              {...register('email')}
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <Lock size={20} className="text-muted" />
            </span>
            <input
              {...register('password')}
              type="password"
              className={`form-control`}
              placeholder="Enter your password"
            />
             
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-100 mb-3"
        >
          {isLoading ? 'Loading...' : 'Log in'}
        </motion.button>

        {userMessage && (
            <div className="alert alert-danger mt-2" role="alert">
               {userMessage}
            </div>
          )}

      </form>

      <div className="divider">
        <span>Or continue with</span>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleLogin}
        className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" width="20" height="20" />
        Google
      </motion.button>

      <p className="text-center mt-4 mb-0">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary text-decoration-none">
          Sign up
        </Link>
      </p>
    </div>
  );
}