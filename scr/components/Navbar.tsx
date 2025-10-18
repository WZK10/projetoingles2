
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import {Menu, X, BookOpen, User, LogOut, Crown} from 'lucide-react'

const Navbar: React.FC = () => {
  const { user, isAuthenticated, signIn, signOut } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  const handleAuthClick = async () => {
    if (isAuthenticated) {
      await signOut()
    } else {
      await signIn()
    }
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">English Master</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Início
            </Link>
            <Link
              to="/lessons"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/lessons') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Lições
            </Link>
            <Link
              to="/subscriptions"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/subscriptions') 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Planos
            </Link>
            {isAuthenticated && (
              <Link
                to="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Dashboard
              </Link>
            )}

            {/* Auth Button */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-600" />
                    <span className="text-sm text-gray-700">{user?.userName}</span>
                  </div>
                  <button
                    onClick={handleAuthClick}
                    className="flex items-center space-x-1 px-3 py-2 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleAuthClick}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Início
              </Link>
              <Link
                to="/lessons"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/lessons') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Lições
              </Link>
              <Link
                to="/subscriptions"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive('/subscriptions') 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                Planos
              </Link>
              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive('/dashboard') 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  Dashboard
                </Link>
              )}
              
              <div className="border-t pt-4 mt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <User className="h-5 w-5 text-gray-600" />
                      <span className="text-sm text-gray-700">{user?.userName}</span>
                    </div>
                    <button
                      onClick={handleAuthClick}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-left text-red-600 hover:text-red-700"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleAuthClick}
                    className="w-full bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Entrar
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
