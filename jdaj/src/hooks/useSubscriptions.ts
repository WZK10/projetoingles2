
import { useState, useEffect, useCallback } from 'react'
import { lumi } from '../lib/lumi'
import toast from 'react-hot-toast'

interface Subscription {
  _id: string
  name: string
  description: string
  price: number
  duration: number
  level: string
  features: string[]
  maxLessons: number
  hasVideo: boolean
  hasSupport: boolean
  popular: boolean
}

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(false)

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true)
    try {
      const response = await lumi.entities.subscriptions.list({
        sort: { price: 1 }
      })
      setSubscriptions(response.list || [])
    } catch (error) {
      console.error('Error loading subscriptions:', error)
      toast.error('Error loading subscription plans')
    } finally {
      setLoading(false)
    }
  }, [])

  const subscribeUser = async (subscriptionId: string) => {
    try {
      const startDate = new Date().toISOString()
      const endDate = new Date()
      endDate.setMonth(endDate.getMonth() + 1) // 1 month default
      
      await lumi.entities.user_subscriptions.create({
        user_id: lumi.auth.user?.userId || '',
        subscription_id: subscriptionId,
        startDate,
        endDate: endDate.toISOString(),
        status: 'active',
        paymentMethod: 'credit_card',
        autoRenew: true,
        creator: lumi.auth.user?.userId || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      
      toast.success('Subscription activated successfully!')
    } catch (error) {
      console.error('Error activating subscription:', error)
      toast.error('Error processing subscription')
      throw error
    }
  }

  useEffect(() => {
    fetchSubscriptions()
  }, [fetchSubscriptions])

  return {
    subscriptions,
    loading,
    fetchSubscriptions,
    subscribeUser
  }
}
