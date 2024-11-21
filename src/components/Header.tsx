import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Logo from './Logo';

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-purple-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <nav>
            <ul className="flex space-x-6 items-center">
              <li>
                <Link to="/templates" className="hover:text-purple-200 transition-colors">
                  Templates
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/dashboard" className="hover:text-purple-200 transition-colors">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => signOut()}
                      className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="hover:text-purple-200 transition-colors"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}