"use client"

import { useState, useEffect } from "react"
import { QuizCreator } from "@/components/quiz-creator"
import { AdminLogin } from "@/components/admin-login"
import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

export default function NoneFilesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check local storage for authentication status on mount
    const storedAuth = localStorage.getItem("admin_authenticated")
    if (storedAuth === "true") {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <p className="text-lg text-gray-700 dark:text-gray-300">Yükleniyor...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-50 leading-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            QuizForgeDinamik
          </span>{" "}
          Yönetici Paneli
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Quiz sorularını oluşturun ve yönetin.</p>
      </header>

      <main className="w-full max-w-3xl">
        {isAuthenticated ? (
          <>
            <div className="flex justify-end mb-4">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900"
              >
                <LogOutIcon className="h-4 w-4 mr-2" />
                Çıkış Yap
              </Button>
            </div>
            <QuizCreator />
          </>
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
    </div>
  )
}
