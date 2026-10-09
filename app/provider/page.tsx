// @ts-nocheck
"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function ProviderLogin(){
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow max-w-sm w-full space-y-4">
        <h1 className="text-2xl font-bold">Provider Login</h1>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="dr.sarah@bask.health" className="w-full border p-3 rounded-xl" />
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="password" className="w-full border p-3 rounded-xl" />
        <button onClick={()=>{ if(email&&pass){localStorage.setItem("provider_email", email); router.push("/provider/dashboard")}}} className="w-full bg-black text-white py-3 rounded-full">Login</button>
      </div>
    </div>
  )
    }
