import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/auth/AuthProvider';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Builder from './pages/Builder';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/builder" element={<Builder />} />
              <Route path="/builder/:id" element={<Builder />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;