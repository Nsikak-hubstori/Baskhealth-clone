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
    <div className="min-h-screen flex items-center justify-center bg-[#f9f7f2]">
      <div className="text-center">
        <p className="font-bold">No login found</p>
        <Link href="/intake" className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-xl">Go to Intake</Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f9f7f2] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black">My Dashboard</h1>
          <Link href="/intake" className="text-sm border bg-white px-4 py-2 rounded-xl">Back to intake</Link>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
          <p className="text-gray-500 text-sm mt-1">{user.email}</p>

          {/* SUCCESS MESSAGE - WHAT YOU WANTED */}
          <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded-xl text-center">
            <p className="font-black text-green-800 text-lg">✅ Intake Complete!</p>
            <p className="mt-2 font-bold text-green-700">Doctor will contact you through email</p>
            <p className="text-sm text-green-600 mt-1">Please check {user.email} - Doctor has your info</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-4 bg-gray-50 rounded-xl"><div className="text-[10px] text-gray-500 tracking-widest uppercase">Your Goal</div><div className="font-bold mt-1">{user.goal || "Weight loss"}</div></div>
            <div className="p-4 bg-gray-50 rounded-xl"><div className="text-[10px] text-gray-500 tracking-widest uppercase">Your Plan</div><div className="font-bold mt-1">{user.planName || user.plan}</div></div>
          </div>

          {user.plan === "basic" && (
            <div className="mt-6 p-5 bg-blue-50 rounded-xl border">
              <h3 className="font-bold text-blue-900">Basic Dashboard</h3>
              <p className="mt-2 text-sm text-blue-800">This is your basic plan</p>
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
            <div className="mt-6 p-5 bg-green-50 rounded-xl border">
              <h3 className="font-bold text-green-900">Standard Dashboard</h3>
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
            <div className="mt-6 p-5 bg-purple-50 rounded-xl border">
              <h3 className="font-bold text-purple-900">Premium Dashboard - Full Provider Support</h3>
              <ul className="mt-4 text-sm space-y-2">
                <li>✅ Everything in Standard</li>
                <li>✅ 1-on-1 Doctor consultation</li>
                <li>✅ Prescription support</li>
                <li>✅ Priority support 24/7</li>
              </ul>
            </div>
          )}

          <div className="mt-6 p-3 bg-gray-50 rounded-xl text-xs">
            Payment: {user.paymentMethod}<br/>
            Your dashboard matches what you chose in intake: <b>{user.planName || user.plan}</b>
          </div>
        </div>
      </div>
    </div>
  )
      }
