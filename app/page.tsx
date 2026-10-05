"use client"
import { useState } from "react"

export default function BaskClone(){
  const [step,setStep]=useState(0)
  const [answers,setAnswers]=useState<any>({})
  const questions=[
    {id:"goal", q:"What is your primary weight loss goal?", options:["Lose 10-20 lbs","Lose 20-50 lbs","Lose 50+ lbs","Maintain weight"]},
    {id:"bmi", q:"What is your current BMI range?", options:["<25","25-30","30-35","35+"]},
    {id:"conditions", q:"Any medical conditions?", options:["None","Diabetes","Hypertension","Thyroid","PCOS"]},
    {id:"meds", q:"Are you currently on GLP-1 medication?", options:["No","Semaglutide","Tirzepatide","Other"]},
  ]
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Bask Health • Clone</h1>
        <span className="text-sm bg-black text-white px-3 py-1 rounded-full">Shopify for Telehealth</span>
      </header>
      <main className="max-w-2xl mx-auto p-6 mt-8">
        <div className="mb-6">
          <div className="flex gap-2">
            {[0,1,2,3,4].map(i=>(
              <div key={i} className={`h-2 flex-1 rounded ${i<=step?"bg-black":"bg-gray-200"}`}/>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">Step {step+1} of 5 • HIPAA Compliant</p>
        </div>

        {step<4 && (
          <div className="border rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-6">{questions[step].q}</h2>
            <div className="grid gap-3">
              {questions[step].options.map(o=>(
                <button key={o} onClick={()=>{
                  setAnswers({...answers,[questions[step].id]:o}); 
                  setStep(s=>s+1)
                }} className={`p-4 border rounded-xl text-left hover:bg-black hover:text-white transition ${answers[questions[step].id]===o?"bg-black text-white":"bg-white"}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>
        )}

        {step===4 && (
          <div className="border rounded-2xl p-6 shadow-sm">
            <h2 className="text-2xl font-semibold">Checkout • Bask EHR + Payments</h2>
            <div className="mt-4 bg-gray-50 p-4 rounded-xl text-sm">
              <p>Goal: {answers.goal}</p>
              <p>BMI: {answers.bmi}</p>
              <p>Conditions: {answers.conditions}</p>
              <p>Current Meds: {answers.meds}</p>
            </div>
            <div className="mt-6 p-4 border-2 border-dashed rounded-xl">
              <p className="font-medium">Treatment Recommendation (Mock EMR Logic)</p>
              <p className="text-sm mt-2 text-gray-600">Based on answers, patient eligible for Tirzepatide compounded. EMR sync: FHIR Patient resource created. Stripe checkout ready.</p>
              <div className="mt-4 flex gap-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">EMR Synced</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Stripe $299/mo</span>
                <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">HIPAA Log: OK</span>
              </div>
            </div>
            <button onClick={()=>alert("Demo: Would redirect to Bask checkout + EHR dashboard")} className="w-full mt-6 bg-black text-white py-4 rounded-xl font-semibold">Proceed to Checkout →</button>
            <p className="text-xs text-center mt-3 text-gray-400">Built by Nsikak • Mobile-first • Lagos, NG</p>
          </div>
        )}
      </main>
    </div>
  )
}
