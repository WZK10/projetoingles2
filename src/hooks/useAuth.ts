
import { useState, useEffect } from 'react'
import { lumi } from '../lib/lumi'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(lumi.auth.isAuthenticated)
  const [user, setUser] = useState(lumi.auth.user)

  useEffect(() => {
    const unsubscribe = lumi.auth.onAuthChange(({ isAuthenticated, user }) => {
      setIsAuthenticated(isAuthenticated)
      setUser(user)
    })
    return () => unsubscribe()
  }, [])

  const signIn = async () => {
    try {
      await lumi.auth.signIn()
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      await lumi.auth.signOut()
    } catch (error) {
      console.error('Logout failed:', error)
      throw error
    }
  }

  return { user, isAuthenticated, signIn, signOut }
}
