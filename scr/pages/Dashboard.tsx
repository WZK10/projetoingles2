
import React, { useState, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useLessons } from '../hooks/useLessons'
import { lumi } from '../lib/lumi'
import {BarChart3, Trophy, Clock, Target, BookOpen, Star, Calendar, Award} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

interface UserSubscription {
  _id: string
  subscription_id: string
  status: string
  startDate: string
  endDate: string
}

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth()
  const { userProgress, lessons } = useLessons()
  const [userSubscription, setUserSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || !user) return

      try {
        // Buscar assinatura ativa do usuário
        const { list: subscriptions } = await lumi.entities.user_subscriptions.list({
          filter: { 
            user_id: user.userId,
            status: 'active'
          },
          sort: { createdAt: -1 }
        })

        if (subscriptions && subscriptions.length > 0) {
          setUserSubscription(subscriptions[0])
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Faça login para acessar seu dashboard</p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Calcular estatísticas
  const completedLessons = userProgress.filter(p => p.status === 'completed').length
  const inProgressLessons = userProgress.filter(p => p.status === 'in_progress').length
  const totalTimeSpent = userProgress.reduce((total, p) => total + (p.timeSpent || 0), 0)
  const averageScore = userProgress.length > 0 
    ? Math.round(userProgress.reduce((total, p) => total + (p.score || 0), 0) / userProgress.length)
    : 0

  const recentLessons = userProgress
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const stats = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Lições Concluídas",
      value: completedLessons,
      subtitle: `${inProgressLessons} em progresso`
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: "Tempo de Estudo",
      value: `${Math.round(totalTimeSpent / 60)}h`,
      subtitle: `${totalTimeSpent % 60}min`
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: "Pontuação Média",
      value: `${averageScore}%`,
      subtitle: "Último mês"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Sequência",
      value: "7 dias",
      subtitle: "Estudando diariamente"
    }
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
            Olá, {user?.userName}! 👋
          </h1>
          <p className="text-gray-600">
            Acompanhe seu progresso e continue aprendendo inglês
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>{stat.icon}</div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium text-gray-900 mb-1">
                {stat.title}
              </p>
              <p className="text-xs text-gray-500">
                {stat.subtitle}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Atividade Recente
              </h2>
              <Link
                to="/lessons"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Ver todas as lições
              </Link>
            </div>

            {recentLessons.length > 0 ? (
              <div className="space-y-4">
                {recentLessons.map((progress) => {
                  const lesson = lessons.find(l => l._id === progress.lesson_id)
                  
                  return (
                    <div key={progress._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full ${
                        progress.status === 'completed' ? 'bg-green-500' :
                        progress.status === 'in_progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {lesson?.title || 'Lição não encontrada'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {progress.status === 'completed' ? 'Concluída' :
                           progress.status === 'in_progress' ? 'Em progresso' : 'Não iniciada'}
                          {progress.score && ` - ${progress.score}%`}
                        </p>
                      </div>
                      
                      <div className="text-sm text-gray-500">
                        {new Date(progress.createdAt).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Nenhuma atividade recente</p>
                <Link
                  to="/lessons"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Começar uma lição
                </Link>
              </div>
            )}
          </motion.div>

          {/* Subscription Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="space-y-6"
          >
            {/* Current Subscription */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Minha Assinatura
              </h2>
              
              {userSubscription ? (
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Award className="h-5 w-5 text-green-500" />
                    <span className="font-medium text-green-600">Plano Ativo</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Válida até: {new Date(userSubscription.endDate).toLocaleDateString('pt-BR')}
                  </p>
                  <Link
                    to="/subscriptions"
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Gerenciar Plano
                  </Link>
                </div>
              ) : (
                <div>
                  <p className="text-gray-600 mb-4">
                    Você não possui uma assinatura ativa
                  </p>
                  <Link
                    to="/subscriptions"
                    className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Escolher Plano
                  </Link>
                </div>
              )}
            </div>

            {/* Progress Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Progresso Semanal
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lições Concluídas</span>
                  <span className="font-medium">{completedLessons}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${Math.min((completedLessons / 10) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Meta: 10 lições por semana
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Ações Rápidas
              </h2>
              
              <div className="space-y-3">
                <Link
                  to="/lessons"
                  className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continuar Estudando
                </Link>
                <Link
                  to="/subscriptions"
                  className="block w-full text-center border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Upgrade de Plano
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
