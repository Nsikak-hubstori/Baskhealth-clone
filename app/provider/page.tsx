"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProviderLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const login = () => {
    // Fake auth for demo — Topflight will love you check role
    if(email && password){
      localStorage.setItem("provider", email)
      router.push("/provider/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Provider Login</h1>
        <p className="text-sm opacity-60">Demo login for Bask clone</p>
        
        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="provider@bask.health"
          className="w-full border p-3 rounded-xl"
        />
        <input
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
          placeholder="password (any)"
          className="w-full border p-3 rounded-xl"
        />
        <button onClick={login} className="w-full bg-black text-white py-3 rounded-full">
          Login as Provider
        </button>
        <p className="text-xs text-center opacity-50">Use any email/password for demo</p>
      </div>
    </div>
  )
  }
