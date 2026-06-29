import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

const SKILLS = [
  { label: "JavaScript", color: "#EEEDFE", text: "#3C3489" },
  { label: "React.js", color: "#E1F5EE", text: "#085041" },
  { label: "Next.js", color: "#1e2030", text: "#AFA9EC" },
  { label: "Node.js", color: "#E1F5EE", text: "#0F6E56" },
  { label: "HTML & CSS", color: "#FAECE7", text: "#712B13" },
  { label: "Tailwind CSS", color: "#E6F1FB", text: "#0C447C" },
  { label: "Bootstrap", color: "#EEEDFE", text: "#534AB7" },
  { label: "jQuery", color: "#FAECE7", text: "#993C1D" },
  { label: "WordPress", color: "#E6F1FB", text: "#185FA5" },
  { label: "Git & GitHub", color: "#1e2030", text: "#AFA9EC" },
  { label: "Manual QA Testing", color: "#FAECE7", text: "#712B13" },
  { label: "Test Planning", color: "#E1F5EE", text: "#085041" },
  { label: "Agile / Scrum", color: "#EEEDFE", text: "#3C3489" },
];

const EXPERIENCE = [
  {
    role: "Eco Cleaning Specialist",
    company: "Purple Fig Eco Cleaning Co.",
    period: "May 2026 - Present",
    color: "#1D9E75",
    dot: "#9FE1CB",
    bullets: [
      "Deliver residential eco-cleaning services using non-toxic, environmentally responsible products",
      "Execute thorough cleaning checklists across Signature, Essential, and Refresh service tiers with consistent attention to detail",
      "Manage time independently across client homes and represent Purple Fig's brand values of warmth and care",
    ],
  },
  {
    role: "Web Developer (Freelance)",
    company: "Self-Employed",
    period: "Nov 2024 - Present",
    color: "#534AB7",
    dot: "#AFA9EC",
    bullets: [
      "Designed and developed a multi-page WordPress book review blog (romanceloverblog.com) for a paid client",
      "Implemented marketing strategy and brand identity for e-commerce stores",
    ],
  },
  {
    role: "Project Manager & Web Developer",
    company: "Blinkk.io LLC",
    period: "Feb 2025 - Dec 2025",
    color: "#D85A30",
    dot: "#F0997B",
    bullets: [
      "Developed a company landing website using HTML, CSS, JavaScript and UI/UX best practices",
      "Led weekly strategic planning meetings and organized tasks in Asana",
      "Spearheaded social media and email marketing, driving a 30% rise in engagement",
    ],
  },
  {
    role: "Software QA Engineer Lead",
    company: "Markful",
    period: "Dec 2022 - Jun 2024",
    color: "#534AB7",
    dot: "#CFC9FF",
    bullets: [
      "Developed comprehensive test plans and strategies, achieving a 94% reduction in post-release issues",
      "Spearheaded QA team training and new testing systems, increasing efficiency by 95%",
      "Managed collaboration with DevOps to achieve 98% successful live releases",
      "Mentored junior QA engineers on best practices and testing methodologies",
    ],
  },
  {
    role: "Web Designer & Social Media Manager",
    company: "Fearless Influence",
    period: "Feb 2022 - Sep 2022",
    color: "#1D9E75",
    dot: "#5DCAA5",
    bullets: [
      "Built dynamic WordPress/Elementor sites for 4 organizations, driving 300% traffic growth",
      "Managed social media for 3-4 clients, increasing engagement by an average of 120%",
    ],
  },
  {
    role: "Office Manager, EA & Bookkeeper",
    company: "All Points Welding",
    period: "Sep 2014 - Sep 2017",
    color: "#D85A30",
    dot: "#F5C4B3",
    bullets: [
      "Designed and implemented a new software administration system, increasing efficiency 200%",
      "Automated invoice and payroll processing, saving the company 100+ hours per month",
      "Built and launched a multi-page website, growing inbound leads from 0 to 15/week",
    ],
  },
];

const PROJECTS = [
  {
    name: "To-Do List + Local Storage",
    desc: "A third iteration of a to-do list app with full CRUD — add, edit, update, and delete tasks — with persistence via localStorage.",
    tech: ["JavaScript", "CSS", "localStorage"],
    link: "https://github.com/audreyclarkdev/To-Do-List-and-local-storage",
    accent: "#534AB7",
  },
  {
    name: "Quote Generator 9000",
    desc: "A random quote generator app built with vanilla JavaScript and CSS — clean UI, instant inspiration on demand.",
    tech: ["JavaScript", "CSS"],
    link: "https://github.com/audreyclarkdev/quote-generator-9000",
    accent: "#D85A30",
  },
  {
    name: "Contact List - Next.js",
    desc: "A contact list evaluation project built in Next.js, practicing component architecture, routing, and state management.",
    tech: ["Next.js", "JavaScript", "React"],
    link: "https://github.com/audreyclarkdev/contact-list-nextjs",
    accent: "#1D9E75",
  },
  {
    name: "Weather Project Eval",
    desc: "A weather app evaluation pulling live data from a weather API — practicing async JavaScript and DOM manipulation.",
    tech: ["JavaScript", "API", "CSS"],
    link: "https://github.com/audreyclarkdev/weather-project-eval",
    accent: "#534AB7",
  },
  {
    name: "FEQ Dictionary App",
    desc: "Open-source contribution to the Front End Queens community — a dictionary web app built collaboratively.",
    tech: ["CSS", "JavaScript", "Open Source"],
    link: "https://github.com/audreyclarkdev/feq_dictionary_app",
    accent: "#D85A30",
  },
  {
    name: "Robofriends",
    desc: "A React app that renders a searchable, filterable grid of robot avatars — a classic learning project demonstrating React fundamentals.",
    tech: ["React", "JavaScript", "CSS"],
    link: "https://github.com/audreyclarkdev/robofriends",
    accent: "#1D9E75",
  },
];

const EDUCATION = [
  { school: "Austin Community College", degree: "Software Developer Bootcamp", field: "Computer Software Engineering", period: "Feb 2026 - Sep 2026", color: "#534AB7" },
  { school: "Parsity", degree: "Software Engineering", field: "Computer Software Engineering", period: "Jan 2024 - Jan 2025", color: "#D85A30" },
  { school: "Zero To Mastery Academy", degree: "Software Development", field: "Web Development", period: "Sep 2022 - Jun 2024", color: "#1D9E75" },
  { school: "Bethel School of Technology", degree: "Full Stack Certificate", field: "Java, SpringBoot, React, JavaScript", period: "Jan 2021 - Sep 2021", color: "#185FA5" },
  { school: "William Jessup University", degree: "Bachelor of Arts", field: "Intercultural Studies", period: "Jan 2012 - Dec 2014", color: "#3C3489" },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const offsets = NAV_LINKS.map((id) => {
        const el = sectionRefs.current[id];
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      const closest = offsets.sort((a, b) => a.top - b.top)[0];
      if (closest) setActiveSection(closest.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = sectionRefs.current[id];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="portfolio">

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <button className="logo-btn" onClick={() => scrollTo("About")}>
            <span className="logo-ac">AC</span>
            <span className="logo-dev">.dev</span>
          </button>
          <div className="desktop-nav">
            {NAV_LINKS.map(l => (
              <button
                key={l}
                className={`nav-link${activeSection === l ? " active" : ""}`}
                onClick={() => scrollTo(l)}
              >
                {l}
              </button>
            ))}
          </div>
          <a href="mailto:amazon.audrey@gmail.com" className="grad-btn hire-btn">Hire me</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={(el) => { sectionRefs.current["About"] = el; }} className="hero">
        <p className="section-eyebrow" style={{ color: "#534AB7" }}>Software Developer · QA Engineer · Builder</p>
        <h1 className="shimmer-text hero-name">Audrey Clark</h1>
        <p className="hero-sub">
          Former humanitarian, executive admin, and QA lead — now a full-stack developer powered by coffee, dog cuddles, and a genuine belief that technology should make people's lives better.
        </p>
        <p className="hero-body">
          I spent 7 years working alongside nonprofits around the world before trading passport stamps for pull requests. That journey gave me something most devs don't have: the communication skills, empathy, and systems-thinking to bridge the gap between people and products.
        </p>
        <div className="btn-row">
          <button className="grad-btn" onClick={() => scrollTo("Projects")}>See my work ↓</button>
          <a href="mailto:audreyclark023@gmail.com" className="outline-btn">Get in touch</a>
          <a href="https://github.com/audreyclarkdev" target="_blank" rel="noreferrer" className="outline-btn">GitHub</a>
        </div>
        <div className="stats-grid">
          {[
            { num: "94%", label: "reduction in post-release issues at Markful" },
            { num: "98%", label: "successful live releases managed" },
            { num: "30+", label: "GitHub repos & counting" },
            { num: "7yrs", label: "of global work before tech" },
          ].map(s => (
            <div key={s.num} className="stat-card">
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── SKILLS ── */}
      <section ref={(el) => { sectionRefs.current["Skills"] = el; }} className="section">
        <p className="section-eyebrow" style={{ color: "#D85A30" }}>What I work with</p>
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="chips">
          {SKILLS.map(s => (
            <span key={s.label} className="skill-chip" style={{ background: s.color, color: s.text }}>
              {s.label}
            </span>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── EXPERIENCE ── */}
      <section ref={(el) => { sectionRefs.current["Experience"] = el; }} className="section">
        <p className="section-eyebrow" style={{ color: "#534AB7" }}>Where I've been</p>
        <h2 className="section-title">Work Experience</h2>
        <div className="exp-list">
          {EXPERIENCE.map((exp) => (
            <div key={exp.role + exp.company} className="card">
              <div className="exp-inner">
                <div className="exp-dot" style={{ background: exp.dot }} />
                <div className="exp-content">
                  <div className="exp-header">
                    <div>
                      <span className="exp-role">{exp.role}</span>
                      <span className="exp-company" style={{ color: exp.color }}>{exp.company}</span>
                    </div>
                    <span className="exp-period">{exp.period}</span>
                  </div>
                  <ul className="exp-bullets">
                    {exp.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── PROJECTS ── */}
      <section ref={(el) => { sectionRefs.current["Projects"] = el; }} className="section">
        <p className="section-eyebrow" style={{ color: "#1D9E75" }}>What I've built</p>
        <h2 className="section-title">Projects</h2>
        <div className="proj-grid">
          {PROJECTS.map((p) => (
            <a
              key={p.name}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="proj-card"
              onMouseEnter={e => e.currentTarget.style.borderColor = p.accent}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2030"}
            >
              <div className="proj-header">
                <span className="proj-name">{p.name}</span>
                <span className="proj-arrow">↗</span>
              </div>
              <p className="proj-desc">{p.desc}</p>
              <div className="proj-tags">
                {p.tech.map(t => (
                  <span key={t} className="tech-tag">{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
        <div className="proj-footer">
          <a href="https://github.com/audreyclarkdev" target="_blank" rel="noreferrer" className="outline-btn">
            View all 30 repos on GitHub ↗
          </a>
        </div>
      </section>

      <div className="divider" />

      {/* ── EDUCATION ── */}
      <section ref={(el) => { sectionRefs.current["Education"] = el; }} className="section">
        <p className="section-eyebrow" style={{ color: "#D85A30" }}>Always learning</p>
        <h2 className="section-title">Education</h2>
        <div className="edu-grid">
          {EDUCATION.map(e => (
            <div
              key={e.school}
              className="edu-card"
              style={{ borderLeft: `3px solid ${e.color}` }}
            >
              <div className="edu-school">{e.school}</div>
              <div className="edu-degree" style={{ color: e.color }}>{e.degree}</div>
              <div className="edu-field">{e.field}</div>
              <div className="edu-period">{e.period}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* ── CONTACT ── */}
      <section ref={(el) => { sectionRefs.current["Contact"] = el; }} className="contact-section">
        <p className="section-eyebrow" style={{ color: "#1D9E75" }}>Let's build something</p>
        <h2 className="section-title">Get in Touch</h2>
        <p className="contact-body">
          I'm actively looking for frontend or fullstack developer roles — especially at companies building things that matter. Say hi, send a meme, or just tell me about your team.
        </p>
        <div className="contact-form">
          <input className="contact-input" type="text" placeholder="Your name" />
          <input className="contact-input" type="email" placeholder="your@email.com" />
          <textarea className="contact-input" rows={5} placeholder="What's on your mind?" />
        </div>
        <button className="grad-btn send-btn">Send message</button>
        <div className="social-links">
          {[
            { label: "GitHub", url: "https://github.com/audreyclarkdev" },
            { label: "LinkedIn", url: "https://linkedin.com/in/audrey-clarkdev" },
            { label: "Email", url: "mailto:amazon.audrey@gmail.com" },
            { label: "Threads", url: "https://threads.net/amazonwarrior23" },
          ].map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer" className="social-link">
              {l.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>Built with React · Audrey Clark © 2026</span>
      </footer>

    </div>
  );
}
