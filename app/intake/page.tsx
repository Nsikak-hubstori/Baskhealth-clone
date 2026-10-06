"use client"
import { useState } from "react";

type Data = any;

export default function BaskClone() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>({ goal: "", conditions: [], bmi: "", meds: "", lifestyle: {}, name: "", email: "", plan: "Tirzepatide" });
  const [done, setDone] = useState(false);

  const saveAndNext = () => {
    if(step === 4) {
      const all = JSON.parse(localStorage.getItem("bask_submissions") || "[]");
      all.unshift({...data, id: Date.now(), date: new Date().toLocaleString(), status: "Pending Review"});
      localStorage.setItem("bask_submissions", JSON.stringify(all));
    }
    setStep(s => s+1);
  };

  if(done) {
    return (
      <div className="min-h-screen bg-[#F7F5F2] flex items-center justify-center p-6">
        <div className="bg-white max-w-[520px] w-full rounded-[32px] p-10 text-center shadow-xl border">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-3xl">✓</div>
          <h1 className="text-3xl font-semibold mt-6">Sent to provider</h1>
          <p className="text-zinc-500 mt-3 text-sm">EMR created • Payment authorized • Pharmacy queued<br/>Your provider will review in 24h.</p>
          <div className="bg-[#F7F5F2] p-4 rounded-2xl mt-6 text-left text-sm">
            <div><b>Plan:</b> {data.plan} - $299/mo</div>
            <div><b>Goal:</b> {data.goal}</div>
            <div><b>Patient:</b> {data.name} • {data.email}</div>
          </div>
          <a href="/admin" className="block mt-6 w-full bg-black text-white p-4 rounded-full">Go to Provider Dashboard →</a>
          <button onClick={()=>{setStep(1); setDone(false); setData({})}} className="mt-3 text-sm text-zinc-500">Start new intake</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      <header className="bg-white border-b border-zinc-100 px-5 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#E8F3E8] rounded-full flex items-center justify-center font-bold text-green-800">+</div>
          <span className="font-bold tracking-tight">Bask Health • Clone</span>
          <span className="hidden md:inline text-zinc-400 text-sm ml-2">Shopify for Telehealth</span>
        </div>
        <div className="flex gap-2">
          <a href="/admin" className="text-xs border px-3 py-1.5 rounded-full">Provider Login</a>
          <span className="text-[11px] border border-green-200 text-green-800 bg-green-50 px-3 py-1.5 rounded-full hidden md:flex">🔒 HIPAA • SSL • HITRUST</span>
        </div>
      </header>

      <div className="bg-white px-6 py-5 border-b border-zinc-100">
        <div className="max-w-[640px] mx-auto">
          <div className="flex justify-between text-[12px] text-zinc-500 mb-3 font-medium">
            <span>STEP {step} OF 5 • {["Goal","Medical","Lifestyle","Profile","Plan"][step-1]}</span>
            <span>{step*20}% COMPLETE</span>
          </div>
          <div className="h-2 bg-zinc-200 rounded-full overflow-hidden"><div className="h-full bg-[#8DBF8B] transition-all duration-500" style={{width: `${step*20}%`}} /></div>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="bg-white w-full max-w-[640px] rounded-[32px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)] border border-zinc-100 p-7 md:p-10">

          {step === 1 && (
            <>
              <h1 className="text-[34px] font-semibold leading-[1.05] tracking-tight">What is your primary weight loss goal?</h1>
              <p className="text-[15px] text-zinc-500 mt-3 mb-8">Choose one to personalize your provider-reviewed plan.</p>
              <div className="grid gap-3">
                {[
                  {id:"10-20 lbs", sub:"Kickstart your journey"},
                  {id:"20-50 lbs", sub:"Most popular - transform in 6 months", pop:true},
                  {id:"50+ lbs", sub:"Comprehensive metabolic reset"},
                  {id:"Maintain", sub:"Stay healthy & prevent regain"},
                ].map(o=>(
                  <button key={o.id} onClick={()=>{setData({...data, goal:o.id}); setStep(2)}} className="group relative text-left w-full p-5 rounded-[18px] border border-zinc-200 hover:border-zinc-900 hover:shadow-md transition-all bg-white flex justify-between items-center">
                    {o.pop && <span className="absolute -top-2.5 right-6 text-[11px] font-semibold bg-[#CDE6CC] text-green-900 px-3 py-1 rounded-full">MOST POPULAR</span>}
                    <div><div className="font-medium">{o.id}</div><div className="text-[13px] text-zinc-500">{o.sub}</div></div>
                    <div className="w-9 h-9 rounded-full bg-[#E8F3E8] border flex items-center justify-center group-hover:bg-black group-hover:text-white">→</div>
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="text-[30px] font-semibold leading-tight">Medical intake (EMR)</h1>
              <p className="text-sm text-zinc-500 mt-2 mb-6">Required for provider review. HIPAA encrypted.</p>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {["Diabetes","Hypertension","Thyroid","PCOS","Heart Disease","Depression"].map(c=>(
                  <label key={c} className="border rounded-xl p-3 text-sm flex gap-2 cursor-pointer hover:bg-zinc-50"><input type="checkbox" onChange={e=>{const list = e.target.checked? [...(data.conditions||[]), c] : (data.conditions||[]).filter((x:string)=>x!==c); setData({...data, conditions:list})}} /> {c}</label>
                ))}
              </div>
              <input placeholder="Current weight / Height (for BMI)" className="w-full border rounded-xl p-4 text-sm mb-3" value={data.bmi||""} onChange={e=>setData({...data,bmi:e.target.value})} />
              <textarea placeholder="Current medications & allergies..." className="w-full border rounded-xl p-4 text-sm h-24" value={data.meds||""} onChange={e=>setData({...data,meds:e.target.value})} />
              <button onClick={saveAndNext} className="w-full mt-6 bg-zinc-900 text-white p-4 rounded-full font-medium">Continue</button>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="text-[30px] font-semibold">Lifestyle</h1>
              <div className="mt-6 grid gap-4 text-sm">
                <select className="border rounded-xl p-4 w-full" onChange={e=>setData({...data, lifestyle:{...data.lifestyle, activity:e.target.value}})}><option>Activity level</option><option>Sedentary</option><option>Lightly active</option><option>Very active</option></select>
                <select className="border rounded-xl p-4 w-full" onChange={e=>setData({...data, lifestyle:{...data.lifestyle, smoking:e.target.value}})}><option>Do you smoke?</option><option>Never</option><option>Sometimes</option><option>Daily</option></select>
                <label className="flex gap-2 items-center mt-2"><input type="checkbox" /> I agree to telehealth consent & terms</label>
              </div>
              <button onClick={saveAndNext} className="w-full mt-8 bg-zinc-900 text-white p-4 rounded-full">Continue to profile</button>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className="text-[30px] font-semibold">Your profile</h1>
              <p className="text-sm text-zinc-500 mt-2 mb-5">Shipping & contact for pharmacy fulfillment.</p>
              <div className="grid gap-3">
                <input placeholder="Full legal name" className="border rounded-xl p-4 text-sm" onChange={e=>setData({...data,name:e.target.value})} />
                <input placeholder="Email" className="border rounded-xl p-4 text-sm" onChange={e=>setData({...data,email:e.target.value})} />
                <input placeholder="Phone + Date of Birth" className="border rounded-xl p-4 text-sm" onChange={e=>setData({...data,phone:e.target.value})} />
                <input placeholder="Shipping address" className="border rounded-xl p-4 text-sm" onChange={e=>setData({...data,address:e.target.value})} />
              </div>
              <button onClick={saveAndNext} className="w-full mt-6 bg-zinc-900 text-white p-4 rounded-full">Continue to plan →</button>
            </>
          )}

          {step === 5 && (
            <>
              <h1 className="text-[30px] font-semibold">Choose your plan</h1>
              <p className="text-sm text-zinc-500 mt-2 mb-6">Subscription • Cancel anytime • Provider reviewed</p>
              <div className="grid gap-3">
                {[
                  {name:"Tirzepatide", price:"$299/mo", badge:"Best Results"},
                  {name:"Semaglutide", price:"$199/mo", badge:"Most Affordable"},
                  {name:"Oral Semaglutide", price:"$149/mo", badge:"Needle-free"},
                ].map(p=>(
                  <button key={p.name} onClick={()=>setData({...data, plan:p.name})} className={`text-left p-5 rounded-2xl border-2 transition ${data.plan===p.name? "border-black bg-zinc-50" : "border-zinc-200"}`}>
                    <div className="flex justify-between"><span className="font-semibold">{p.name}</span><span className="text-xs bg-green-100 px-2 py-1 rounded-full">{p.badge}</span></div>
                    <div className="text-sm text-zinc-600 mt-1">{p.price} • Includes provider + meds + shipping</div>
                  </button>
                ))}
              </div>
              <button onClick={()=>setDone(true)} className="w-full mt-8 bg-black text-white p-4 rounded-full font-semibold">Pay & Send to Provider → ${data.plan==="Tirzepatide"? "299" : data.plan==="Semaglutide"? "199" : "149"}</button>
              <p className="text-[11px] text-center text-zinc-400 mt-3">Secure Stripe • 256-bit SSL • Pharmacy partner: TruePill mock</p>
            </>
          )}

          <div className="flex justify-center gap-6 mt-10 pt-7 border-t text-[11px] text-zinc-400">
            <span>🛡️ Provider Reviewed</span><span>💳 No Hidden Fees</span><span>📦 Free Shipping</span>
          </div>
        </div>
      </div>
    </div>
  )
            }
