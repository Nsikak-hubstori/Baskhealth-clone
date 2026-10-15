"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function DoctorDashboard(){
  const [clients,setClients]=useState<any[]>([])
  const [selected,setSelected]=useState<any>(null)
  useEffect(()=>{ load() },[])
  const load = async ()=>{
    let all:any[]=[]
    const { data } = await supabase.from("clients").select("*").order("created_at",{ascending:false})
    if(data) all = data.map((r:any)=> r.full_data || r)
    try{ const local=JSON.parse(localStorage.getItem("bask_all_users")||"[]"); all=[...all,...local]; const m=new Map(); all.forEach((c:any)=>{if(c?.email) m.set(c.email,c)}); all=Array.from(m.values()) }catch{}
    setClients(all)
  }
  return (
    <div className="min-h-screen bg-[#f9f7f2] p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black">Doctor Admin - Total: {clients.length}</h1>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            {clients.map((c:any,i:number)=>(
              <button key={i} onClick={()=>setSelected(c)} className={`w-full text-left p-4 border-2 rounded-xl ${selected?.email===c.email?'bg-black text-white':'bg-white'}`}>
                <div className="font-bold">Client {i+1}</div>
                <div className="text-sm mt-1 break-all">📧 {c.email}</div>
                <div className="text-xs opacity-70">{c.name} - {c.planName || c.plan}</div>
              </button>
            ))}
          </div>
          <div className="bg-white border-2 rounded-2xl p-6">
            {!selected? <p className="text-gray-400">Select a client</p> : (
              <div>
                {/* HERE IS EMAIL AS MAIN TITLE - NOT "Test Manual" */}
                <h2 className="text-2xl font-black break-all">{selected.email}</h2>
                <div className="mt-4 space-y-3 bg-gray-50 p-4 rounded-xl text-sm">
                  <div><b>Client Email:</b> {selected.email}</div>
                  <div><b>Client Name:</b> {selected.name}</div>
                  <div><b>Goal:</b> {selected.goal}</div>
                  <div><b>Plan:</b> {selected.planName || selected.plan}</div>
                  <div><b>Payment:</b> {selected.paymentMethod || selected.payment_method}</div>
                </div>
                <a href={`mailto:${selected.email}`} className="mt-6 block w-full text-center bg-blue-600 text-white py-4 rounded-xl font-black">
                  📧 Send Email to<br/>{selected.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
