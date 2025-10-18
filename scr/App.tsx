
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Dashboard from './pages/Dashboard'
import Subscriptions from './pages/Subscriptions'
import Chat from './pages/Chat'
import Translation from './pages/Translation'
import TextAnalysis from './pages/TextAnalysis'
import ImageGen from './pages/ImageGen'
import CodeAssistant from './pages/CodeAssistant'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/translation" element={<Translation />} />
          <Route path="/text-analysis" element={<TextAnalysis />} />
          <Route path="/image-gen" element={<ImageGen />} />
          <Route path="/code-assistant" element={<CodeAssistant />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
