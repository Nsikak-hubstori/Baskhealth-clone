"use client"
import { useEffect, useState } from "react"

export default function AdminPage() {
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("bask_all_users") || "[]")
    setAllUsers(all)
    if (all.length === 1) {
      setSelected(all[0])
    }
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
        <h2 className="text-2xl font-bold">{user.name}'s Dashboard</h2>
        <p className="text-gray-500 text-sm mt-1">{user.email} • {user.date}</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 bg-gray-50 rounded-xl"><div className="text-xs text-gray-500">GOAL</div><div className="font-bold">{user.goal}</div></div>
          <div className="p-3 bg-gray-50 rounded-xl"><div className="text-xs text-gray-500">PLAN</div><div className="font-bold">{user.planName}</div></div>
        </div>

        {/* DASHBOARD CORRESPONDS TO WHAT THEY CHOSE */}
        {user.plan === "basic" && (
          <div className="mt-6 p-5 bg-blue-50 rounded-xl border">
            <h3 className="font-bold">Basic Dashboard</h3>
            <p className="mt-2 text-sm">Meal plan, weight tracker, basic lessons.</p>
          </div>
        )}
        {user.plan === "standard" && (
          <div className="mt-6 p-5 bg-green-50 rounded-xl border">
            <h3 className="font-bold">Standard Dashboard</h3>
            <p className="mt-2 text-sm">Everything in Basic + Lab results, chat with coach, advanced analytics.</p>
          </div>
        )}
        {user.plan === "premium" && (
          <div className="mt-6 p-5 bg-purple-50 rounded-xl border">
            <h3 className="font-bold">Premium Dashboard - Full Provider Support</h3>
            <p className="mt-2 text-sm">Everything in Standard + 1-on-1 doctor, prescription, priority support.</p>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-400">Payment: {user.paymentMethod}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">Doctor Admin</h1>
            <p className="mt-1 font-bold">Total Clients Logged In: <span className="bg-black text-white px-3 py-1 rounded-full">{allUsers.length}</span></p>
          </div>
          <button onClick={clearAll} className="text-sm border px-4 py-2 rounded-full bg-white">Clear All</button>
        </div>

        {allUsers.length === 0 && <div className="mt-20 text-center text-gray-500">No clients yet. Go to /intake to test.</div>}

        {/* IF 1 PERSON - SHOW DASHBOARD DIRECTLY */}
        {allUsers.length === 1 && selected && (
          <div className="mt-8">
            <div className="mb-3 font-bold">Only 1 client - Showing dashboard directly:</div>
            {renderDashboard(selected)}
          </div>
        )}

        {/* IF 2+ PEOPLE - SHOW LIST */}
        {allUsers.length > 1 && (
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1 bg-white rounded-2xl p-4 shadow h-fit">
              <h3 className="font-bold mb-3">All Clients ({allUsers.length})</h3>
              <div className="grid gap-2">
                {allUsers.map((u:any)=>(
                  <button key={u.id} onClick={()=>setSelected(u)} className={`p-3 rounded-xl text-left border ${selected?.id===u.id?'bg-black text-white':'bg-gray-50'}`}>
                    <div className="font-bold text-sm">{u.name}</div>
                    <div className="text-xs opacity-70">{u.planName} • {u.email}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              {selected? renderDashboard(selected) : <div className="bg-white rounded-2xl p-10 text-center text-gray-400">Select a client to view dashboard</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
              }
