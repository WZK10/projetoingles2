
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {FileText, TrendingUp, Key, Target, Copy, Upload} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface AnalysisResult {
  sentiment: {
    score: number
    label: string
    confidence: number
  }
  summary: string
  keywords: string[]
  readability: {
    score: number
    level: string
    avgWordsPerSentence: number
    avgSyllablesPerWord: number
  }
  wordCount: number
  characterCount: number
  sentenceCount: number
}

const TextAnalysis: React.FC = () => {
  const { isAuthenticated, signIn } = useAuth()
  const [inputText, setInputText] = useState('')
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    if (!isAuthenticated) {
      await signIn()
      return
    }

    setIsAnalyzing(true)

    // Simulate analysis API call
    setTimeout(() => {
      const words = inputText.trim().split(/\s+/)
      const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0)
      
      const mockResult: AnalysisResult = {
        sentiment: {
          score: Math.random() * 2 - 1, // -1 to 1
          label: Math.random() > 0.5 ? 'Positive' : Math.random() > 0.5 ? 'Negative' : 'Neutral',
          confidence: 0.7 + Math.random() * 0.3
        },
        summary: `This text discusses ${words.slice(0, 10).join(' ')}... The main themes include language learning, education, and personal development.`,
        keywords: ['English', 'learning', 'education', 'language', 'skills', 'practice', 'improvement', 'communication'],
        readability: {
          score: 60 + Math.random() * 30,
          level: 'High School',
          avgWordsPerSentence: words.length / sentences.length,
          avgSyllablesPerWord: 1.5 + Math.random() * 0.5
        },
        wordCount: words.length,
        characterCount: inputText.length,
        sentenceCount: sentences.length
      }

      setAnalysisResult(mockResult)
      setIsAnalyzing(false)
      toast.success('Analysis completed!')
    }, 2000)
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-600 bg-green-100'
      case 'negative':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getReadabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const sampleTexts = [
    "Learning English has been one of the most rewarding experiences of my life. It opened doors to new opportunities and allowed me to connect with people from different cultures.",
    "The rapid advancement of artificial intelligence is transforming how we work, learn, and communicate. While this brings exciting possibilities, it also raises important questions about the future of human employment.",
    "Climate change represents one of the greatest challenges of our time. Scientists around the world are working together to develop innovative solutions that can help us reduce our carbon footprint."
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Text Analysis Tool
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to analyze text for sentiment, readability, keywords, and get detailed insights.
          </p>
          <button
            onClick={signIn}
            className="btn-primary w-full"
          >
            Sign In to Analyze
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Text Analysis Tool</h1>
          <p className="text-gray-600">Analyze text for sentiment, readability, keywords, and more</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Input Text</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCopy(inputText)}
                    disabled={!inputText}
                    className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter or paste your text here for analysis..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-gray-500">
                  {inputText.length} characters, {inputText.trim().split(/\s+/).filter(w => w.length > 0).length} words
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={!inputText.trim() || isAnalyzing}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                </button>
              </div>
            </motion.div>

            {/* Sample Texts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Sample Texts</h2>
              <div className="space-y-3">
                {sampleTexts.map((text, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(text)}
                    className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-sm text-gray-700 line-clamp-2">{text}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Analysis Results */}
          <div className="lg:col-span-1">
            {analysisResult ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {/* Basic Stats */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Text Statistics</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Words:</span>
                      <span className="font-semibold">{analysisResult.wordCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Characters:</span>
                      <span className="font-semibold">{analysisResult.characterCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sentences:</span>
                      <span className="font-semibold">{analysisResult.sentenceCount}</span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Analysis */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Sentiment</h3>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSentimentColor(analysisResult.sentiment.label)}`}>
                      {analysisResult.sentiment.label}
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {(analysisResult.sentiment.confidence * 100).toFixed(0)}%
                      </div>
                      <div className="text-sm text-gray-500">Confidence</div>
                    </div>
                  </div>
                </div>

                {/* Readability */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Readability</h3>
                  </div>
                  <div className="text-center">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getReadabilityColor(analysisResult.readability.score)}`}>
                      {analysisResult.readability.level}
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-gray-900">
                        {analysisResult.readability.score.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-500">Score</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg words/sentence:</span>
                      <span>{analysisResult.readability.avgWordsPerSentence.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg syllables/word:</span>
                      <span>{analysisResult.readability.avgSyllablesPerWord.toFixed(1)}</span>
                    </div>
                  </div>
                </div>

                {/* Keywords */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Key className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Keywords</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {analysisResult.summary}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Analysis Yet</h3>
                <p className="text-gray-600 text-sm">
                  Enter some text and click "Analyze Text" to see detailed insights.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextAnalysis
