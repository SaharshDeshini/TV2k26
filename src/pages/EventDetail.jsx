"use client";

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  RiArrowLeftLine, 
  RiArrowDownLine,
  RiShieldLine, 
  RiTrophyLine, 
  RiGroupLine, 
  RiTimeLine,
  RiAwardLine,
  RiQuestionLine,
  RiDoubleQuotesL
} from "react-icons/ri";
import confetti from "canvas-confetti";
import SketchfabBackground from "@/components/SketchfabBackground";
import SparksEffect from "@/components/SparksEffect";
import SmoothScroll from "@/components/SmoothScroll";
import Magnetic from "@/components/Magnetic";

const eventRegistry = {
  hackathon: {
    name: "Stark Hackathon",
    hero: "Iron Man",
    theme: "Stark Industries",
    tagline: "Build the Future in 24 Hours.",
    desc: "Deploy your programming armor. Stark Industries needs operatives to engineer real-time application matrices. You have 24 hours to design, construct, and deploy a working system that addresses critical energy grid or planetary defense parameters.",
    modelId: "69dde1ad49e94852984e3d83928efd65",
    accentColor: "#A11217", // Rich Red
    glowColor: "rgba(161, 18, 23, 0.45)",
    textColor: "#ffffff",
    difficulty: "THREAT LEVEL: OMEGA",
    teamSize: "2 - 4 Operatives",
    prizes: "₹35,000 Prize Pool",
    rules: [
      { title: "No Pre-built Codebase Matrices", detail: "All logic templates and repository scripts must start from scratch at T-0. Standard frameworks are authorized." },
      { title: "Address Clean Energy Challenge Tracks", detail: "Prototypes must directly solve one of the energy grid distribution or defense telemetry challenges." },
      { title: "Live System Auditing", detail: "Operatives must demonstrate the live operational application to the Stark Board during the final audit." }
    ]
  },
  "ml-challenge": {
    name: "Mystic AI Quest",
    hero: "Doctor Strange",
    theme: "Mystic AI",
    tagline: "We saw 14,005 futures. Build the best model.",
    desc: "Step inside the Sanctum Sanctorum neural networks. Predict complex outcomes, parse multi-dimensional anomalies, and develop machine learning models to secure the space-time fabric. You are tasked with analyzing raw high-dimensional dataset matrices to secure the optimum future path.",
    modelId: "f236e1da1b574a98bb6466b9d4e7e20c",
    accentColor: "#FF6D00", // Strange Orange
    glowColor: "rgba(255, 109, 0, 0.45)",
    textColor: "#ffffff",
    difficulty: "THREAT LEVEL: ALPHA",
    teamSize: "1 - 3 Operatives",
    prizes: "₹25,000 Prize Pool",
    rules: [
      { title: "Standard Jupyter runtime cores", detail: "Models must be fully executable in standard Python and Jupyter Notebooks environments." },
      { title: "No Pre-trained weights", detail: "Use of pre-trained parameters is strictly prohibited unless explicitly authorized in the task logs." },
      { title: "Automated evaluation dataset validation", detail: "Submissions will be scored instantly based on classification accuracy and loss ratios on hidden nodes." }
    ]
  },
  "debug-or-die": {
    name: "Web Debug Matrix",
    hero: "Spider-Man",
    theme: "Cyber Web",
    tagline: "Every Bug Has a Weakness.",
    desc: "Stark Tower's primary core has been compromised. The firewall contains critical memory leaks, dangling pointer chains, and syntax errors. Navigate through the code web, identify structural defects, and patch the matrix before the system shuts down.",
    modelId: "11258609738d479abd4af04bd6c8c1b8",
    accentColor: "#1976D2", // Spidey Blue
    glowColor: "rgba(25, 118, 210, 0.45)",
    textColor: "#ffffff",
    difficulty: "THREAT LEVEL: BETA",
    teamSize: "1 - 2 Operatives",
    prizes: "₹15,000 Prize Pool",
    rules: [
      { title: "Compiler lockout penalties", detail: "Submitting broken patches that create memory loop locks will incur penalty points." },
      { title: "Sequential Tier Solving", detail: "The code firewall contains 3 distinct layer matrices. You must solve them in sequence." },
      { title: "No external helper libraries", detail: "Only standard vanilla utility structures are permitted. Custom frameworks are restricted." }
    ]
  },
  "data-detective": {
    name: "Stealth Crypt",
    hero: "Black Panther",
    theme: "Wakanda Tech",
    tagline: "Wakanda Forever. Code Forever.",
    desc: "Access the secure Wakandan database hubs. This is a security capture-the-flag (CTF) operation. Crack encryption matrices, decode raw vibrations telemetry logs, and capture key files from vibranium repositories without triggering alarm nodes.",
    modelId: "9c33cfe0a90f4e9f8c318a5b6ad63988",
    accentColor: "#9C27B0", // Wakanda Purple
    glowColor: "rgba(156, 39, 176, 0.45)",
    textColor: "#ffffff",
    difficulty: "THREAT LEVEL: ALPHA",
    teamSize: "1 - 2 Operatives",
    prizes: "₹15,000 Prize Pool",
    rules: [
      { title: "No host brute force loops", detail: "Scripted password guessing loops will be detected by security overlays, causing an immediate ban." },
      { title: "Format matching flags", detail: "Flags must exactly follow the hashed string syntax parameters: SHIELD{...}." },
      { title: "No cross-team log sharing", detail: "Collusion or code trades will result in immediate disqualification and security node blocks." }
    ]
  },
  "dq-code-fest": {
    name: "Mjolnir Code Fest",
    hero: "Thor",
    theme: "Lightning Code",
    tagline: "Write Code Worthy of Mjolnir.",
    desc: "A pure test of algorithmic muscle. Compete in a rapid sequence of competitive programming challenges. Write code that maximizes space-time efficiency, handles extreme input buffers, and demonstrates logic worthy of Mjolnir.",
    modelId: "24b558bda86f41f19fa45ff3f6056273",
    accentColor: "#00E5FF", // Thor Lightning Blue
    glowColor: "rgba(0, 229, 255, 0.45)",
    textColor: "#ffffff",
    difficulty: "THREAT LEVEL: OMEGA",
    teamSize: "1 - 2 Operatives",
    prizes: "₹20,000 Prize Pool",
    rules: [
      { title: "Supported standard core runtimes", detail: "Compile targets are limited to standard compiler versions of C++, Java, Python, and Go." },
      { title: "Standard plagiarism verification", detail: "Similarity checkers are active. Logic coordinates must be fully unique." },
      { title: "Optimization metrics scoring", detail: "Code scores will evaluate exact CPU execution timelines and memory size limits." }
    ]
  },
  "guest-lectures": {
    name: "Shield Summit",
    hero: "Captain America",
    theme: "Leadership",
    tagline: "Learn from the Legends.",
    desc: "Assemble for strategic briefings. Gain insights from the directors of systems engineering and cybersecurity operatives. Learn about next-generation command networks, scalable software architectures, and security protocols.",
    modelId: "f1ef32ced357429ab4ea9c6e971e77eb",
    accentColor: "#0D47A1", // Cap Blue
    glowColor: "rgba(13, 71, 161, 0.45)",
    textColor: "#ffffff",
    difficulty: "CLEARANCE: ALL AGENCIES",
    teamSize: "Open Access",
    prizes: "S.H.I.E.L.D. Certificates",
    rules: [
      { title: "Punctual session entry", detail: "Access portals lock 10 minutes prior to session ignition. Early seat synchronization is advised." },
      { title: "Active leadership thread", detail: "Operatives are expected to participate in leadership briefings and Q&A logs." },
      { title: "Certificate dispatch parameters", detail: "Digital clearance credentials will be transmitted directly to registration emails post-summit." }
    ]
  }
};

const heroQuotes = {
  hackathon: {
    quote: "Sometimes you gotta run before you can walk.",
    author: "Tony Stark // Iron Man"
  },
  "ml-challenge": {
    quote: "We never lose our demons, we only learn to live above them.",
    author: "Stephen Strange // Doctor Strange"
  },
  "debug-or-die": {
    quote: "With great power comes great responsibility.",
    author: "Peter Parker // Spider-Man"
  },
  "data-detective": {
    quote: "I only wanted to do something good. To be someone better than myself.",
    author: "Natasha Romanoff // Black Widow"
  },
  "dq-code-fest": {
    quote: "I choose to run towards my problems. Because that's what heroes do.",
    author: "Thor Odinson // God of Thunder"
  },
  "guest-lectures": {
    quote: "The price of freedom is high, and it's a price I'm willing to pay.",
    author: "Steve Rogers // Captain America"
  }
};

const faqData = [
  { q: "Who is eligible to participate in these tactical missions?", a: "Any active agent or student currently registered at a recognized institution. Multi-college squads are fully authorized." },
  { q: "Are there any entry fees or clearance charges?", a: "Negative. Access clearance is completely sponsored by S.H.I.E.L.D. and corporate alliances. Participation is free." },
  { q: "What hardware should we bring to the mission coordinates?", a: "Agents must carry their own computing terminals (laptops), charging hardware, and software editors. Local Wi-Fi networks will be synced." }
];

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = eventRegistry[id];

  const [registered, setRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedRuleIdx, setExpandedRuleIdx] = useState(null);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/home");
    }
  };

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (event) {
      document.title = `${event.name} | Avengers Command Center`;
    } else {
      document.title = "404 // Clearance Level Exceeded | Avengers Command Center";
    }
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center text-center px-6 font-switzer">
        <h1 className="font-stardom text-4xl text-red-500 mb-4">404 // CLEARANCE LEVEL EXCEEDED</h1>
        <p className="text-gray-400 text-sm max-w-sm mb-8">
          The requested mission coordinate does not exist or has been locked by Stark security protocols.
        </p>
        <Link to="/" className="px-6 py-3 rounded-full bg-red-500/10 border border-red-500 text-red-400 font-stardom text-xs uppercase tracking-wider hover:bg-red-500 hover:text-black transition-all">
          Return to Command Center
        </Link>
      </div>
    );
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setRegistered(true);
      
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.65 },
        colors: [event.accentColor, "#850307", "#00E5FF"]
      });
    }, 1500);
  };

  const scrollToRegister = () => {
    const el = document.getElementById("registration-core");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const rewardsList = [
    { title: "VIBRANIUM BOUNTY", val: event.prizes, desc: "Awarded to the top scoring tactical squad in standard evaluation parameters.", icon: <RiAwardLine /> },
    { title: "AVENGER SWAG BOX", val: "Tech Merch", desc: "Exclusive S.H.I.E.L.D. gear, custom tech accessories, and credential tags.", icon: <RiTrophyLine /> },
    { title: "CLEARANCE LOGS", val: "Leader Certificates", desc: "S.H.I.E.L.D. corporate alliance certificates and internship logs eligibility.", icon: <RiShieldLine /> }
  ];

  const timelineStages = [
    { time: "09:00 AM", title: "MISSION ACTIVATION", desc: "Briefing files sync. Registration closes and challenge routes open." },
    { time: "01:00 PM", title: "MIDPOINT CHECKPOINT", desc: "Tactical telemetry analysis. Submit progress logs to control." },
    { time: "09:00 PM", title: "OVERNIGHT SPRINT", desc: "System locks initiate. Final coding iterations and clean energy tests." },
    { time: "09:00 AM +1D", title: "FINAL EVALUATION", desc: "Armor presentations. System audit by Stark Engineering Council." }
  ];

  const quoteData = heroQuotes[id] || { quote: "Whatever it takes.", author: "S.H.I.E.L.D. Command" };

  return (
    <SmoothScroll>
      <div 
        className="relative min-h-screen bg-[#090B10] text-[#E2E8F0] overflow-hidden"
        style={{
          "--card-hover-border": `${event.accentColor}66`,
          "--card-hover-glow": event.glowColor,
          "--card-hover-inner": `${event.accentColor}1a`
        }}
      >
        <SparksEffect />
        
        {/* Fullscreen 3D Background */}
        <SketchfabBackground modelId={event.modelId} overlayOpacity={0.45} fadeOutOnScroll={false} />

        {/* Floating background grids */}
        <div className="absolute inset-0 bg-radar opacity-[0.03] pointer-events-none" />

        {/* 1. Header Navigation */}
        <header className="absolute top-0 left-0 w-full z-30 py-6 border-b border-white/5 bg-gradient-to-b from-[#000000] to-transparent">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <Magnetic pullStrength={0.2}>
              <button 
                onClick={handleBack}
                className="flex items-center gap-2 font-stardom text-xs uppercase tracking-widest text-gray-300 hover:text-white transition-colors"
              >
                <RiArrowLeftLine className="text-sm" />
                Dossier Archives
              </button>
            </Magnetic>

            <span className="font-mono text-[9px] tracking-wider uppercase" style={{ color: event.accentColor }}>
              DECRYPTED // {event.theme.toUpperCase()}_NET
            </span>
          </div>
        </header>

        {/* 2. Fullscreen Hero Banner */}
        <section className="min-h-screen w-full flex flex-col items-center justify-center relative px-6 text-center select-none pt-20">
          <div className="max-w-4xl mx-auto space-y-6 relative z-10">
            {/* Fest Details Header */}
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.75, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-stardom text-xs sm:text-sm tracking-[0.35em] uppercase text-gray-400"
            >
              TECHNOVISTA 2K25 • A DATA SCIENCE TECH CARNIVAL
            </motion.p>

            {/* Superhero tag */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/[0.02] backdrop-blur-sm"
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: event.accentColor }} />
              <span className="font-stardom text-[10px] tracking-widest uppercase text-gray-400">
                HERO NODE: {event.hero.toUpperCase()}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-boska text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none drop-shadow-md"
            >
              {event.name}
            </motion.h1>

            {/* Tagline */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-stardom text-base sm:text-lg uppercase tracking-[0.3em] font-medium"
              style={{ color: event.accentColor }}
            >
              {event.tagline}
            </motion.p>

            {/* Action buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={scrollToRegister}
                className="px-8 py-3.5 rounded-xl text-black font-stardom text-xs tracking-widest uppercase transition-all duration-300 shadow-md font-bold"
                style={{
                  backgroundColor: event.accentColor,
                  boxShadow: `0 0 20px ${event.glowColor}`
                }}
              >
                Initiate Interface
              </button>
              <button 
                onClick={() => {
                  const el = document.getElementById("briefing");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3.5 rounded-xl border border-white/10 hover:border-white/30 bg-black/40 hover:bg-black/70 backdrop-blur-md text-white font-stardom text-xs tracking-widest uppercase transition-all duration-300"
              >
                Inspect Dossier
              </button>
            </motion.div>
          </div>

          {/* Scroll indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 font-mono text-[9px] uppercase tracking-widest z-10">
            <span>Scroll to Briefing</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <RiArrowDownLine className="text-sm" />
            </motion.div>
          </div>
        </section>

        {/* 3. Mission Briefing Section */}
        <section id="briefing" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-md rounded-t-[40px] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Brief */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-boska text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
                MISSION BRIEFING
              </h2>
              <div className="w-16 h-0.5" style={{ backgroundColor: event.accentColor }} />
              <p className="font-switzer text-gray-300 text-sm sm:text-base leading-relaxed">
                {event.desc}
              </p>
              
              {/* Tactical Objectives */}
              <div className="space-y-4 pt-4">
                <h3 className="font-stardom text-xs uppercase tracking-widest text-gray-400">
                  TACTICAL OBJECTIVES
                </h3>
                <div className="space-y-3">
                  {[
                    "Formulate a scalable infrastructure matching high-throughput constraints.",
                    "Ensure maximum telemetry precision without computational bottlenecks.",
                    "Optimize execution algorithms to pass automated evaluation tests."
                  ].map((obj, i) => (
                    <div key={i} className="flex gap-3 items-start text-xs sm:text-sm text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: event.accentColor }} />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right stats */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { icon: <RiShieldLine />, label: "Security Clearance", val: event.difficulty },
                { icon: <RiGroupLine />, label: "Squad Metrics", val: event.teamSize },
                { icon: <RiTrophyLine />, label: "Vibranium Rewards", val: event.prizes },
                { icon: <RiTimeLine />, label: "Duration Grid", val: "24 Hours" }
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="glass-card p-5 rounded-xl border border-white/5 flex flex-col justify-between h-32"
                >
                  <div className="text-xl" style={{ color: event.accentColor }}>{stat.icon}</div>
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-gray-500 font-mono mb-1">{stat.label}</div>
                    <div className="font-stardom text-xs uppercase text-white tracking-wider leading-tight">{stat.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Rules & Guidelines Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-boska text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              MISSION GUIDELINES
            </h2>
            <p className="font-stardom text-xs uppercase tracking-widest text-gray-500 mt-2">
              Review parameters prior to engagement
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {event.rules.map((rule, idx) => {
              const isExpanded = expandedRuleIdx === idx;
              return (
                <div 
                  key={idx}
                  className="glass-card rounded-xl border border-white/5 overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: isExpanded ? `${event.accentColor}55` : "rgba(255, 255, 255, 0.05)"
                  }}
                >
                  <button
                    onClick={() => setExpandedRuleIdx(isExpanded ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[9px] border border-white/10 text-gray-400">
                        0{idx + 1}
                      </div>
                      <span className="font-stardom text-sm sm:text-base text-white uppercase tracking-wider">
                        {rule.title}
                      </span>
                    </div>
                    <span 
                      className="text-lg transition-transform duration-300"
                      style={{ 
                        color: event.accentColor,
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/5 font-switzer text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {rule.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Challenge Timeline Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10 bg-black/40 backdrop-blur-sm rounded-[30px] border border-white/5">
          <div className="text-center mb-16">
            <h2 className="font-boska text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              TACTICAL TIMELINE
            </h2>
            <p className="font-stardom text-xs uppercase tracking-widest text-gray-500 mt-2">
              Timeline Coordinates
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline center line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />

            <div className="space-y-12">
              {timelineStages.map((stage, idx) => (
                <div key={idx} className={`relative flex flex-col md:flex-row ${idx % 2 === 0 ? "md:flex-row-reverse" : ""} items-start`}>
                  {/* Central node */}
                  <div 
                    className="absolute left-6 md:left-1/2 w-3.5 h-3.5 rounded-full bg-black border-2 -translate-x-1/2 top-1 z-10 transition-colors"
                    style={{ borderColor: event.accentColor }}
                  />

                  {/* Desktop side spacing */}
                  <div className="w-full md:w-1/2 md:px-8 pl-12 pr-4 md:text-right hidden md:block">
                    {idx % 2 === 0 ? (
                      <div>
                        <span className="font-stardom text-xl tracking-wider text-white">
                          {stage.time}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  {/* Card content */}
                  <div className="w-full md:w-1/2 md:px-8 pl-12 pr-4">
                    <div className="glass-card p-6 rounded-xl border border-white/5 relative">
                      <div className="md:hidden font-stardom text-sm mb-2" style={{ color: event.accentColor }}>
                        {stage.time}
                      </div>
                      <h3 className="font-stardom text-base text-white uppercase tracking-wider mb-2" style={{ color: event.accentColor }}>
                        {stage.title}
                      </h3>
                      <p className="font-switzer text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Vibranium Rewards Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-boska text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              TACTICAL BOUNTIES
            </h2>
            <p className="font-stardom text-xs uppercase tracking-widest text-gray-500 mt-2">
              Prizes & Clearance Rewards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {rewardsList.map((reward, i) => (
              <div 
                key={i} 
                className="glass-card p-6 rounded-xl border border-white/5 flex flex-col justify-between h-64 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
              >
                {/* Soft backdrop glow */}
                <div 
                  className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full filter blur-[35px] opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: event.accentColor }}
                />

                <div className="flex justify-between items-start">
                  <div className="text-2xl" style={{ color: event.accentColor }}>{reward.icon}</div>
                  <span className="font-mono text-[8px] text-gray-600 tracking-wider">HUD // SECURE</span>
                </div>

                <div>
                  <h4 className="font-stardom text-xs text-gray-500 uppercase tracking-widest mb-1">{reward.title}</h4>
                  <h3 className="font-boska text-3xl font-extrabold text-white tracking-wider mb-2 leading-none">{reward.val}</h3>
                  <p className="font-switzer text-gray-400 text-xs leading-relaxed">{reward.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Hero Quote Section */}
        <section className="py-28 relative overflow-hidden select-none bg-black/60 border-t border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center px-6 space-y-6 relative z-10">
            <div className="flex justify-center text-4xl text-white/20 mb-2">
              <RiDoubleQuotesL />
            </div>
            <h2 className="font-boska text-3xl sm:text-5xl font-black italic text-white tracking-tight leading-relaxed">
              "{quoteData.quote}"
            </h2>
            <p className="font-stardom text-xs uppercase tracking-[0.45em] pt-4" style={{ color: event.accentColor }}>
              {quoteData.author}
            </p>
          </div>
        </section>

        {/* 8. FAQ Accordion Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-boska text-4xl sm:text-5xl font-bold uppercase text-white tracking-tight">
              MISSION FAQ
            </h2>
            <p className="font-stardom text-xs uppercase tracking-widest text-gray-500 mt-2">
              Frequently Queried Logs
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqData.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div 
                  key={idx}
                  className="glass-card rounded-xl border border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-stardom text-sm sm:text-base text-white uppercase tracking-wider">
                      {faq.q}
                    </span>
                    <span 
                      className="text-lg transition-transform duration-300"
                      style={{ 
                        color: event.accentColor,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)"
                      }}
                    >
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-1 border-t border-white/5 font-switzer text-xs sm:text-sm text-gray-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Registration Core Section */}
        <section id="registration-core" className="py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-white/5 bg-black/60 rounded-b-[40px] shadow-2xl">
          <div className="max-w-2xl mx-auto">
            <div className="glass-panel p-8 sm:p-12 rounded-2xl border relative overflow-hidden" style={{ borderColor: `${event.accentColor}33` }}>
              {/* Decorative glows */}
              <div 
                className="absolute top-0 right-0 w-44 h-44 rounded-full filter blur-[60px] opacity-15 pointer-events-none"
                style={{ backgroundColor: event.accentColor }}
              />

              <div className="absolute top-4 right-6 font-mono text-[8px] tracking-wider text-white/20">
                PORTAL // TARGET_LOCK
              </div>

              {!registered ? (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-stardom text-2xl text-white uppercase tracking-widest">
                      ACTIVATE OPERATIVE INTERFACE
                    </h3>
                    <p className="font-switzer text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Register directly to the tactical briefing files database. Stand by for deploy parameters.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Codename (Full Name)"
                        required
                        className="w-full px-4 py-3.5 bg-black/80 border border-white/10 focus:border-white focus:outline-none rounded-xl text-xs text-white placeholder-gray-500 transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Comms Email"
                        required
                        className="w-full px-4 py-3.5 bg-black/80 border border-white/10 focus:border-white focus:outline-none rounded-xl text-xs text-white placeholder-gray-500 transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Agency Hub (College Name)"
                        required
                        className="w-full px-4 py-3.5 bg-black/80 border border-white/10 focus:border-white focus:outline-none rounded-xl text-xs text-white placeholder-gray-500 transition-colors"
                      />
                      <input
                        type="tel"
                        placeholder="Comms Frequency (Phone)"
                        required
                        className="w-full px-4 py-3.5 bg-black/80 border border-white/10 focus:border-white focus:outline-none rounded-xl text-xs text-white placeholder-gray-500 transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl text-black font-stardom text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 font-bold select-none cursor-pointer"
                    style={{
                      backgroundColor: event.accentColor,
                      boxShadow: `0 0 20px ${event.glowColor}`
                    }}
                  >
                    {loading ? "Synchronizing Grid..." : "Initiate Operation"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  <div 
                    className="w-20 h-20 rounded-full border mx-auto flex items-center justify-center text-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] animate-pulse"
                    style={{ borderColor: event.accentColor, color: event.accentColor, boxShadow: `0 0 25px ${event.glowColor}` }}
                  >
                    ✓
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-stardom text-2xl text-white uppercase tracking-widest">
                      ACCESS GRANTED // ALIGNED
                    </h3>
                    <p className="font-switzer text-gray-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                      Your coordinates are locked. Encryption keys and operations files have been transmitted to your comms email. Keep your frequencies open.
                    </p>
                  </div>
                  <button
                    onClick={() => setRegistered(false)}
                    className="px-6 py-2.5 rounded-full border border-gray-600 hover:border-white text-gray-400 hover:text-white font-stardom text-[10px] tracking-wider uppercase transition-all duration-300"
                  >
                    Modify Entry
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </SmoothScroll>
  );
}
