
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {Image, Download, Copy, Wand2, Palette, Sparkles} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface GeneratedImage {
  id: string
  prompt: string
  style: string
  url: string
  timestamp: Date
}

const ImageGen: React.FC = () => {
  const { isAuthenticated, signIn } = useAuth()
  const [prompt, setPrompt] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('realistic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])

  const styles = [
    { id: 'realistic', name: 'Realistic', description: 'Photorealistic images' },
    { id: 'artistic', name: 'Artistic', description: 'Artistic and creative style' },
    { id: 'cartoon', name: 'Cartoon', description: 'Cartoon and animated style' },
    { id: 'abstract', name: 'Abstract', description: 'Abstract and conceptual' },
    { id: 'vintage', name: 'Vintage', description: 'Retro and vintage look' },
    { id: 'futuristic', name: 'Futuristic', description: 'Sci-fi and futuristic' },
  ]

  const samplePrompts = [
    'A peaceful mountain landscape at sunset',
    'A modern classroom with students learning English',
    'A cozy library filled with books',
    'A person reading a book under a tree',
    'A futuristic city with flying cars',
    'A beautiful garden with colorful flowers',
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    if (!isAuthenticated) {
      await signIn()
      return
    }

    setIsGenerating(true)

    // Simulate image generation
    setTimeout(() => {
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        prompt,
        style: selectedStyle,
        url: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000) + 1000000}/pexels-photo-${Math.floor(Math.random() * 1000000) + 1000000}.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1`,
        timestamp: new Date()
      }

      setGeneratedImages(prev => [newImage, ...prev])
      setIsGenerating(false)
      toast.success('Image generated successfully!')
    }, 3000)
  }

  const handleDownload = (imageUrl: string, prompt: string) => {
    // In a real app, this would download the image
    toast.success('Download started!')
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <Image className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI Image Generator
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to create stunning images with AI. Transform your ideas into beautiful visuals.
          </p>
          <button
            onClick={signIn}
            className="btn-primary w-full"
          >
            Sign In to Generate
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Generator</h1>
          <p className="text-gray-600">Create stunning images from text descriptions</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generation Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New Image</h2>

              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your image
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the image you want to generate..."
                  className="w-full h-24 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Style Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Choose a style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-3 border rounded-lg text-left transition-colors ${
                        selectedStyle === style.id
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-medium text-sm">{style.name}</div>
                      <div className="text-xs text-gray-500">{style.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4" />
                    <span>Generate Image</span>
                  </>
                )}
              </button>
            </motion.div>

            {/* Sample Prompts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Sample Prompts</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {samplePrompts.map((samplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(samplePrompt)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm text-gray-700">{samplePrompt}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Generated Images */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Generated Images</h2>
              </div>

              <div className="space-y-4">
                {generatedImages.length > 0 ? (
                  generatedImages.map((image) => (
                    <div key={image.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.prompt}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-sm text-gray-900 font-medium mb-2 line-clamp-2">
                          {image.prompt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span className="capitalize">{image.style}</span>
                          <span>{image.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDownload(image.url, image.prompt)}
                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
                          >
                            <Download className="h-3 w-3" />
                            <span>Download</span>
                          </button>
                          <button
                            onClick={() => handleCopy(image.prompt)}
                            className="bg-gray-100 text-gray-700 py-2 px-3 rounded text-xs hover:bg-gray-200 transition-colors"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Image className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      No images generated yet. Create your first image to see it here.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGen
