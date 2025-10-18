
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Subscriptions from './pages/Subscriptions'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: { 
            background: '#363636', 
            color: '#fff',
            borderRadius: '8px'
          },
          success: { 
            style: { 
              background: '#10b981',
              color: '#fff'
            } 
          },
          error: { 
            style: { 
              background: '#ef4444',
              color: '#fff'
            } 
          }
        }}
      />
      
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lessons" element={<Lessons />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </>
  )
}

export default App
