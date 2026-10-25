"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import {
  ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Banknote, BriefcaseBusiness,
  CheckCircle2, ChevronRight, CircleDollarSign, Compass, Folder, Home, Map, Menu,
  Plus, ReceiptText, ShoppingBasket, Sparkles, Target, TrendingUp, Utensils, Wallet,
  X, BadgeCheck, BookOpen, UserRound, Car
} from "lucide-react";
import { opportunities, transactions, user, workRecords, lessons } from "@/lib/data";

type Page = "home" | "wallet" | "next" | "money" | "proof" | "profile";

const nav = [
  ["home", "Home", Home],
  ["wallet", "HerWallet", Wallet],
  ["next", "Next Move", Compass],
  ["money", "MoneyMap", Map],
  ["proof", "ProofPocket", Folder],
] as const;

export default function HerizonApp() {
  const [page, setPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showWork, setShowWork] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const go = (p: Page) => { setPage(p); setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pageTitle = useMemo(() => ({home:"Home", wallet:"HerWallet", next:"Your Next Move", money:"MoneyMap", proof:"ProofPocket", profile:"Profile"}[page]), [page]);

  return (
    <div className="herizon-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark"><TrendingUp size={22}/></div><span>Herizon</span></div>
        <nav className="nav">
          {nav.map(([key,label,Icon]) => <button key={key} className={page===key?"active":""} onClick={()=>go(key as Page)}><Icon size={21}/><span>{label}</span>{key==="next"&&<span className="for-you">FOR YOU</span>}</button>)}
        </nav>
        <button className="profile-chip" onClick={()=>go("profile")}><div className="avatar">N</div><div><strong>Naledi</strong><small>Naledi's Kitchen</small></div></button>
      </aside>

      <main className="main">
        <div className="mobile-top">
          <div className="brand"><div className="brand-mark"><TrendingUp size={18}/></div><span>Herizon</span></div>
          <button className="soft-button" onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?<X size={19}/>:<Menu size={19}/>}</button>
        </div>
        {mobileOpen && <div className="card" style={{marginBottom:20}}><div className="nav">{nav.map(([key,label,Icon])=><button key={key} onClick={()=>go(key as Page)}><Icon size={19}/><span>{label}</span></button>)}<button onClick={()=>go("profile")}><UserRound size={19}/><span>Profile</span></button></div></div>}

        <div className="content">
          {page === "home" && <HomePage go={go} />}
          {page === "wallet" && <WalletPage onAdd={()=>setShowTransaction(true)} />}
          {page === "next" && <NextMovePage />}
          {page === "money" && <MoneyMapPage selectedChoice={selectedChoice} setSelectedChoice={setSelectedChoice} />}
          {page === "proof" && <ProofPocketPage onAdd={()=>setShowWork(true)} />}
          {page === "profile" && <ProfilePage />}
        </div>
      </main>

      {showTransaction && <Modal title="Add transaction" close={()=>setShowTransaction(false)}><TransactionForm close={()=>setShowTransaction(false)} /></Modal>}
      {showWork && <Modal title="Add completed work" close={()=>setShowWork(false)}><WorkForm close={()=>setShowWork(false)} /></Modal>}
    </div>
  );
}

function HomePage({go}:{go:(p:Page)=>void}) {
  return <>
    <div className="eyebrow">Thursday, 22 October</div>
    <h1>Good afternoon, Naledi</h1>
    <div className="grid-two">
      <section className="card wallet-card">
        <div className="card-label">Left this month</div><div className="big-number">R831</div>
        <div className="mini-grid"><div className="mini"><div className="green">↗ Money in</div><div className="value">R4 680</div></div><div className="mini"><div className="red">↘ Money out</div><div className="value">R3 849</div></div></div>
        <div className="muted" style={{marginTop:22}}>You have spent 82% of what came in</div><div className="progress"><span style={{width:"82%"}}/></div>
        <button className="link-btn" onClick={()=>go("wallet")}>Open HerWallet <ArrowRight size={15} style={{verticalAlign:"middle"}}/></button>
      </section>
      <section className="card next-card">
        <span className="pill"><Compass size={14}/> YOUR NEXT MOVE</span>
        <div style={{marginTop:13}}><span className="pill">Opportunity match</span></div>
        <div className="next-title">Apply for a stall at the Soweto Food Market</div>
        <p className="next-copy">Your sales are steady and you have 3 verified catering jobs in ProofPocket. Market traders like you earn more on weekends.</p>
        <button className="primary" onClick={()=>go("next")}>See your next move <ArrowRight size={16} style={{verticalAlign:"middle"}}/></button>
      </section>
    </div>
    <div className="section grid-three">
      <Stat icon={<Plus size={22}/>} title="Add income" value="R850" sub="Last payment" action={()=>go("wallet")}/>
      <Stat icon={<ArrowDownRight size={22}/>} title="Money out" value="R3 849" sub="This month" action={()=>go("wallet")}/>
      <Stat icon={<Folder size={22}/>} title="ProofPocket" value="3 verified" sub="Recent jobs" action={()=>go("proof")}/>
    </div>
    <div className="section grid-two">
      <section className="card"><div className="section-head"><div><h2>Keep learning</h2><div className="subtitle">Small lessons, practical progress.</div></div><button className="link-btn" onClick={()=>go("money")}>View all <ArrowRight size={15} style={{verticalAlign:"middle"}}/></button></div><div className="list">{lessons.slice(0,2).map((l)=><div className="row" key={l.title}><div className="row-left"><div className="row-icon"><BookOpen size={18}/></div><div><strong>{l.title}</strong><div className="muted">{l.time} · {l.category}</div></div></div><ChevronRight size={18} color="#8d8394"/></div>)}</div></section>
      <section className="card"><div className="section-head"><div><h2>Recent work</h2><div className="subtitle">Proof you can take with you.</div></div><button className="link-btn" onClick={()=>go("proof")}>Open <ArrowRight size={15} style={{verticalAlign:"middle"}}/></button></div><div className="list">{workRecords.slice(0,2).map(w=><div className="row" key={w.title}><div className="row-left"><div className="row-icon"><BadgeCheck size={18}/></div><div><strong>{w.title}</strong><div className="muted">{w.date}</div></div></div><span className="verified">✓ Verified</span></div>)}</div></section>
    </div>
  </>;
}

function Stat({icon,title,value,sub,action}:{icon:ReactNode,title:string,value:string,sub:string,action:()=>void}) { return <button className="card stat-card" onClick={action} style={{textAlign:"left",border:0}}><div className="stat-icon">{icon}</div><div className="muted">{title}</div><div className="stat-value">{value}</div><div className="muted">{sub}</div></button> }

function WalletPage({onAdd}:{onAdd:()=>void}) {
  return <><div className="page-header"><div><div className="eyebrow">Manage your money</div><h1 style={{marginBottom:8}}>HerWallet</h1><div className="subtitle">Know what comes in, what goes out, and what you're building toward.</div></div><button className="primary" onClick={onAdd}><Plus size={17} style={{verticalAlign:"middle"}}/> Add transaction</button></div>
    <div className="grid-three"><div className="card stat-card"><div className="muted">Left this month</div><div className="stat-value">R831</div><div className="progress"><span style={{width:"82%"}}/></div><div className="muted">82% of income spent</div></div><div className="card stat-card"><div className="muted">Money in</div><div className="stat-value">R4 680</div><div className="green">↑ +8% from last month</div></div><div className="card stat-card"><div className="muted">Money out</div><div className="stat-value">R3 849</div><div className="red">↓ 4% less than last month</div></div></div>
    <div className="section grid-two"><section className="card"><div className="section-head"><div><h2>Business goal</h2><div className="subtitle">Equipment fund</div></div><Target color="#7650c9"/></div><div className="big-number" style={{fontSize:38}}>R2 400 <span className="muted">/ R5 000</span></div><div className="progress"><span style={{width:"48%"}}/></div><div className="muted">48% complete · R2 600 to go</div></section><section className="card"><div className="section-head"><div><h2>Spending snapshot</h2><div className="subtitle">Where your money went</div></div><CircleDollarSign color="#7650c9"/></div><div className="row"><span>Ingredients</span><strong>R1 220</strong></div><div className="row"><span>Transport</span><strong>R640</strong></div><div className="row"><span>Stock & packaging</span><strong>R510</strong></div></section></div>
    <section className="section card"><div className="section-head"><div><h2>Recent activity</h2><div className="subtitle">Your latest transactions</div></div><ReceiptText color="#7650c9"/></div><div className="list">{transactions.map(t=><div className="row" key={t.label+t.date}><div className="row-left"><div className="row-icon">{t.icon==="ShoppingBasket"?<ShoppingBasket size={18}/>:t.icon==="Car"?<Car size={18}/>:<Banknote size={18}/>}</div><div><strong>{t.label}</strong><div className="muted">{t.date}</div></div></div><strong className={t.type==="in"?"green":"red"}>{t.type==="in"?"+":"-"} R{t.amount}</strong></div>)}</div></section>
  </>;
}

function NextMovePage() { return <><div className="page-header"><div><div className="eyebrow">Personalised for you</div><h1 style={{marginBottom:8}}>Your Next Move</h1><div className="subtitle">Opportunities matched to your skills, progress and goals.</div></div><span className="pill"><Sparkles size={14}/> 3 strong matches</span></div><section className="card next-card" style={{marginBottom:22}}><span className="pill"><Compass size={14}/> 94% MATCH</span><div className="next-title">Apply for a stall at the Soweto Food Market</div><p className="next-copy">This opportunity fits your current experience and your goal of growing your customer base.</p><div className="grid-three" style={{marginTop:18}}><div className="mini"><strong>Why you?</strong><div className="muted" style={{marginTop:7}}>3 verified catering jobs</div></div><div className="mini"><strong>What it could do</strong><div className="muted" style={{marginTop:7}}>Reach new customers</div></div><div className="mini"><strong>Next step</strong><div className="muted" style={{marginTop:7}}>Check application details</div></div></div><button className="primary" style={{marginTop:20}}>View opportunity <ArrowRight size={16} style={{verticalAlign:"middle"}}/></button></section><div className="grid-three">{opportunities.slice(1).map(o=><div className="card opportunity" key={o.id}><span className="match">{o.match}% match</span><h3>{o.title}</h3><div className="muted">{o.type}</div><p>{o.reason}</p><div>{o.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div><button className="link-btn" style={{marginTop:18}}>Explore <ArrowRight size={15} style={{verticalAlign:"middle"}}/></button></div>)}</div></> }

function MoneyMapPage({selectedChoice,setSelectedChoice}:{selectedChoice:string|null,setSelectedChoice:(s:string)=>void}) { return <><div className="page-header"><div><div className="eyebrow">Learn by doing</div><h1 style={{marginBottom:8}}>MoneyMap</h1><div className="subtitle">Practical money and business skills for real life.</div></div><span className="pill"><TrendingUp size={14}/> 80% progress</span></div><div className="grid-three">{lessons.map(l=><div className="card lesson" key={l.title}><div><div className="lesson-top"><span className="pill">{l.category}</span><BookOpen size={20} color="#7650c9"/></div><h3 style={{fontSize:19,margin:"18px 0 6px"}}>{l.title}</h3><div className="muted">{l.time} · {l.progress===100?"Completed":`${l.progress}% complete`}</div></div><div><div className="progress"><span style={{width:`${l.progress}%`}}/></div><button className="link-btn">{l.progress===100?"Review":"Continue"} <ArrowRight size={15} style={{verticalAlign:"middle"}}/></button></div></div>)}</div><section className="section card simulation"><div className="eyebrow">Interactive simulation</div><h2 style={{marginTop:8}}>Run your skincare business</h2><p className="subtitle">You have <strong>R1 500</strong> to start. Ingredients cost R500, packaging costs R250 and transport costs R150.</p><div className="card" style={{marginTop:20,boxShadow:"none"}}><strong>A customer asks for 20% off your price. What do you do?</strong><button className={selectedChoice==="accept"?"choice selected":"choice"} onClick={()=>setSelectedChoice("accept")}>A. Accept the discount</button><button className={selectedChoice==="negotiate"?"choice selected":"choice"} onClick={()=>setSelectedChoice("negotiate")}>B. Negotiate a smaller discount</button><button className={selectedChoice==="decline"?"choice selected":"choice"} onClick={()=>setSelectedChoice("decline")}>C. Decline the discount</button>{selectedChoice&&<div className="notice"><strong>{selectedChoice==="negotiate"?"Good thinking.":selectedChoice==="accept"?"Watch your margin.":"Know your customer, but know your costs too."}</strong> Your price should cover costs, leave room for profit, and still feel fair to the customer.</div>}</div></section></> }

function ProofPocketPage({onAdd}:{onAdd:()=>void}) { return <><div className="page-header"><div><div className="eyebrow">Make your experience visible</div><h1 style={{marginBottom:8}}>ProofPocket</h1><div className="subtitle">Turn completed work into portable proof of what you can do.</div></div><button className="primary" onClick={onAdd}><Plus size={17} style={{verticalAlign:"middle"}}/> Add work</button></div><div className="grid-three"><div className="card stat-card"><div className="stat-icon"><CheckCircle2 size={22}/></div><div className="muted">Completed jobs</div><div className="stat-value">12</div></div><div className="card stat-card"><div className="stat-icon"><BadgeCheck size={22}/></div><div className="muted">Verified clients</div><div className="stat-value">8</div></div><div className="card stat-card"><div className="stat-icon"><Banknote size={22}/></div><div className="muted">Recorded earnings</div><div className="stat-value">R4 850</div></div></div><section className="section card"><div className="section-head"><div><h2>Naledi's Kitchen</h2><div className="subtitle">Catering · 8 verified clients</div></div><button className="soft-button">Share portfolio</button></div><div className="list">{workRecords.map(w=><div className="row work-card" key={w.title}><div className="work-photo"><Utensils size={26}/></div><div><strong>{w.title}</strong><div className="muted">{w.client} · {w.date}</div><div style={{marginTop:5}}>{w.skills.map(s=><span className="tag" key={s}>{s}</span>)}</div></div><div style={{textAlign:"right"}}><strong>R{w.amount}</strong><div className="verified" style={{marginTop:7}}>✓ Verified</div></div></div>)}</div></section><section className="section card profile-hero"><div className="eyebrow">Your portable proof</div><h2 style={{marginTop:8}}>A profile that shows what you've actually done.</h2><p className="subtitle" style={{maxWidth:700}}>Instead of saying “I have experience”, Naledi can show completed work, verified clients, skills and earnings in one shareable portfolio.</p></section></> }

function ProfilePage(){return <><div className="eyebrow">Your Herizon profile</div><h1>Profile</h1><section className="card profile-hero"><div className="big-avatar">N</div><h2>Naledi</h2><div className="subtitle">Naledi's Kitchen · Johannesburg</div><div style={{marginTop:22}}>{user.skills.map(s=><span className="tag" key={s}>{s}</span>)}</div><div className="grid-two" style={{marginTop:22}}><div className="mini"><strong>Goals</strong><div className="muted" style={{marginTop:8}}>Grow my business<br/>Increase income</div></div><div className="mini"><strong>Experience</strong><div className="muted" style={{marginTop:8}}>12 completed jobs<br/>8 verified clients</div></div></div></section></>}

function Modal({title,close,children}:{title:string,close:()=>void,children:ReactNode}){return <div style={{position:"fixed",inset:0,background:"rgba(48,40,63,.35)",display:"grid",placeItems:"center",zIndex:50,padding:18}} onClick={close}><div className="card" style={{width:"min(560px,100%)",maxHeight:"90vh",overflow:"auto"}} onClick={e=>e.stopPropagation()}><div className="section-head"><h2>{title}</h2><button className="soft-button" onClick={close}><X size={17}/></button></div>{children}</div></div>}
function TransactionForm({close}:{close:()=>void}){return <div><div className="form-grid"><div className="form-field"><label>Type</label><select className="input"><option>Money in</option><option>Money out</option></select></div><div className="form-field"><label>Amount</label><input className="input" placeholder="R 0.00"/></div></div><div className="form-field" style={{marginTop:14}}><label>Category</label><select className="input"><option>Sales</option><option>Ingredients</option><option>Transport</option><option>Other</option></select></div><div className="form-field" style={{marginTop:14}}><label>Description</label><input className="input" placeholder="e.g. Catering order"/></div><button className="primary" style={{marginTop:18}} onClick={close}>Add transaction</button></div>}
function WorkForm({close}:{close:()=>void}){return <div><div className="form-field"><label>Job title</label><input className="input" placeholder="e.g. Birthday event catering"/></div><div className="form-grid" style={{marginTop:14}}><div className="form-field"><label>Client</label><input className="input" placeholder="Client name"/></div><div className="form-field"><label>Amount earned</label><input className="input" placeholder="R 0.00"/></div></div><div className="form-field" style={{marginTop:14}}><label>Skills used</label><input className="input" placeholder="Catering, customer service"/></div><button className="primary" style={{marginTop:18}} onClick={close}>Save work record</button></div>}
