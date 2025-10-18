
import React from 'react'
import { useSubscriptions } from '../hooks/useSubscriptions'
import { useAuth } from '../hooks/useAuth'
import {Check, Crown, Star, Zap} from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Subscriptions: React.FC = () => {
  const { subscriptions, loading, subscribeUser } = useSubscriptions()
  const { isAuthenticated, signIn } = useAuth()

  const handleSubscribe = async (subscriptionId: string) => {
    if (!isAuthenticated) {
      toast.error('Faça login para assinar um plano')
      await signIn()
      return
    }

    try {
      await subscribeUser(subscriptionId)
    } catch (error) {
      // Error already handled in hook
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'basic':
        return <Zap className="h-6 w-6" />
      case 'intermediate':
        return <Star className="h-6 w-6" />
      case 'advanced':
        return <Crown className="h-6 w-6" />
      case 'premium':
        return <Crown className="h-6 w-6" />
      default:
        return <Zap className="h-6 w-6" />
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'basic':
        return 'from-blue-500 to-blue-600'
      case 'intermediate':
        return 'from-green-500 to-green-600'
      case 'advanced':
        return 'from-purple-500 to-purple-600'
      case 'premium':
        return 'from-yellow-500 to-orange-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Escolha o Plano Ideal
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Temos o plano perfeito para cada etapa da sua jornada no inglês. 
            Comece hoje mesmo e transforme seu futuro!
          </p>
        </motion.div>
      </div>

      {/* Subscription Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {subscriptions.map((subscription, index) => (
            <motion.div
              key={subscription._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 ${
                subscription.popular ? 'ring-4 ring-yellow-400' : ''
              }`}
            >
              {/* Popular Badge */}
              {subscription.popular && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold">
                  Mais Popular
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-r ${getLevelColor(subscription.level)} p-6 text-white`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{subscription.name}</h3>
                  {getLevelIcon(subscription.level)}
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">
                    R$ {subscription.price.toFixed(2)}
                  </div>
                  <div className="text-sm opacity-90">
                    por {subscription.duration} {subscription.duration === 1 ? 'mês' : 'meses'}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{subscription.description}</p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {subscription.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div className="space-y-2 mb-6 text-sm text-gray-600">
                  <div>📚 {subscription.maxLessons} lições</div>
                  {subscription.hasVideo && <div>🎥 Vídeo aulas incluídas</div>}
                  {subscription.hasSupport && <div>💬 Suporte personalizado</div>}
                </div>

                {/* Subscribe Button */}
                <button
                  onClick={() => handleSubscribe(subscription._id)}
                  className={`w-full bg-gradient-to-r ${getLevelColor(subscription.level)} text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                >
                  {isAuthenticated ? 'Assinar Agora' : 'Fazer Login e Assinar'}
                </button>

                {/* Money Back Guarantee */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Garantia de 30 dias ou seu dinheiro de volta
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Perguntas Frequentes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso cancelar minha assinatura a qualquer momento?
              </h3>
              <p className="text-gray-600 text-sm">
                Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Há garantia de reembolso?
              </h3>
              <p className="text-gray-600 text-sm">
                Oferecemos garantia de 30 dias. Se não ficar satisfeito, devolvemos seu dinheiro.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Posso trocar de plano depois?
              </h3>
              <p className="text-gray-600 text-sm">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                O certificado é reconhecido?
              </h3>
              <p className="text-gray-600 text-sm">
                Sim, nossos certificados são reconhecidos internacionalmente e aceitos por empresas e universidades.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Subscriptions
