"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div style={{background:'#050507', color:'white', minHeight:'100vh', fontFamily:'sans-serif'}}>
      {/* NAV */}
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'16px 24px'}}>
        <span style={{background:'#2a5bd7', padding:'6px 12px', borderRadius:20, fontWeight:900}}>BASK</span>
        <button onClick={()=>setShowModal(true)} style={{background:'#2a5bd7', color:'white', padding:'10px 18px', borderRadius:10, border:0, fontWeight:600}}>Get started ›</button>
      </nav>

      {/* 1. MOVING BUILDING HERO */}
      <div style={{padding:'10px 0 10px', display:'grid', placeItems:'center', background:'radial-gradient(600px at 50% 0%, #112 0%, #050507 70%)'}}>
        <div style={{animation:'float 4s ease-in-out infinite', width:'90%', maxWidth:760}}>
          <div style={{background:'linear-gradient(180deg,#1a3a8a,#0f2456)', borderRadius:12, border:'2px solid #2a5bd7', padding:10, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6}}>
            {['BUILDER','PAYMENTS','PATIENT PORTAL','ANALYTICS','EMR','COMPOUNDING','PHARMACY','ORDER MGMT'].map(t=>(
              <div key={t} style={{background:'#0b1a3d', border:'1px solid #1d3a7a', borderRadius:6, padding:'14px 4px', textAlign:'center', fontSize:7, fontWeight:700}}>{t}</div>
            ))}
          </div>
          <div style={{textAlign:'right', marginTop:4}}>🚚 Delivery</div>
        </div>
      </div>

      {/* 2. PLATFORM FOR TELEHEALTH */}
      <div style={{textAlign:'center', padding:'20px 24px 40px'}}>
        <span style={{background:'#221a0f', color:'#d4a76a', border:'1px solid #3a2e1a', padding:'5px 12px', borderRadius:20, fontSize:11}}>PRIVATE BETA</span>
        <h1 style={{fontSize:52, lineHeight:1, fontWeight:800, marginTop:18}}>The Platform<br/>for<br/>Telehealth</h1>
        <p style={{opacity:0.6, marginTop:14, maxWidth:380, marginInline:'auto', fontSize:14}}>Bask provides a full service software that allows you to build any digital health experience.</p>
      </div>

      {/* 3. TELEHEALTH MEETS E-COMMERCE - THE PART YOU MISSED */}
      <div style={{background:'white', color:'black', borderRadius:'24px 24px 0 0', padding:'32px 20px'}}>
        <div style={{maxWidth:900, margin:'0 auto'}}>
          <span style={{background:'#eef2ff', color:'#2a5bd7', padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700}}>E-COMMERCE ENGINE</span>
          <h2 style={{fontSize:36, fontWeight:800, lineHeight:1.1, marginTop:12}}>Telehealth meets<br/>E-Commerce</h2>
          <p style={{opacity:0.6, marginTop:10}}>Launch your DTC health brand with Shopify-like experience. Products, subscriptions, checkout, and pharmacy fulfillment — all in one.</p>
          
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:24}}>
            {[
              {title:'Storefront', desc:'White-label shop', price:'$299/mo'},
              {title:'Weight Loss Kit', desc:'Semaglutide + Consult', price:'$149/mo'},
              {title:'Checkout', desc:'Subscriptions + Payments', price:'Secure'},
            ].map(card=>(
              <div key={card.title} style={{border:'1px solid #e5e7eb', borderRadius:12, padding:12}}>
                <div style={{background:'#f3f4f6', height:80, borderRadius:8, display:'grid', placeItems:'center', fontSize:24}}>🛍️</div>
                <div style={{fontWeight:700, marginTop:8, fontSize:14}}>{card.title}</div>
                <div style={{fontSize:12, opacity:0.6}}>{card.desc}</div>
                <div style={{fontWeight:800, marginTop:6, fontSize:13}}>{card.price}</div>
              </div>
            ))}
          </div>

          <div style={{display:'flex', gap:10, marginTop:20}}>
            <Link href="/intake" style={{background:'black', color:'white', padding:'12px 18px', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:14}}>View Demo Intake →</Link>
            <Link href="/builder" style={{border:'1px solid #ddd', padding:'12px 18px', borderRadius:10, textDecoration:'none', color:'black', fontWeight:600, fontSize:14}}>Open Builder</Link>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12, marginTop:28, borderTop:'1px solid #eee', paddingTop:16}}>
            <div><b>✓ No-Code</b><div style={{fontSize:12, opacity:0.6}}>Intake builder like Bask</div></div>
            <div><b>✓ Pharmacy</b><div style={{fontSize:12, opacity:0.6}}>Nationwide fulfillment</div></div>
            <div><b>✓ EMR → tRPC</b><div style={{fontSize:12, opacity:0.6}}>Form to EMR flow</div></div>
          </div>
        </div>
      </div>

      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>

      {/* EMAIL MODAL */}
      {showModal && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', display:'grid', placeItems:'center', zIndex:99, padding:20}}>
          <div style={{background:'white', color:'black', padding:20, borderRadius:16, width:'100%', maxWidth:380}}>
            <h3 style={{fontWeight:800}}>Get started with Bask</h3>
            <p style={{fontSize:13, opacity:0.6, marginTop:4}}>Enter email to create your store</p>
            <form onSubmit={(e)=>{e.preventDefault(); alert(`Lead saved: ${email}`); setShowModal(false);}} style={{marginTop:14, display:'grid', gap:10}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} required type="email" placeholder="you@company.com" style={{border:'1px solid #ccc', padding:11, borderRadius:8}} />
              <button style={{background:'#2a5bd7', color:'white', padding:11, borderRadius:8, border:0, fontWeight:700}}>Continue →</button>
            </form>
            <button onClick={()=>setShowModal(false)} style={{marginTop:8, background:'none', border:0, opacity:0.5, width:'100%'}}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
        }
