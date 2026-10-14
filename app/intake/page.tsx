"use client"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function IntakePage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<any>({
    goal: "", name: "", email: "", plan: "", planName: ""
  })
  const [card, setCard] = useState({ number: "", expiry: "", cvc: "", name: "" })
  const [receipt, setReceipt] = useState("")
  const [saving, setSaving] = useState(false)

  const next = () => setStep(s => s + 1)
  const back = () => setStep(s => s - 1)

  const saveAndGo = async (method: string) => {
    setSaving(true)
    const finalUser = {
      id: Date.now().toString(),
     ...data,
      paymentMethod: method,
      date: new Date().toLocaleString(),
      lastLogin: new Date().toLocaleString(),
    }

    // 1. Save to localStorage (for quick access)
    localStorage.setItem("bask_user", JSON.stringify(finalUser))
    try {
      let all = JSON.parse(localStorage.getItem("bask_all_users") || "[]")
      all = all.filter((u:any) => u.email!== finalUser.email)
      all.push(finalUser)
      localStorage.setItem("bask_all_users", JSON.stringify(all))
    } catch {}

    // 2. Save to Supabase (so doctor sees from ANY device)
    try {
      await supabase.from("clients").insert([{
        name: data.name,
        email: data.email,
        plan: data.plan,
        planName: data.planName || data.plan,
        goal: data.goal,
        payment_method: method,
        full_data: finalUser
      }])
    } catch (e) {
      console.log("Supabase save error (still go to dashboard):", e)
    }

    window.location.href = "/intake/dashboard"
  }

  const handleCardPay = () => {
    const clean = card.number.replace(/\s/g,"")
    if(clean.length < 12) return alert("Enter card number that is 12+ digits")
    if(card.expiry.length < 4) return alert("Enter expiry e.g 12/26")
    if(card.cvc.length < 3) return alert("Enter CVV 3 digits")
    saveAndGo(`Card ending ${clean.slice(-4)}`)
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2] p-4 md:p-8">
      <div className="max-w-xl mx-auto bg-white rounded-[24px] p-6 md:p-8 shadow">
        <div className="text-sm text-gray-400 mb-4">Step {step} of 7</div>

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold">What is your main goal?</h1>
            <div className="grid gap-3 mt-6">
              {["Lose weight","Manage blood sugar","Improve metabolic health","Other"].map(g=>(
                <button key={g} onClick={()=>{setData({...data, goal:g}); next()}} className={`p-4 border rounded-xl text-left font-bold ${data.goal===g? 'bg-black text-white' : 'bg-gray-50'}`}>{g}</button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (<div><h1 className="text-2xl font-bold">More about your goal</h1><p className="mt-2 text-gray-500">Tell us more...</p><button onClick={next} className="mt-6 w-full bg-black text-white p-4 rounded-xl font-bold">Continue</button><button onClick={back} className="w-full mt-3">Back</button></div>)}
        {step === 3 && (<div><h1 className="text-2xl font-bold">Health history</h1><button onClick={next} className="mt-6 w-full bg-black text-white p-4 rounded-xl font-bold">Continue</button><button onClick={back} className="w-full mt-3">Back</button></div>)}

        {step === 4 && (
          <div>
            <h1 className="text-2xl font-bold">Your details</h1>
            <input placeholder="Full name" className="w-full border p-4 rounded-xl mt-6" value={data.name} onChange={e=>setData({...data, name:e.target.value})}/>
            <input placeholder="Email" className="w-full border p-4 rounded-xl mt-3" value={data.email} onChange={e=>setData({...data, email:e.target.value})}/>
            <button disabled={!data.name ||!data.email} onClick={next} className="mt-6 w-full bg-black text-white p-4 rounded-xl font-bold disabled:opacity-30">Continue</button>
            <button onClick={back} className="w-full mt-3">Back</button>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className="text-2xl font-bold">Choose your plan</h1>
            <div className="grid gap-3 mt-6">
              {[
                {id:"basic", name:"Basic - $99", desc:"Starter plan"},
                {id:"standard", name:"Standard - $199", desc:"Most popular"},
                {id:"premium", name:"Premium - $299", desc:"Full provider support"},
              ].map(p=>(
                <button key={p.id} onClick={()=>setData({...data, plan:p.id, planName:p.name})} className={`p-4 border rounded-xl text-left ${data.plan===p.id? 'bg-black text-white' : 'bg-gray-50'}`}>
                  <div className="font-bold">{p.name}</div><div className="text-sm opacity-70">{p.desc}</div>
                </button>
              ))}
            </div>
            <button disabled={!data.plan} onClick={next} className="mt-6 w-full bg-black text-white p-4 rounded-xl font-bold disabled:opacity-30">Continue</button>
            <button onClick={back} className="w-full mt-3">Back</button>
          </div>
        )}

        {step === 6 && (
          <div className="text-center">
            <div className="bg-yellow-100 border-2 border-yellow-300 p-5 rounded-xl">
              <h1 className="text-2xl font-black text-center">⚠️ Demo Notice</h1>
              <p className="mt-4 text-[16px] font-bold leading-6">This website is just a clone project built for demonstration purpose</p>
              <p className="mt-3 font-bold">You can enter any fake bank card number, CVV, and expiry - it will work</p>
            </div>
            <button onClick={next} className="mt-8 w-full bg-black text-white p-4 rounded-xl font-bold">I Understand, Continue to Payment</button>
            <button onClick={back} className="w-full mt-3">Back</button>
          </div>
        )}

        {step === 7 && (
          <div>
            <h1 className="text-2xl font-bold">Payment - {data.planName}</h1>
            <div className="mt-6 border rounded-2xl p-5 bg-gray-50">
              <h3 className="font-bold">Pay with Card (Demo - Any card works)</h3>
              <input placeholder="Card Number e.g 4242 4242 4242 4242" className="w-full border p-3 rounded-xl mt-3" value={card.number} onChange={e=>setCard({...card, number:e.target.value})}/>
              <div className="flex gap-3 mt-3">
                <input placeholder="MM/YY" className="w-1/2 border p-3 rounded-xl" value={card.expiry} onChange={e=>setCard({...card, expiry:e.target.value})}/>
                <input placeholder="CVV" className="w-1/2 border p-3 rounded-xl" value={card.cvc} onChange={e=>setCard({...card, cvc:e.target.value})}/>
              </div>
              <input placeholder="Name on card" className="w-full border p-3 rounded-xl mt-3" value={card.name} onChange={e=>setCard({...card, name:e.target.value})}/>
              <button onClick={handleCardPay} className="mt-4 w-full bg-black text-white p-4 rounded-xl font-bold">{saving? "Saving..." : "Pay Now"}</button>
            </div>

            <div className="mt-6 border-2 border-dashed rounded-2xl p-5">
              <h3 className="font-bold">Or Bank Transfer</h3>
              <div className="mt-3 bg-white p-4 rounded-xl border text-sm">
                <div>Bank: <b>Lead Bank</b></div>
                <div>Account Number: <b className="text-base">2025001234</b></div>
                <div>Account Name: <b>Nsikak Etim</b></div>
                <div className="mt-2 text-xs">For USD from anywhere</div>
              </div>
              <input placeholder="Paste transfer reference / receipt" className="w-full border p-3 rounded-xl mt-3" value={receipt} onChange={e=>setReceipt(e.target.value)}/>
              <button onClick={()=>saveAndGo(`Transfer - ${receipt}`)} className="mt-3 w-full bg-black text-white p-4 rounded-xl font-bold">{saving? "Saving..." : "Confirm Transfer"}</button>
            </div>
            <button onClick={back} className="w-full mt-6 text-sm">Back</button>
          </div>
        )}
      </div>
    </div>
  )
                                                                                     }
                                                            
