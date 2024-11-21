import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Hero() {
  return (
    <div className="bg-gradient-to-b from-purple-600 to-purple-900 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <Logo variant="purple" className="scale-150" />
        </div>
        <h1 className="text-5xl font-bold mb-6">
          Craft Your Perfect Resume
        </h1>
        <p className="text-xl mb-8 text-purple-100 max-w-2xl mx-auto">
          Create professional resumes in minutes with our intuitive builder.
          Stand out from the crowd and land your dream job.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/builder"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors inline-flex items-center space-x-2"
          >
            <span>Start Building Now</span>
            <ArrowRight size={20} />
          </Link>
          <Link
            to="/signup"
            className="bg-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-800 transition-colors inline-flex items-center space-x-2"
          >
            <span>Create Account</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}