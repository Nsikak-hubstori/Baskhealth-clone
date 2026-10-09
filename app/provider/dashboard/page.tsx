// @ts-nocheck
"use client"
import { useEffect, useState } from "react"

export default function ProviderDashboard(){
  const [clients, setClients] = useState([])
  useEffect(()=>{
    const lastClient = localStorage.getItem("client_email") || "purestories0@gmail.com"
    setClients([
      { id: 1029, email: lastClient, goal: "20-50 lbs", status: "Pending Review" },
      { id: 1028, email: "jessica.w@gmail.com", goal: "10-20 lbs", status: "Approved" },
    ])
  },[])
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="font-bold text-xl mb-4">Patient Queue</h1>
      {clients.map((c:any)=>(
        <div key={c.id} className="bg-white p-4 rounded-xl mb-3 flex justify-between">
          <div><p className="font-bold">{c.email}</p><p className="text-sm">{c.goal} - {c.status}</p></div>
          <button onClick={()=>alert("Approved #"+c.id)} className="bg-black text-white px-4 py-2 rounded-full text-sm">Approve</button>
        </div>
      ))}
    </div>
  )
       }
