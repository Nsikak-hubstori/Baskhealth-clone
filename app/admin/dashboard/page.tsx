"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    async function load() {
      let users: any[] = []
      // 1. Load from localStorage (your old clients)
      try {
        const local = JSON.parse(localStorage.getItem("bask_all_users") || "[]")
        if (Array.isArray(local)) users = [...local]
      } catch {}

      // 2. Load from Supabase (new clients from any device)
      try {
        const { data } = await supabase.from("clients").select("*").order("created_at", { ascending: false })
        if (data && data.length > 0) {
          // Merge, avoid duplicates by email
          data.forEach((s:any) => {
            if (!users.find(u => u.email === s.email)) {
              users.push({
                id: s.id,
                name: s.name || s.full_name || "Client",
                email: s.email,
                plan: s.plan,
                planName: s.plan,
                paymentMethod: s.payment_method || "N/A",
                created_at: s.created_at,
               ...s
              })
            }
          })
        }
      } catch (e) { console.log(e) }

      setAllUsers(users)
      if (users.length === 1) setSelected(users[0])
    }
    load()
  }, [])

  const clearAll = () => {
    if(confirm("Clear all clients?")) {
      localStorage.removeItem("bask_all_users")
      localStorage.removeItem("bask_user")
      setAllUsers([])
      setSelected(null)
    }
  }

  const renderDashboard = (user: any) => {
    return (
      <div className="bg-white rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{user.email}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-xl"><div className="text-xs text-gray-500">Plan</div><div className="font-bold">{user.plan}</div></div>
          <div className="p-3 bg-gray-50 rounded-xl"><div className="text-xs text-gray-500">Payment</div><div className="font-bold text-xs">{user.paymentMethod}</div></div>
        </div>
        {user.plan === "basic" && (
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border"><h3 className="font-bold">Basic Dashboard</h3><p className="mt-2 text-sm">Meal plan, weight tracker, basic lessons</p></div>
        )}
        {user.plan === "standard" && (
          <div className="mt-6 p-5 bg-green-50 rounded-xl border"><h3 className="font-bold">Standard Dashboard</h3><p className="mt-2 text-sm">Everything in Basic + Lab results, chat support</p></div>
        )}
        {user.plan === "premium" && (
          <div className="mt-6 p-5 bg-purple-50 rounded-xl border"><h3 className="font-bold">Premium Dashboard - Full Provider Support</h3><p className="mt-2 text-sm">Everything in Standard + 1-on-1 doctor support</p></div>
        )}
        <div className="mt-4 text-xs text-gray-400">Payment: {user.paymentMethod}</div>

        {/* SEND EMAIL BUTTON FOR DOCTOR */}
        <div className="mt-6 flex gap-3">
          <a href={`mailto:${user.email}?subject=Your Doctor - Bask Health&body=Hi ${user.name},%0D%0A%0D%0AI reviewed your case.`} className="bg-black text-white px-6 py-3 rounded-xl font-bold text-sm">📧 Send Email to Client</a>
        </div>
        <div className="mt-2 text-xs text-green-600">Client sees: "Doctor will contact you through email"</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Doctor Admin</h1>
            <p className="mt-1 font-bold">Total Clients Logged In: <span className="text-blue-600">{allUsers.length}</span></p>
          </div>
          <button onClick={clearAll} className="text-sm border px-4 py-2 rounded-xl bg-white">Clear All</button>
        </div>

        {allUsers.length === 0 && <div className="mt-20 text-center text-gray-400">No clients yet. Clients from /intake will appear here.</div>}

        {/* IF ONLY 1 CLIENT - SHOW DIRECTLY */}
        {allUsers.length === 1 && selected && (
          <div className="mt-8">
            <p className="mb-3 font-bold">Only 1 client - Showing dashboard</p>
            {renderDashboard(selected)}
          </div>
        )}

        {/* IF MORE THAN 1 - SHOW LIST */}
        {allUsers.length > 1 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-2xl p-4 shadow h-fit">
              <h3 className="font-bold mb-3">All Clients ({allUsers.length})</h3>
              <div className="grid gap-2">
                {allUsers.map((u:any, i:number)=>(
                  <div key={u.id || i} onClick={()=>setSelected(u)} className={`p-3 rounded-xl cursor-pointer border ${selected?.email===u.email? 'bg-black text-white' : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="font-bold text-sm">Client {i+1}: {u.name}</div>
                    <div className="text-xs opacity-70">{u.planName || u.plan} • {u.email}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              {selected? renderDashboard(selected) : <div className="bg-white p-10 rounded-2xl text-center text-gray-400">👈 Click Client 1, Client 2 to see details</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
    }
