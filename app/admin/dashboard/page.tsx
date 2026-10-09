"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function ClientDashboard(){
  const [email, setEmail] = useState("client@bask.health")

  useEffect(()=>{
    const saved = localStorage.getItem("client_email")
    if(saved) setEmail(saved)
  },[])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Bask Health • Client Portal</h1>
        <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">Active</span>
      </div>

      <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        {/* Left - Profile */}
        <div className="bg-white rounded-2xl p-6 space-y-4 h-fit">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
            {email[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-bold">{email}</p>
            <p className="text-sm opacity-60">Client ID: #1029</p>
          </div>
          <div className="pt-4 border-t space-y-2 text-sm">
            <p><b>Goal:</b> 20-50 lbs</p>
            <p><b>BMI:</b> 28.4</p>
            <p><b>Plan:</b> Semaglutide</p>
          </div>
          <Link href="/intake" className="block text-center w-full border py-2 rounded-full text-sm">
            Retake Intake
          </Link>
        </div>

        {/* Center - Treatment */}
        <div className="md:col-span-2 space-y-6">

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-4">Treatment Status</h2>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 bg-black text-white p-3 rounded-xl text-center text-sm">Intake ✓</div>
              <div className="flex-1 bg-black text-white p-3 rounded-xl text-center text-sm">Review ✓</div>
              <div className="flex-1 bg-yellow-100 p-3 rounded-xl text-center text-sm">Prescribed • Now</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl">
              <p className="font-bold text-sm">Under Provider Review</p>
              <p className="text-sm opacity-70">Dr. Sarah will review your intake in 24h and prescribe your personalized plan.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-2">Your Intake Answers</h2>
            <div className="text-sm space-y-2 opacity-80">
              <div className="flex justify-between border-b py-2"><span>Primary goal</span><b>20-50 lbs</b></div>
              <div className="flex justify-between border-b py-2"><span>Medical history</span><b>No diabetes</b></div>
              <div className="flex justify-between py-2"><span>Motivation</span><b>Health + Confidence</b></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6">
            <h2 className="font-bold mb-2">Message Provider</h2>
            <div className="bg-gray-100 p-3 rounded-xl text-sm mb-3">Hi! When will my prescription be ready? — You</div>
            <div className="bg-black text-white p-3 rounded-xl text-sm w-fit">Reviewing now, will update in 2 hours — Dr. Sarah</div>
          </div>

        </div>
      </div>
    </div>
  )
        }
