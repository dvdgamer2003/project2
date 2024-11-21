import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import type { AuthError } from '@supabase/supabase-js';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const getErrorMessage = (error: AuthError) => {
    switch (error.message) {
      case 'User already registered':
        return 'An account with this email already exists';
      case 'Invalid email':
        return 'Please enter a valid email address';
      case 'Signup requires a valid password':
        return 'Please enter a valid password';
      default:
        return error.message || 'Failed to create account. Please try again.';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await signUp(email, password);
      
      if (error) {
        throw error;
      }

      if (data?.user) {
        toast.success('Account created! Please check your email to verify your account.');
        navigate('/signin');
      } else {
        throw new Error('Failed to create account');
      }
    } catch (error: any) {
      const message = error.__isAuthError ? getErrorMessage(error) : 'Network error. Please check your connection and try again.';
      toast.error(message);
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input mt-1"
          required
          autoComplete="email"
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input mt-1"
          required
          minLength={6}
          autoComplete="new-password"
        />
        <p className="text-sm text-gray-500 mt-1">Must be at least 6 characters long</p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input mt-1"
          required
          minLength={6}
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? (
          'Creating account...'
        ) : (
          <>
            <UserPlus className="w-4 h-4 mr-2" />
            Sign Up
          </>
        )}
      </button>
    </form>
  );
}