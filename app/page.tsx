"use client"
import Link from "next/link";
export default function Home(){
 return(
 <div className="min-h-screen bg-black text-white">
   <div className="sticky top-3 z-50 px-4"><div className="max-w-[1100px] mx-auto bg-[#101010] border border-zinc-800 rounded-[16px] px-4 py-3 flex justify-between"><div className="font-black text-sm">BASK</div><div className="flex gap-2"><Link href="/intake" className="bg-white text-black px-4 py-2 rounded-full text-sm">View Demo Intake →</Link><Link href="/builder" className="bg-[#2A6FFF] px-4 py-2 rounded-full text-sm">Builder</Link></div></div></div>
   <section className="text-center px-6 pt-20 max-w-[900px] mx-auto">
     <div className="inline-block bg-[#2A2215] border border-[#3d2e14] text-[#E8C07A] text-[11px] px-4 py-1.5 rounded-full mb-6">PRIVATE BETA</div>
     <h1 className="text-[56px] md:text-[80px] font-semibold leading-[0.9]">The Platform<br/>for<br/>Telehealth</h1>
     <p className="text-zinc-400 mt-6 max-w-[600px] mx-auto">Bask provides full service software to build any digital health experience. Built for entrepreneurs, doctors, and pharmacies. Trusted by 250+ companies, 10.5M+ orders.</p>
     <div className="flex gap-3 justify-center mt-8"><Link href="/builder" className="bg-[#2A6FFF] px-6 py-3 rounded-full text-sm">Talk to sales →</Link><Link href="/intake" className="bg-zinc-900 border border-zinc-800 px-6 py-3 rounded-full text-sm">See Demo Store</Link></div>
     <div className="mt-12 text-[11px] text-zinc-500">✓ Next.js • ✓ TypeScript • ✓ Tailwind • ✓ tRPC • ✓ Drizzle ORM • ✓ Postgres • ✓ Multi-tenant</div>
   </section>
   <section className="px-4 py-10"><div className="max-w-[1100px] mx-auto bg-gradient-to-br from-[#0E1A33] to-black border border-zinc-800 rounded-[32px] p-10"><h2 className="text-[42px] md:text-[64px] font-semibold leading-[0.9]">Telehealth<br/>meets<br/>E-Commerce</h2><p className="text-zinc-400 mt-6 max-w-[600px]">This clone proves end-to-end ownership: form field → tRPC → Drizzle ORM → Postgres → EMR Dashboard. Like Shopify for E-Prescribing.</p></div></section>
   <div className="text-center pb-10"><Link href="/intake" className="text-sm text-zinc-400 underline">→ Click here to see the white patient intake you built (the store)</Link></div>
 </div>
 )
       }
