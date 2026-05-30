"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// Helper for letter-by-letter animation
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { type: "spring", damping: 12, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.5,
      filter: "blur(10px)",
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={`flex flex-wrap justify-center ${className}`}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const CinematicHero = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#02040a] px-4 font-sans">
      
      {/* Animated Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-blue-700/30 rounded-full blur-[120px]"
        ></motion.div>
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute -bottom-[10%] -right-[10%] w-[60%] h-[60%] bg-indigo-700/20 rounded-full blur-[150px]"
        ></motion.div>
      </div>

      {/* Expanding Glow Orb */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 2.5, 4], opacity: [0, 0.8, 0] }}
        transition={{ duration: 4, ease: "circOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-400/40 rounded-full blur-[50px] z-10"
      ></motion.div>

      <div className="relative z-20 flex flex-col items-center text-center max-w-5xl mt-12">
        <AnimatedText
          text="Welcome To My Portfolio"
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.5, ease: "easeOut" }}
          className="text-base md:text-xl lg:text-2xl text-slate-300/90 font-light mb-14 max-w-3xl leading-relaxed tracking-wide"
        >
          Crafting modern web experiences, AI-powered applications, and innovative digital solutions. Explore my projects, skills, and journey as a developer.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2.2, ease: "easeOut" }}
          onClick={onExplore}
          className="px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-900/20 rounded-full text-white font-medium tracking-widest uppercase text-sm transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:-translate-y-1 group flex items-center gap-4 relative overflow-hidden"
        >
          <span className="relative z-10">Explore Portfolio</span>
          <svg className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
        </motion.button>
      </div>
    </div>
  );
};

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const glassCard = "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]";

  useEffect(() => {
    // Reveal content automatically after entrance animation (5s)
    const timer = setTimeout(() => setIsUnlocked(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleExplore = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      document.getElementById("about-me")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="bg-[#02040a] text-slate-200 min-h-screen selection:bg-cyan-500 selection:text-white font-sans overflow-hidden relative">
      
      {/* Cinematic Hero Entrance */}
      <CinematicHero onExplore={handleExplore} />

      {/* Content Wrapper */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-32 pb-32"
        >

          {/* 2. ABOUT ME */}
          <motion.section
            id="about-me"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="pt-24 px-6 md:px-12 max-w-7xl mx-auto"
          >
            <div className="flex items-center gap-6 mb-16">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Me</span></h2>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Intro */}
              <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-8 mb-8">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-cyan-500/30 p-1 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src="/profile.jpg"
                        alt="Profile Picture"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2306b6d4" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
                          (e.target as HTMLImageElement).style.backgroundColor = '#0f172a';
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl text-white font-semibold">Shubham Besetty</h3>
                    <p className="text-cyan-400">Information Technology Student</p>
                  </div>
                </div>
                <p className="text-xl leading-relaxed text-slate-300 font-light">
                  Passionate about problem-solving and seeking opportunities to apply technical skills in real-world projects. Skilled in <strong className="text-white font-medium drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Frontend and Backend Development</strong>, focusing on building scalable, performant, and beautifully animated web applications.
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <a href="#contact" className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-200 bg-transparent border border-cyan-500/50 rounded-full hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:border-cyan-400 overflow-hidden">
                    <span className="relative z-10">Let's Connect</span>
                    <div className="absolute inset-0 h-full w-0 bg-cyan-500/20 transition-all duration-300 ease-out group-hover:w-full z-0"></div>
                  </a>

                  {/* Download Resume Icon Button */}
                  <a
                    href="/resume.pdf"
                    download="Shubham_Besetty_Resume.pdf"
                    className="group flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 rounded-full text-slate-300 hover:text-cyan-300 transition-all shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                    title="Download Resume"
                  >
                    <svg xmlns="http://www.w3.org/2000/range/2000/svg" className="w-5 h-5 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span className="font-medium">Download CV</span>
                  </a>
                </div>
              </div>

              {/* Resume / PDF Preview Panel (Glassmorphism) */}
              <div className="lg:col-span-5 relative group perspective-1000">
                {/* Anti-gravity floating effect wrapper */}
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                  <div className={`${glassCard} relative p-2 aspect-[1/1.4] flex flex-col group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg] transition-transform duration-500`}>
                    <div className="flex justify-between items-center p-3 border-b border-white/5">
                      <span className="text-xs font-medium text-cyan-400 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div> Resume Preview
                      </span>
                      <a href="/resume.jpg" target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full text-white transition-colors">Open</a>
                    </div>
                    <div className="flex-1 bg-black/50 rounded-b-xl overflow-hidden relative">
                      {/* Resume image injected here */}
                      <img
                        src="/resume.jpg"
                        alt="Resume Preview"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%23334155" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="8" y1="12" x2="16" y2="12"></line><line x1="8" y1="16" x2="16" y2="16"></line><line x1="8" y1="8" x2="10" y2="8"></line></svg>';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* 3. EXPERIENCE TIMELINE */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="px-6 md:px-12 max-w-5xl mx-auto"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center text-white">Experience & Education</h2>

            <div className="relative border-l border-cyan-500/30 ml-4 md:ml-1/2 space-y-16 py-8">
              {/* Timeline Item 1 */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="relative pl-8 md:pl-16"
              >
                <div className="absolute w-6 h-6 bg-[#050505] border-2 border-cyan-500 rounded-full -left-[13px] top-0 shadow-[0_0_15px_rgba(6,182,212,0.8)] z-10 flex items-center justify-center">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                </div>
                <div className={`${glassCard} p-8 hover:-translate-y-2 transition-transform duration-300`}>
                  <span className="text-cyan-400 text-sm font-semibold tracking-wider mb-2 block">05/2025 – 06/2025</span>
                  <h3 className="text-2xl font-bold text-white">Machine Learning Intern</h3>
                  <h4 className="text-lg text-slate-400 mb-4">HMIES Solutions Pvt Ltd • Visakhapatnam</h4>
                  <p className="text-slate-300 leading-relaxed font-light">
                    Developed and trained Machine Learning models using Python and scikit-learn, producing 90% prediction accuracy. Processed 5,000+ real-world records through data preprocessing and feature engineering, implemented supervised learning algorithms, and optimized model performance.
                  </p>
                </div>
              </motion.div>

              {/* Timeline Item 2 */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
                className="relative pl-8 md:pl-16"
              >
                <div className="absolute w-6 h-6 bg-[#050505] border-2 border-slate-500 rounded-full -left-[13px] top-0 z-10 flex items-center justify-center"></div>
                <div className={`${glassCard} p-8 hover:-translate-y-2 transition-transform duration-300`}>
                  <span className="text-slate-400 text-sm font-semibold tracking-wider mb-2 block">2022 – 2026</span>
                  <h3 className="text-2xl font-bold text-white">B.Tech in Information Technology</h3>
                  <h4 className="text-lg text-slate-400 mb-4">MVGR College of Engineering • Vizianagaram</h4>
                  <p className="text-slate-300 leading-relaxed font-light">
                    Focusing on software engineering principles, frontend & backend development, and database management. <br /><span className="text-cyan-400 font-medium">CGPA: 7.51</span>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.section>

          {/* 4. PROJECTS (3D Tilt Cards) */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1 }}
            className="px-6 md:px-12 max-w-7xl mx-auto"
          >
            <div className="flex items-center gap-6 mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white whitespace-nowrap">Featured Projects</h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                {
                  title: "AI Resume Analyzer",
                  type: "Full Stack Web Application",
                  date: "05/2026",
                  desc: "Built an AI-powered Resume Analyzer that evaluates resumes, provides ATS scores, extracts key skills, and offers improvement suggestions to enhance job application success.",
                  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
                  link: "https://ai-resume-analyzer-kappa-tan.vercel.app/"
                },
                {
                  title: "Epileptic Seizure Prediction using Deep Learning",
                  type: "Academic Project",
                  date: "01/2025 – 04/2025",
                  desc: "Designed a deep learning-based epileptic seizure prediction system using LSTM and EEG signal analysis, accomplished 98.53% accuracy and 99.67% ROC-AUC score. Processed 10,000+ EEG records and built a Streamlit web app for real-time prediction.",
                  tags: ["Deep Learning", "LSTM", "Python", "Streamlit"],
                  link: "https://drive.google.com/drive/folders/1DnAJLZomr63fNEmduyUqczlNgNqedCfW"
                },
                {
                  title: "Crowd Density Estimator using YOLOv5",
                  type: "Mini project",
                  date: "04/2024 – 09/2024",
                  desc: "Developed a Flask-based AI web application utilizing YOLO object detection for real-time crowd density estimation. Supports both image and video uploads, generating live bounding boxes and inference results. Deployed on the Railway cloud platform.",
                  tags: ["Python", "Flask", "YOLOv5", "OpenCV", "Railway"],
                  link: "https://people-counter-app-production.up.railway.app/"
                }
              ].map((proj, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`${glassCard} p-8 relative overflow-hidden group flex flex-col`}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-6">
                      <span className="px-3 py-1 bg-cyan-900/40 text-cyan-400 text-xs rounded-full border border-cyan-500/30 uppercase tracking-wider">{proj.type}</span>
                      <span className="text-slate-500 text-sm font-medium">{proj.date}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors">{proj.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed font-light">{proj.desc}</p>

                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-2 mb-8 px-5 py-2 bg-cyan-950/30 border border-cyan-500/50 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold uppercase tracking-wider rounded-full transition-all w-max hover:shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                        <span>Details</span>
                        <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}

                    <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                      {proj.tags.map(tech => (
                        <span key={tech} className="text-slate-300 text-xs px-3 py-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* 5. SKILLS & CERTIFICATIONS (Floating Icons & Grid) */}
          <section className="px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">

            {/* Floating Skills */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-cyan-500"></span> Technical Arsenal
              </h2>

              <div className="space-y-8">
                {[
                  { category: "Languages & Scripting", items: ['HTML', 'CSS', 'JavaScript', 'C', 'C++'] },
                  { category: "Backend", items: ['Node.js', 'Express.js'] },
                  { category: "Database", items: ['MongoDB', 'SQL', 'DBMS'] },
                  { category: "Tools & Platforms", items: ['GitHub', 'VS Code', 'Vercel', 'Render'] },
                  { category: "Soft Skills", items: ['Problem-Solving & Critical Thinking', 'Time Management & Self-Motivation', 'Teamwork & Collaboration', 'Leadership', 'Fast Learner'] }
                ].map((skillGroup, idx) => (
                  <div key={idx}>
                    <h4 className="text-cyan-400/80 mb-4 uppercase tracking-widest text-xs font-semibold">{skillGroup.category}</h4>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((skill, i) => (
                        <motion.div
                          key={skill}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 4, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
                          className="px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-slate-200 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-white transition-all cursor-default shadow-lg"
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="pt-8">
                  <h4 className="text-cyan-400/80 mb-4 uppercase tracking-widest text-xs font-semibold">Languages</h4>
                  <div className="flex gap-6">
                    {['Telugu', 'Hindi', 'English'].map(lang => (
                      <span key={lang} className="text-slate-300 flex items-center gap-2 font-light">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"></span> {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Certifications Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl font-bold text-white mb-10 flex items-center gap-4">
                <span className="w-8 h-[2px] bg-blue-500"></span> Certifications
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Google Data Analytics", org: "Coursera", date: "Jun 2025", url: "https://coursera.org/verify/professional-cert/H8CCGE90DNQQ" },
                  { name: "TechXcelerate (4th place)", org: "BITS Pilani", date: "Mar 2025", url: "https://drive.google.com/file/d/1IZug3e8BFV8dz77DHbr0LB8suRGHhNM5/view?usp=drivesdk" },
                  { name: "Oracle Cloud Infrastructure", org: "Oracle", date: "May 2025", url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=44E5576D261C3D4DAAB5F5A776A61ACA63A140FB4E5573F90A087F3F523FBAAB" },
                  { name: "Salesforce AI Agent Developer", org: "Salesforce", date: "Oct 2025", url: "https://drive.google.com/file/d/1pzrdHe6Eset5rFXi2oJ4tSwQXLJoE-RB/view?usp=drivesdk" },
                  { name: "TCS ION Career Edge", org: "TCS", date: "May 2025", url: "https://drive.google.com/file/d/1yCvwu0AK5HIkm3xQyI056XsOnIaU7iDm/view?usp=drivesdk" },
                  { name: "Employability Skills", org: "Wadhwani", date: "Jun 2025", url: "https://web.certificate.wfglobal.org/en/certificate?certificateId=68406b91bff6ce8d047557b6" }
                ].map((cert, i) => (
                  <a key={i} href={cert.url} target={cert.url !== "#" ? "_blank" : "_self"} className={`${glassCard} p-5 hover:bg-white/10 transition-colors group cursor-pointer relative overflow-hidden block`}>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* External Link Icon */}
                    <div className="absolute top-3 right-3 text-cyan-500 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 -translate-x-2 group-hover:-translate-y-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>

                    <h4 className="text-slate-200 font-medium text-sm mb-3 group-hover:text-cyan-300 transition-colors pr-6">{cert.name}</h4>
                    <div className="flex justify-between items-end text-xs">
                      <span className="text-cyan-500">{cert.org}</span>
                      <span className="text-slate-500 font-mono">{cert.date}</span>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </section>

          {/* 6. FINAL TOUCH - CONTACT FOOTER */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            id="contact"
            className="relative z-10 bg-black/80 backdrop-blur-2xl border-t border-white/5 py-32 px-6 overflow-hidden"
          >
            <div className="max-w-4xl mx-auto text-center relative z-20">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", duration: 1.5 }}
              >
                <h2 className="text-5xl md:text-7xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tight">Let's Build Something</h2>
                <p className="text-xl text-slate-400 mb-16 font-light max-w-2xl mx-auto">
                  Ready to collaborate or just want to say hi? My inbox is always open. Let's create the next big thing together.
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-6 mb-24">
                <a href="mailto:shubhambesetty@gmail.com" className="group flex items-center gap-4 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 px-8 py-4 rounded-full transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 group-hover:animate-ping"></span>
                  <span className="text-slate-300 font-medium tracking-wide">shubhambesetty@gmail.com</span>
                </a>

                <a href="tel:+919381678185" className="group flex items-center gap-4 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 px-8 py-4 rounded-full transition-all duration-300">
                  <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping"></span>
                  <span className="text-slate-300 font-medium tracking-wide">+91-9381678185</span>
                </a>

                <a href="https://linkedin.com/in/shubham-besetty-17s" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 px-8 py-4 rounded-full transition-all duration-300">
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  <span className="text-slate-300 font-medium tracking-wide">LinkedIn</span>
                </a>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-slate-600 text-sm font-medium tracking-[0.2em] uppercase"
              >
                Thank you for visiting <br /><span className="mt-2 block opacity-50">© {new Date().getFullYear()} SHUBHAM BESETTY</span>
              </motion.div>
            </div>

            {/* Bottom glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-cyan-900/20 blur-[120px] rounded-t-full pointer-events-none"></div>
          </motion.footer>
        </motion.div>
      )}

    </main>
  );
}