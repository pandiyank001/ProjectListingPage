"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  user: { email: string; name?: string } | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name?: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Check if user is authenticated on initial load
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      const userEmail = localStorage.getItem("userEmail")
      const userName = localStorage.getItem("userName")

      if (auth === "true" && userEmail) {
        setIsAuthenticated(true)
        setUser({ 
          email: userEmail,
          name: userName || undefined
        })
      }

      setLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    if (!loading) {
      const publicRoutes = ["/sign-in", "/sign-up"]

      if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
        navigate("/sign-in")
      } else if (isAuthenticated && publicRoutes.includes(location.pathname)) {
        navigate("/")
      }
    }
  }, [isAuthenticated, loading, location.pathname, navigate])

  const login = async (email: string) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const name = email.split('@')[0]
        
        localStorage.setItem("isAuthenticated", "true")
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userName", name)
        
        setIsAuthenticated(true)
        setUser({ email, name })
        resolve()
      }, 1000)
    })
  }

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    setIsAuthenticated(false)
    setUser(null)
    navigate("/sign-in")
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>{!loading && children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}