"use client"
import { useState } from "react";

export default function Page() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");

  const next = (g: string) => { setGoal(g); setStep(s => Math.min(s+1, 5)); };

  return (
    <div className="min-h-screen bg-[#F7F5F2] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-zinc-100 px-5 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 font-bold">
          <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-700">+</span>
          Bask Health • Clone
        </div>
        <div className="text-[11px] border border-green-200 text-green-800 bg-green-50 px-3 py-1.5 rounded-full flex items-center gap-1">
          🔒 HIPAA Compliant
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white px-6 py-5 border-b border-zinc-100">
        <div className="max-w-[640px] mx-auto">
          <div className="flex justify-between text-[13px] text-zinc-500 mb-3">
            <span>Step {step} of 5</span>
            <span>{step * 20}% complete</span>
          </div>
          <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#8DBF8B] rounded-full transition-all duration-500" style={{ width: `${step*20}%` }} />
          </div>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="bg-white w-full max-w-[640px] rounded-[32px] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)] border border-zinc-100 p-8 md:p-10">

          {step === 1 && (
            <>
              <h1 className="text-[34px] font-semibold leading-[1.1] tracking-tight">What is your primary weight loss goal?</h1>
              <p className="text-[15px] text-zinc-500 mt-3 mb-8">Choose one to personalize your provider-reviewed plan</p>

              <div className="grid gap-4">
                {[
                  { id: "10-20", label: "Lose 10-20 lbs - Kickstart your journey" },
                  { id: "20-50", label: "Lose 20-50 lbs - Most popular", popular: true },
                  { id: "50+", label: "Lose 50+ lbs - Transformative plan" },
                  { id: "maintain", label: "Maintain weight - Stay healthy" },
                ].map(item => (
                  <button key={item.id} onClick={() => next(item.id)}
                    className="group relative text-left w-full p-5 rounded-[16px] border border-zinc-200 hover:border-zinc-900 hover:shadow-lg transition-all flex justify-between items-center bg-white">
                    {item.popular && <span className="absolute -top-3 right-6 text-[12px] bg-[#CDE6CC] px-3 py-1 rounded-full font-medium">Most popular</span>}
                    <span className="font-medium text-[15px] pr-4">{item.label}</span>
                    <span className="w-9 h-9 rounded-full bg-[#E8F3E8] border border-[#CDE6CC] text-green-800 flex items-center justify-center group-hover:bg-zinc-900 group-hover:text-white transition">→</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {step > 1 && (
            <>
              <h1 className="text-[28px] font-semibold">Great! You selected: {goal}</h1>
              <p className="text-zinc-500 mt-2 mb-6">This is the Bask Health flow — Step {step}. Next would be medical history, lifestyle, and checkout. This is how they build Shopify for Telehealth.</p>
              <div className="grid gap-3">
                <button onClick={()=>setStep(s=>s+1)} className="w-full bg-zinc-900 text-white p-4 rounded-full font-medium">Continue → Step {step+1}</button>
                <button onClick={()=>setStep(1)} className="w-full border border-zinc-200 p-4 rounded-full">Back</button>
              </div>
            </>
          )}

          {step === 5 && (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-2xl font-semibold">Ready for provider review</h2>
              <p className="text-zinc-500 mt-2">Your Bask Health clone is complete!</p>
            </div>
          )}

          <div className="flex justify-center gap-6 mt-10 pt-8 border-t border-zinc-100 text-[12px] text-zinc-500">
            <span>🛡️ Provider Reviewed</span>
            <span>💲 No Hidden Fees</span>
            <span>📅 Cancel Anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
                      }
