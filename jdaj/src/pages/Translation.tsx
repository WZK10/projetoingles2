
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {ArrowLeftRight, Copy, Volume2, History, Globe} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import toast from 'react-hot-toast'

interface Translation {
  id: string
  sourceText: string
  translatedText: string
  sourceLang: string
  targetLang: string
  timestamp: Date
}

const Translation: React.FC = () => {
  const { isAuthenticated, signIn } = useAuth()
  const [sourceText, setSourceText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [isTranslating, setIsTranslating] = useState(false)
  const [translations, setTranslations] = useState<Translation[]>([])

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
    { code: 'ru', name: 'Russian', flag: '🇷🇺' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
    { code: 'ko', name: 'Korean', flag: '🇰🇷' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  ]

  const handleTranslate = async () => {
    if (!sourceText.trim()) return

    if (!isAuthenticated) {
      await signIn()
      return
    }

    setIsTranslating(true)

    // Simulate translation API call
    setTimeout(() => {
      const mockTranslations: { [key: string]: string } = {
        'Hello, how are you?': 'Hola, ¿cómo estás?',
        'Good morning': 'Buenos días',
        'Thank you very much': 'Muchas gracias',
        'I love learning English': 'Me encanta aprender inglés',
        'What time is it?': '¿Qué hora es?',
        'Where is the library?': '¿Dónde está la biblioteca?',
      }

      const translated = mockTranslations[sourceText] || `[Translated: ${sourceText}]`
      setTranslatedText(translated)

      const newTranslation: Translation = {
        id: Date.now().toString(),
        sourceText,
        translatedText: translated,
        sourceLang,
        targetLang,
        timestamp: new Date()
      }

      setTranslations(prev => [newTranslation, ...prev.slice(0, 9)])
      setIsTranslating(false)
      toast.success('Translation completed!')
    }, 1000)
  }

  const handleSwapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText(sourceText)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const handleSpeak = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      speechSynthesis.speak(utterance)
    } else {
      toast.error('Speech synthesis not supported')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            AI Translation Tool
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to access our powerful translation tool and translate text between multiple languages.
          </p>
          <button
            onClick={signIn}
            className="btn-primary w-full"
          >
            Sign In to Translate
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Translation Tool</h1>
          <p className="text-gray-600">Translate text instantly between multiple languages</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Translation Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Language Selector */}
              <div className="border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleSwapLanguages}
                    className="mx-4 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeftRight className="h-6 w-6" />
                  </button>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>
                          {lang.flag} {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Translation Areas */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {/* Source Text */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Source Text</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSpeak(sourceText, sourceLang)}
                        disabled={!sourceText}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(sourceText)}
                        disabled={!sourceText}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={sourceText}
                    onChange={(e) => setSourceText(e.target.value)}
                    placeholder="Enter text to translate..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Translated Text */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Translation</h3>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSpeak(translatedText, targetLang)}
                        disabled={!translatedText}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleCopy(translatedText)}
                        disabled={!translatedText}
                        className="p-1 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <div className="w-full h-32 p-3 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                    {isTranslating ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    ) : (
                      <p className="text-gray-900">{translatedText || 'Translation will appear here...'}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Translate Button */}
              <div className="border-t border-gray-200 p-6">
                <button
                  onClick={handleTranslate}
                  disabled={!sourceText.trim() || isTranslating}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isTranslating ? 'Translating...' : 'Translate'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Translation History */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <History className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Translations</h2>
              </div>

              <div className="space-y-4">
                {translations.length > 0 ? (
                  translations.map((translation) => (
                    <div key={translation.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">
                          {languages.find(l => l.code === translation.sourceLang)?.flag} → {languages.find(l => l.code === translation.targetLang)?.flag}
                        </span>
                        <span className="text-xs text-gray-500">
                          {translation.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900 mb-1 font-medium">{translation.sourceText}</p>
                      <p className="text-sm text-gray-600">{translation.translatedText}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm text-center py-8">
                    No translations yet. Start translating to see your history here.
                  </p>
                )}
              </div>
            </motion.div>

            {/* Quick Phrases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 mt-6"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Phrases</h2>
              <div className="space-y-2">
                {[
                  'Hello, how are you?',
                  'Thank you very much',
                  'Excuse me',
                  'Where is the bathroom?',
                  'I don\'t understand',
                  'Can you help me?'
                ].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => setSourceText(phrase)}
                    className="w-full text-left p-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Translation
