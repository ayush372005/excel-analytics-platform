import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header className="flex justify-between items-center px-8 py-6 shadow-sm dark:shadow-md">
        <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
          <img src="/favicon.ico" alt="Logo" className="w-6 h-6" />
          Excel Analytics
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 dark:text-blue-300 hover:underline"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Sign up
          </button>
          <button
            onClick={toggleDarkMode}
            className="text-sm px-3 py-1 border rounded border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-8 py-20 max-w-6xl mx-auto gap-10">
        {/* Text Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">
            Analyze your Excel data effortlessly
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Upload Excel files and get instant visual insights. Secure, fast, and simple.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/register')}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-50 dark:border-blue-400 dark:text-blue-300 dark:hover:bg-gray-800"
            >
              Login
            </button>
          </div>
        </div>

        {/* Working Image */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?fit=crop&w=800&q=80"
            alt="Excel Analytics Preview"
            className="w-full max-w-md rounded-lg shadow-lg"
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
