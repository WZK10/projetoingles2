
import React, { useState } from 'react'
import { useLessons } from '../hooks/useLessons'
import { useAuth } from '../hooks/useAuth'
import {Play, Clock, Award, Filter, BookOpen, Headphones, MessageCircleDashed as MessageCircle, PenTool, Eye, Volume2} from 'lucide-react'
import { motion } from 'framer-motion'

const Lessons: React.FC = () => {
  const { lessons, loading, fetchLessons, startLesson, getLessonProgress } = useLessons()
  const { isAuthenticated, signIn } = useAuth()
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const levels = [
    { value: '', label: 'Todos os Níveis' },
    { value: 'beginner', label: 'Iniciante' },
    { value: 'intermediate', label: 'Intermediário' },
    { value: 'advanced', label: 'Avançado' }
  ]

  const categories = [
    { value: '', label: 'Todas as Categorias' },
    { value: 'grammar', label: 'Gramática', icon: <BookOpen className="h-4 w-4" /> },
    { value: 'vocabulary', label: 'Vocabulário', icon: <PenTool className="h-4 w-4" /> },
    { value: 'conversation', label: 'Conversação', icon: <MessageCircle className="h-4 w-4" /> },
    { value: 'listening', label: 'Listening', icon: <Headphones className="h-4 w-4" /> },
    { value: 'reading', label: 'Leitura', icon: <Eye className="h-4 w-4" /> },
    { value: 'writing', label: 'Escrita', icon: <PenTool className="h-4 w-4" /> }
  ]

  const handleFilterChange = () => {
    fetchLessons({
      level: selectedLevel || undefined,
      category: selectedCategory || undefined
    })
  }

  React.useEffect(() => {
    handleFilterChange()
  }, [selectedLevel, selectedCategory])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    const categoryObj = categories.find(c => c.value === category)
    return categoryObj?.icon || <BookOpen className="h-4 w-4" />
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'in_progress':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-300'
    }
  }

  const handleStartLesson = async (lessonId: string) => {
    if (!isAuthenticated) {
      await signIn()
      return
    }
    await startLesson(lessonId)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Lições de Inglês
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore nossa biblioteca completa de lições interativas e acelere 
            seu aprendizado de inglês.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nível
              </label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {levels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => {
            const progress = getLessonProgress(lesson._id)
            
            return (
              <motion.div
                key={lesson._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Progress Bar */}
                {progress && (
                  <div className="h-1 bg-gray-200">
                    <div 
                      className={`h-full ${getProgressColor(progress.status)}`}
                      style={{ 
                        width: progress.status === 'completed' ? '100%' : 
                               progress.status === 'in_progress' ? '50%' : '0%' 
                      }}
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {lesson.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                      {lesson.level === 'beginner' ? 'Iniciante' : 
                       lesson.level === 'intermediate' ? 'Intermediário' : 'Avançado'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center space-x-1">
                      {getCategoryIcon(lesson.category)}
                      <span>
                        {categories.find(c => c.value === lesson.category)?.label || lesson.category}
                      </span>
                    </span>
                  </div>

                  {/* Lesson Info */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Volume2 className="h-4 w-4" />
                      <span>{lesson.exercises.length} exercícios</span>
                    </div>
                  </div>

                  {/* Progress Status */}
                  {progress && (
                    <div className="mb-4">
                      {progress.status === 'completed' ? (
                        <div className="flex items-center space-x-2 text-green-600">
                          <Award className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            Concluída - {progress.score}%
                          </span>
                        </div>
                      ) : progress.status === 'in_progress' ? (
                        <div className="flex items-center space-x-2 text-yellow-600">
                          <Play className="h-4 w-4" />
                          <span className="text-sm font-medium">Em progresso</span>
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => handleStartLesson(lesson._id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>
                      {progress?.status === 'completed' ? 'Revisar Lição' :
                       progress?.status === 'in_progress' ? 'Continuar' : 
                       isAuthenticated ? 'Iniciar Lição' : 'Fazer Login'}
                    </span>
                  </button>

                  {/* Required Subscription */}
                  <div className="mt-3 text-center">
                    <span className="text-xs text-gray-500">
                      Requer plano: {lesson.requiredSubscription}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Empty State */}
        {lessons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma lição encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros para encontrar lições adequadas ao seu nível.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Lessons
