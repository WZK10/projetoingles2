
import { useState, useEffect, useCallback } from 'react'
import { lumi } from '../lib/lumi'
import { useAuth } from './useAuth'
import toast from 'react-hot-toast'

interface Lesson {
  _id: string
  title: string
  description: string
  level: string
  category: string
  content: {
    text: string
    audioUrl?: string
    videoUrl?: string
  }
  exercises: Array<{
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
  }>
  duration: number
  requiredSubscription: string
}

interface UserProgress {
  _id: string
  user_id: string
  lesson_id: string
  status: string
  score?: number
  timeSpent?: number
  completedAt?: string
  attempts: number
}

export const useLessons = () => {
  const { user, isAuthenticated } = useAuth()
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [userProgress, setUserProgress] = useState<UserProgress[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLessons = useCallback(async (filters?: { level?: string; category?: string }) => {
    setLoading(true)
    try {
      const queryFilters: any = {}
      if (filters?.level) queryFilters.level = filters.level
      if (filters?.category) queryFilters.category = filters.category

      const response = await lumi.entities.lessons.list({
        filter: queryFilters,
        sort: { createdAt: 1 }
      })
      setLessons(response.list || [])
    } catch (error) {
      console.error('Error loading lessons:', error)
      toast.error('Error loading lessons')
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchUserProgress = useCallback(async () => {
    if (!isAuthenticated || !user) return

    try {
      const response = await lumi.entities.user_progress.list({
        filter: { user_id: user.userId },
        sort: { createdAt: -1 }
      })
      setUserProgress(response.list || [])
    } catch (error) {
      console.error('Error loading progress:', error)
    }
  }, [isAuthenticated, user])

  const startLesson = async (lessonId: string) => {
    if (!isAuthenticated || !user) {
      toast.error('Please sign in to start the lesson')
      return
    }

    try {
      // Check if progress already exists for this lesson
      const existingProgress = userProgress.find(p => p.lesson_id === lessonId)
      
      if (!existingProgress) {
        const newProgress = await lumi.entities.user_progress.create({
          user_id: user.userId,
          lesson_id: lessonId,
          status: 'in_progress',
          attempts: 1,
          creator: user.userId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        setUserProgress(prev => [...prev, newProgress])
      }
      
      toast.success('Lesson started!')
    } catch (error) {
      console.error('Error starting lesson:', error)
      toast.error('Error starting lesson')
    }
  }

  const completeLesson = async (lessonId: string, score: number, timeSpent: number) => {
    if (!isAuthenticated || !user) return

    try {
      const existingProgress = userProgress.find(p => p.lesson_id === lessonId)
      
      if (existingProgress) {
        const updatedProgress = await lumi.entities.user_progress.update(existingProgress._id, {
          status: 'completed',
          score,
          timeSpent,
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        
        setUserProgress(prev => 
          prev.map(p => p._id === existingProgress._id ? updatedProgress : p)
        )
      }
      
      toast.success(`Lesson completed! Score: ${score}%`)
    } catch (error) {
      console.error('Error completing lesson:', error)
      toast.error('Error saving progress')
    }
  }

  const getLessonProgress = (lessonId: string): UserProgress | undefined => {
    return userProgress.find(p => p.lesson_id === lessonId)
  }

  useEffect(() => {
    fetchLessons()
  }, [fetchLessons])

  useEffect(() => {
    fetchUserProgress()
  }, [fetchUserProgress])

  return {
    lessons,
    userProgress,
    loading,
    fetchLessons,
    startLesson,
    completeLesson,
    getLessonProgress
  }
}
