"use client"
import { useState } from "react"

export default function ClientPortal(){
  const [email, setEmail] = useState("")
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-bold">Client Login</h1>
        <p className="text-sm opacity-60">Login to see your treatment plan</p>
        
        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="your email"
          className="w-full border p-3 rounded-xl"
        />
        <input type="password" placeholder="password" className="w-full border p-3 rounded-xl" />
        
        <button className="w-full bg-black text-white py-3 rounded-full">
          Login
        </button>

        <div className="pt-4 border-t text-sm">
          <p className="font-bold">Your intake:</p>
          <p>Goal: 20-50 lbs • Status: Under provider review</p>
        </div>
      </div>
    </div>
  )
                                                                            }
