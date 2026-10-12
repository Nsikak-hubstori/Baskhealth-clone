"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ClientDashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem("bask_user") || "null")
    setUser(u)
  },[])

  if(!user) return (
    <div className="min-h-screen flex items-center justify-center p-8 text-center">
      <div>
        <p className="font-bold">No login found</p>
        <Link href="/intake" className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-full">Go to Intake</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f9f7f2] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black">My Dashboard</h1>
          <Link href="/intake" className="text-sm border bg-white px-4 py-2 rounded-full">Log out</Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold">Welcome, {user.name} 👋</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email} • {user.date}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-[10px] text-gray-500 tracking-widest">GOAL</div>
              <div className="font-bold mt-1">{user.goal}</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-[10px] text-gray-500 tracking-widest">PLAN</div>
              <div className="font-bold mt-1">{user.planName}</div>
            </div>
          </div>

          {/* THIS IS WHAT YOU WANTED - SAME AS ADMIN BUT ONLY OWN */}
          {user.plan === "basic" && (
            <div className="mt-6 p-5 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-bold text-blue-900">Basic Dashboard - $99</h3>
              <p className="mt-2 text-sm text-blue-800">This is your own dashboard for Basic plan. Only you see this.</p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✅ Personalized meal plan</li>
                <li>✅ Weight tracker</li>
                <li>✅ Basic lessons</li>
                <li className="opacity-40">❌ Lab results</li>
                <li className="opacity-40">❌ Doctor chat</li>
              </ul>
            </div>
          )}

          {user.plan === "standard" && (
            <div className="mt-6 p-5 bg-green-50 rounded-xl border border-green-200">
              <h3 className="font-bold text-green-900">Standard Dashboard - $199</h3>
              <p className="mt-2 text-sm text-green-800">This is your own dashboard for Standard plan. Only you see this.</p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✅ Everything in Basic</li>
                <li>✅ Lab results review</li>
                <li>✅ Chat with coach</li>
                <li>✅ Advanced analytics</li>
                <li className="opacity-40">❌ Doctor 1-on-1</li>
              </ul>
            </div>
          )}

          {user.plan === "premium" && (
            <div className="mt-6 p-5 bg-purple-50 rounded-xl border border-purple-200">
              <h3 className="font-bold text-purple-900">Premium Dashboard - $299</h3>
              <p className="mt-2 text-sm text-purple-800">This is your own dashboard for Premium plan. Only you see this.</p>
              <ul className="mt-4 text-sm space-y-2">
                <li>✅ Everything in Standard</li>
                <li>✅ 1-on-1 Doctor consultation</li>
                <li>✅ Prescription support</li>
                <li>✅ Priority support 24/7</li>
              </ul>
            </div>
          )}

          <div className="mt-6 p-3 bg-gray-50 rounded-xl text-xs text-gray-400">
            Payment: {user.paymentMethod}<br/>
            Your dashboard matches what you chose in intake: <b>{user.plan}</b>
          </div>
        </div>
      </div>
    </div>
  )
  }
