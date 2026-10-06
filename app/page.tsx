"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div style={{background:'#050507', color:'white', minHeight:'100vh', fontFamily:'sans-serif'}}>
      {/* NAV - like bask.health */}
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px', borderBottom:'1px solid #111'}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <span style={{background:'#2a5bd7', padding:'6px 12px', borderRadius:20, fontWeight:900}}>BASK</span>
        </div>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <button onClick={()=>setShowModal(true)} style={{background:'#2a5bd7', color:'white', padding:'10px 18px', borderRadius:10, border:0, fontWeight:600, display:'flex', gap:8, alignItems:'center'}}>
            Get started <span>›</span>
          </button>
          <div style={{width:40, height:36, border:'1px solid #333', borderRadius:10, display:'grid', placeItems:'center'}}>☰</div>
        </div>
      </nav>

      {/* MOVING HERO IMAGE - Bask building */}
      <div style={{padding:'20px 0', display:'grid', placeItems:'center', background:'radial-gradient(600px at 50% 0%, #112 0%, #050507 70%)'}}>
        <div style={{animation:'float 4s ease-in-out infinite', width:'90%', maxWidth:800}}>
          {/* You can replace this with your own building png - using a styled div to mimic Bask */}
          <div style={{background:'linear-gradient(180deg,#1a3a8a 0%,#0f2456 100%)', borderRadius:12, border:'2px solid #2a5bd7', padding:12, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, boxShadow:'0 20px 60px rgba(42,91,215,0.3)'}}>
            {['BUILDER','PAYMENTS','PATIENT PORTAL','ANALYTICS','COMPLIANCE','EMR','COMPOUNDING','PHARMACY'].map(t=>(
              <div key={t} style={{background:'#0b1a3d', border:'1px solid #1d3a7a', borderRadius:8, padding:'16px 8px', textAlign:'center', fontSize:8, fontWeight:700, letterSpacing:1}}>{t}</div>
            ))}
          </div>
          <div style={{textAlign:'right', marginTop:-20, marginRight:20, fontSize:24}}>🚚 Delivery</div>
        </div>
      </div>

      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`}</style>

      {/* PRIVATE BETA + Title */}
      <div style={{textAlign:'center', padding:'20px 24px 80px'}}>
        <span style={{background:'#221a0f', color:'#d4a76a', border:'1px solid #3a2e1a', padding:'6px 14px', borderRadius:20, fontSize:12, letterSpacing:1}}>PRIVATE BETA</span>
        <h1 style={{fontSize:'52px', lineHeight:1.05, fontWeight:800, marginTop:20}}>The Platform<br/>for<br/>Telehealth</h1>
        <p style={{opacity:0.6, marginTop:16, maxWidth:400, marginInline:'auto'}}>Bask provides a full service software that allows you to build any digital health experience. Built for entrepreneurs, doctors, and pharmacists.</p>
        
        <div style={{marginTop:28, display:'flex', gap:12, justifyContent:'center'}}>
          <Link href="/intake" style={{background:'white', color:'black', padding:'12px 20px', borderRadius:10, textDecoration:'none', fontWeight:700}}>View Demo Intake →</Link>
          <Link href="/builder" style={{border:'1px solid #333', color:'white', padding:'12px 20px', borderRadius:10, textDecoration:'none'}}>Builder</Link>
        </div>
      </div>

      {/* EMAIL MODAL - Get Started */}
      {showModal && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'grid', placeItems:'center', zIndex:99, padding:20}}>
          <div style={{background:'white', color:'black', padding:24, borderRadius:16, width:'100%', maxWidth:400}}>
            <h2 style={{fontSize:20, fontWeight:800}}>Get started with Bask</h2>
            <p style={{opacity:0.6, fontSize:14, marginTop:6}}>Enter your email - we will create your telehealth store</p>
            <form onSubmit={(e)=>{e.preventDefault(); alert(`Welcome ${email} - check console for lead → tRPC → Drizzle`); console.log({email}); setShowModal(false);}} style={{marginTop:16, display:'grid', gap:12}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="you@company.com" style={{border:'1px solid #ccc', padding:12, borderRadius:8}} />
              <button style={{background:'#2a5bd7', color:'white', padding:12, borderRadius:8, border:0, fontWeight:700}}>Continue →</button>
              <button type="button" onClick={()=>setShowModal(false)} style={{background:'transparent', border:0, opacity:0.5}}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
                     }
