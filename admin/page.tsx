"use client"
import { useEffect, useState } from "react";
export default function Admin(){
  const [subs,setSubs]=useState<any[]>([]);
  useEffect(()=>{setSubs(JSON.parse(localStorage.getItem("bask_submissions")||"[]"))},[]);
  return (
    <div className="min-h-screen bg-zinc-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bask EMR • Provider Dashboard</h1>
          <a href="/" className="text-sm border bg-white px-4 py-2 rounded-full">← Back to Intake</a>
        </div>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Total Intakes</div><div className="text-2xl font-bold">{subs.length}</div></div>
          <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">Pending Review</div><div className="text-2xl font-bold">{subs.filter(s=>s.status==="Pending Review").length}</div></div>
          <div className="bg-white p-5 rounded-2xl border"><div className="text-sm text-zinc-500">MRR (Mock)</div><div className="text-2xl font-bold">${subs.length*299}</div></div>
        </div>
        <div className="bg-white rounded-2xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-xs text-zinc-500"><tr><th className="p-3 text-left">Date</th><th className="p-3 text-left">Patient</th><th className="p-3 text-left">Goal</th><th className="p-3 text-left">Plan</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Action</th></tr></thead>
              <tbody>{subs.map(s=><tr key={s.id} className="border-t"><td className="p-3 text-xs">{s.date}</td><td className="p-3"><div className="font-medium">{s.name||"No name"}</div><div className="text-xs text-zinc-500">{s.email}</div></td><td className="p-3">{s.goal}</td><td className="p-3">{s.plan}</td><td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">{s.status}</span></td><td className="p-3"><button className="bg-black text-white px-3 py-1 rounded-full text-xs">Approve → Rx</button></td></tr>)}</tbody>
            </table>
          </div>
          {subs.length===0 && <div className="p-12 text-center text-zinc-400">No intakes yet. Go complete an intake on homepage.</div>}
        </div>
      </div>
    </div>
  )
    }
