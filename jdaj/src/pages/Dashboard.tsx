
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLessons } from '../hooks/useLessons'
import { useSubscriptions } from '../hooks/useSubscriptions'
import { motion } from 'framer-motion'
import {BookOpen, Trophy, Clock, Target, TrendingUp, Calendar, Star, Award, Play, MessageCircleDashed as MessageCircle, Globe, Brain} from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, signIn } = useAuth()
  const { lessons, userProgress } = useLessons()
  const { subscriptions } = useSubscriptions()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            Sign in to track your progress, access lessons, and continue your English learning journey.
          </p>
          <button
            onClick={signIn}
            className="btn-primary w-full"
          >
            Sign In to Continue
          </button>
        </motion.div>
      </div>
    )
  }

  const completedLessons = userProgress.filter(p => p.status === 'completed').length
  const inProgressLessons = userProgress.filter(p => p.status === 'in_progress').length
  const totalLessons = lessons.length
  const averageScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((acc, p) => acc + (p.score || 0), 0) / userProgress.length)
    : 0

  const recentProgress = userProgress
    .sort((a, b) => new Date(b.updatedAt || '').getTime() - new Date(a.updatedAt || '').getTime())
    .slice(0, 5)

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your current lesson',
      icon: <Play className="h-6 w-6" />,
      href: '/lessons',
      color: 'bg-blue-500',
    },
    {
      title: 'AI Chat',
      description: 'Practice with AI tutor',
      icon: <MessageCircle className="h-6 w-6" />,
      href: '/chat',
      color: 'bg-green-500',
    },
    {
      title: 'Translation',
      description: 'Translate text instantly',
      icon: <Globe className="h-6 w-6" />,
      href: '/translation',
      color: 'bg-purple-500',
    },
    {
      title: 'Text Analysis',
      description: 'Analyze your writing',
      icon: <Brain className="h-6 w-6" />,
      href: '/text-analysis',
      color: 'bg-orange-500',
    },
  ]

  const achievements = [
    {
      title: 'First Lesson',
      description: 'Completed your first lesson',
      icon: <BookOpen className="h-6 w-6" />,
      earned: completedLessons > 0,
    },
    {
      title: 'Quick Learner',
      description: 'Completed 10 lessons',
      icon: <Trophy className="h-6 w-6" />,
      earned: completedLessons >= 10,
    },
    {
      title: 'High Achiever',
      description: 'Average score above 80%',
      icon: <Star className="h-6 w-6" />,
      earned: averageScore >= 80,
    },
    {
      title: 'Dedicated Student',
      description: 'Completed 50 lessons',
      icon: <Award className="h-6 w-6" />,
      earned: completedLessons >= 50,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600">
            Continue your English learning journey and track your progress.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Lessons</p>
                <p className="text-2xl font-bold text-gray-900">{completedLessons}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-gray-900">{inProgressLessons}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Progress</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0}%
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={action.title}
                  to={action.href}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`${action.color} p-3 rounded-full text-white group-hover:scale-110 transition-transform`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentProgress.length > 0 ? (
                recentProgress.map((progress, index) => {
                  const lesson = lessons.find(l => l._id === progress.lesson_id)
                  return (
                    <div key={progress._id} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        progress.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {lesson?.title || 'Unknown Lesson'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {progress.status === 'completed' ? 'Completed' : 'In Progress'}
                          {progress.score && ` - ${progress.score}%`}
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-gray-500 text-sm">No recent activity</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-8"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`bg-white rounded-xl p-6 shadow-lg ${
                  achievement.earned ? 'ring-2 ring-yellow-400' : 'opacity-60'
                }`}
              >
                <div className={`p-3 rounded-full mb-3 ${
                  achievement.earned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
                {achievement.earned && (
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Earned!
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subscription Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Upgrade Your Learning</h2>
              <p className="text-blue-100">
                Unlock premium features and accelerate your English mastery
              </p>
            </div>
            <Link
              to="/subscriptions"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View Plans
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
