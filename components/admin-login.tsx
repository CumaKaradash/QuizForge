"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface AdminLoginProps {
  onLoginSuccess: () => void
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  // Bu parola sadece örnek içindir. Gerçek uygulamada asla hardcode etmeyin!
  const ADMIN_PASSWORD = "adminpassword123"

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_authenticated", "true") // Basit bir token
      onLoginSuccess()
    } else {
      setError("Yanlış parola. Lütfen tekrar deneyin.")
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Yönetici Girişi</CardTitle>
        <CardDescription>Yönetici paneline erişmek için parolayı girin.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Parola</Label>
            <Input
              id="password"
              type="password"
              placeholder="Parolanızı girin"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError("") // Clear error on input change
              }}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">
            Giriş Yap
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Bu sadece bir demo girişidir. Gerçek uygulamalar için güvenli kimlik doğrulama kullanın.</p>
      </CardFooter>
    </Card>
  )
}
