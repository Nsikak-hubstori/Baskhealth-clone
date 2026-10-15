"use client"
import { useState } from "react"
import Link from "next/link"

export default function BaskBuilder(){
  const [questions,setQuestions]=useState([
    {id:1, text:"What is your primary weight loss goal?", type:"select"}
  ])

  const addQuestion = ()=>{
    setQuestions([...questions, {id:Date.now(), text:"", type:"text"}])
  }

  const updateText = (id:number, newText:string)=>{
    setQuestions(questions.map(q=> q.id===id? {...q, text:newText} : q))
  }

  const deleteQ = (id:number)=>{
    setQuestions(questions.filter(q=>q.id!==id))
  }

  const save = ()=>{
    localStorage.setItem("bask_questions", JSON.stringify(questions))
    alert(`Saved ${questions.length} questions to localStorage!`)
  }

  return(
    <div className="min-h-screen bg-[#f9f7f2] p-4">
      <Link href="/" className="text-sm font-bold">← Back to Platform</Link>

      <h1 className="text-3xl font-black mt-4">Bask Builder<br/>No-Code Builder</h1>
      <p className="text-gray-500 text-sm mt-2">Build questionnaires without code</p>

      <div className="mt-6 bg-white rounded-[24px] p-5 border">
        {questions.map((q,i)=>(
          <div key={q.id} className="border rounded-2xl p-4 mb-3">
            <div className="flex justify-between">
              <span className="text-[11px] text-gray-400">QUESTION {i+1}</span>
              <button onClick={()=>deleteQ(q.id)} className="text-xs text-red-500">Delete</button>
            </div>

            {/* YOU CAN TYPE HERE NOW */}
            <input
              className="w-full mt-2 p-3 border-2 rounded-xl font-bold outline-none focus:border-black"
              value={q.text}
              onChange={(e)=>updateText(q.id, e.target.value)}
              placeholder="Type question here..."
            />

            <div className="mt-2 text-xs text-gray-400">Type: {q.type}</div>
          </div>
        ))}

        <button onClick={addQuestion} className="w-full border-2 border-dashed rounded-2xl py-4 font-bold">
          + Add Question
        </button>

        <button onClick={save} className="w-full bg-black text-white rounded-full py-4 mt-4 font-bold">
          Save Questions ({questions.length})
        </button>
      </div>

      <div className="mt-4 bg-white rounded-[24px] p-5 border">
        <div className="text-xs text-gray-400">PREVIEW</div>
        <div className="mt-2 bg-[#f5f2eb] p-4 rounded-xl font-bold">
          {questions[0]?.text || "Type above to see preview..."}
        </div>
      </div>
    </div>
  )
                   }
                                                                                                                                                                                                                                                                                                                                                                                                                               
