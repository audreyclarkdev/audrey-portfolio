import { useState, useEffect, useRef } from "react";
import "./App.css";

const EMAIL = "audreyclarkdev@gmail.com";

// Set VITE_FORMSPREE_ID (e.g. in Vercel's environment variables) to deliver
// messages through Formspree. Without it, the form opens the visitor's email app.
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

// The Resume buttons only appear once src/assets/resume.pdf exists.
const RESUME_URL = Object.values(
  import.meta.glob("./assets/resume.pdf", {
    eager: true,
    query: "?url",
    import: "default",
  }),
)[0];

const NAV_LINKS = [
  "About",
  "Skills",
  "Experience",
  "Projects",
  "Education",
  "Contact",
];

const SKILLS = [
  "JavaScript",
  "React.js",
  "Next.js",
  "Node.js",
  "SQL",
  "MongoDB",
  "Express.js",
  "HTML & CSS",
  "Tailwind CSS",
  "Bootstrap",
  "jQuery",
  "WordPress",
  "Git & GitHub",
  "Manual QA Testing",
  "Test Planning",
  "Agile / Scrum",
];

const EXPERIENCE = [
  {
    role: "Software Engineer (Freelance)",
    company: "Blinkk.io LLC",
    period: "Nov 2024 - Present",
    color: "#534AB7",
    dot: "#AFA9EC",
    bullets: [
      "Designed and developed a multi-page WordPress book review blog (romanceloverblog.com) for a paid client",
      "Implemented marketing strategy and brand identity for e-commerce stores",
    ],
  },
  {
    role: "Project Manager & Support Specialist",
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
    url: "https://www.markful.com/",
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
    url: "https://fearlessinfluence.com/",
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
  {
    school: "Austin Community College",
    degree: "Software Developer Bootcamp",
    field: "Computer Software Engineering",
    period: "Feb 2026 - Sep 2026",
    color: "#534AB7",
  },
  {
    school: "Parsity",
    degree: "Software Engineering",
    field: "Computer Software Engineering",
    period: "Jan 2024 - Jan 2025",
    color: "#D85A30",
  },
  {
    school: "Zero To Mastery Academy",
    degree: "Software Development",
    field: "Web Development",
    period: "Sep 2022 - Jun 2024",
    color: "#1D9E75",
  },
  {
    school: "Bethel School of Technology",
    degree: "Full Stack Certificate",
    field: "Java, SpringBoot, React, JavaScript",
    period: "Jan 2021 - Sep 2021",
    color: "#185FA5",
  },
  {
    school: "William Jessup University",
    degree: "Bachelor of Arts",
    field: "Intercultural Studies",
    period: "Jan 2012 - Dec 2014",
    color: "#3C3489",
  },
];

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // index.html sets the starting theme before the page draws, to avoid a flash
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "light" ? "#f7f6fb" : "#0d0e14");
    try {
      localStorage.setItem("theme", theme);
    } catch {
      // Storage can be blocked (e.g. private browsing); the toggle still works
    }
  }, [theme]);
  const [formStatus, setFormStatus] = useState("idle");
  const sectionRefs = useRef({});
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

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
    if (!el) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    // Move keyboard and screen reader focus to the section too
    el.focus({ preventScroll: true });
    setMenuOpen(false);
  };

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    // Move keyboard and screen reader focus to the first section too
    sectionRefs.current.About?.focus({ preventScroll: true });
    setMenuOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    if (!FORMSPREE_ID) {
      const subject = `Portfolio message from ${data.get("name")}`;
      const body = `${data.get("message")}\n\nFrom: ${data.get("name")} (${data.get("email")})`;
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      return;
    }

    setFormStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(res.statusText);
      form.reset();
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  const navLinkButtons = NAV_LINKS.map((l) => (
    <button
      key={l}
      className={`nav-link${activeSection === l ? " active" : ""}`}
      aria-current={activeSection === l ? "true" : undefined}
      onClick={() => scrollTo(l)}>
      {l}
    </button>
  ));

  return (
    <div className="portfolio">
      <a href="#main" className="skip-link">
        Skip to main content
      </a>

      {/* ── NAV ── */}
      <header className={`nav${scrolled || menuOpen ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <button
            className="logo-btn"
            aria-label="Audrey Clark, back to top"
            onClick={scrollToTop}>
            <img
              className="logo-mark"
              src="/ac-mark.svg"
              alt=""
              width="34"
              height="34"
            />
          </button>
          <nav className="desktop-nav" aria-label="Main">
            {navLinkButtons}
          </nav>
          <div className="nav-actions">
            <button
              type="button"
              role="switch"
              aria-checked={theme === "light"}
              aria-label="Light mode"
              className="theme-toggle"
              onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}>
              <span className="theme-toggle-icon" aria-hidden="true">
                ☾
              </span>
              <span className="theme-toggle-track" aria-hidden="true">
                <span className="theme-toggle-thumb" />
              </span>
              <span className="theme-toggle-icon" aria-hidden="true">
                ☀
              </span>
            </button>
            {RESUME_URL && (
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="outline-btn nav-resume-btn">
                Resume
              </a>
            )}
            <a href={`mailto:${EMAIL}`} className="grad-btn hire-btn">
              Hire me
            </a>
            <button
              ref={menuButtonRef}
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}>
              <span className="menu-icon" aria-hidden="true">
                {menuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-nav" className="mobile-nav" aria-label="Main">
            {navLinkButtons}
            {RESUME_URL && (
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="nav-link">
                Resume
              </a>
            )}
          </nav>
        )}
      </header>

      <main id="main" tabIndex={-1}>
        {/* ── HERO ── */}
        <section
          id="about"
          tabIndex={-1}
          aria-label="About"
          ref={(el) => {
            sectionRefs.current["About"] = el;
          }}
          className="hero">
          <p className="section-eyebrow" style={{ "--c": "#534AB7" }}>
            Software Developer · QA Engineer · Builder
          </p>
          <h1 className="shimmer-text hero-name">Audrey Clark</h1>
          <p className="hero-sub">
            Former humanitarian, executive admin, and QA lead — now a full-stack
            developer powered by coffee, dog cuddles, and a genuine belief that
            technology should make people's lives better.
          </p>
          <p className="hero-body">
            I spent 7 years working alongside nonprofits around the world before
            trading passport stamps for pull requests. That journey gave me
            something most devs don't have: the communication skills, empathy, and
            systems-thinking to bridge the gap between people and products.
          </p>
          <div className="btn-row">
            <button className="grad-btn" onClick={() => scrollTo("Projects")}>
              See my work <span aria-hidden="true">↓</span>
            </button>
            <a href={`mailto:${EMAIL}`} className="outline-btn">
              Get in touch
            </a>
            {RESUME_URL && (
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noreferrer"
                className="outline-btn">
                Resume
              </a>
            )}
            <a
              href="https://github.com/audreyclarkdev"
              target="_blank"
              rel="noreferrer"
              className="outline-btn">
              GitHub
            </a>
          </div>
          <div className="stats-grid">
            {[
              {
                num: "94%",
                label: "reduction in post-release issues at Markful",
              },
              { num: "98%", label: "successful live releases managed" },
              { num: "30+", label: "GitHub repos & counting" },
              { num: "7yrs", label: "of global work before tech" },
            ].map((s) => (
              <div key={s.num} className="stat-card">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── SKILLS ── */}
        <section
          id="skills"
          tabIndex={-1}
          aria-labelledby="skills-title"
          ref={(el) => {
            sectionRefs.current["Skills"] = el;
          }}
          className="section">
          <p className="section-eyebrow" style={{ "--c": "#D85A30" }}>
            What I work with
          </p>
          <h2 id="skills-title" className="section-title">
            Skills & Technologies
          </h2>
          <div className="chips">
            {SKILLS.map((skill, i) => {
              // Spread the chips evenly around the color wheel, red to pink
              const hue = Math.round((i / SKILLS.length) * 330);
              return (
                <span
                  key={skill}
                  className="skill-chip"
                  style={{
                    background: `hsl(${hue} 85% 90%)`,
                    color: `hsl(${hue} 70% 24%)`,
                  }}>
                  {skill}
                </span>
              );
            })}
          </div>
        </section>

        <div className="divider" />

        {/* ── EXPERIENCE ── */}
        <section
          id="experience"
          tabIndex={-1}
          aria-labelledby="experience-title"
          ref={(el) => {
            sectionRefs.current["Experience"] = el;
          }}
          className="section">
          <p className="section-eyebrow" style={{ "--c": "#534AB7" }}>
            Where I've been
          </p>
          <h2 id="experience-title" className="section-title">
            Work Experience
          </h2>
          <div className="exp-list">
            {EXPERIENCE.map((exp) => (
              <div key={exp.role + exp.company} className="card">
                <div className="exp-inner">
                  <div
                    className="exp-dot"
                    style={{ background: exp.dot }}
                    aria-hidden="true"
                  />
                  <div className="exp-content">
                    <div className="exp-header">
                      <div>
                        <span className="exp-role">{exp.role}</span>
                        <span
                          className="exp-company"
                          style={{ "--c": exp.color }}>
                          {exp.url ? (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "inherit" }}>
                              {exp.company}
                            </a>
                          ) : (
                            exp.company
                          )}
                        </span>
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
        <section
          id="projects"
          tabIndex={-1}
          aria-labelledby="projects-title"
          ref={(el) => {
            sectionRefs.current["Projects"] = el;
          }}
          className="section">
          <p className="section-eyebrow" style={{ "--c": "#1D9E75" }}>
            What I've built
          </p>
          <h2 id="projects-title" className="section-title">
            Projects
          </h2>
          <div className="proj-grid">
            {PROJECTS.map((p) => (
              <a
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="proj-card"
                style={{ "--card-accent": p.accent }}>
                <div className="proj-header">
                  <span className="proj-name">{p.name}</span>
                  <span className="proj-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <p className="proj-desc">{p.desc}</p>
                <div className="proj-tags">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-tag">
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
          <div className="proj-footer">
            <a
              href="https://github.com/audreyclarkdev"
              target="_blank"
              rel="noreferrer"
              className="outline-btn">
              View all my repos on GitHub <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>

        <div className="divider" />

        {/* ── EDUCATION ── */}
        <section
          id="education"
          tabIndex={-1}
          aria-labelledby="education-title"
          ref={(el) => {
            sectionRefs.current["Education"] = el;
          }}
          className="section">
          <p className="section-eyebrow" style={{ "--c": "#D85A30" }}>
            Always learning
          </p>
          <h2 id="education-title" className="section-title">
            Education
          </h2>
          <div className="edu-grid">
            {EDUCATION.map((e) => (
              <div
                key={e.school}
                className="edu-card"
                style={{ borderLeft: `3px solid ${e.color}` }}>
                <div className="edu-school">{e.school}</div>
                <div className="edu-degree" style={{ "--c": e.color }}>
                  {e.degree}
                </div>
                <div className="edu-field">{e.field}</div>
                <div className="edu-period">{e.period}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* ── CONTACT ── */}
        <section
          id="contact"
          tabIndex={-1}
          aria-labelledby="contact-title"
          ref={(el) => {
            sectionRefs.current["Contact"] = el;
          }}
          className="contact-section">
          <p className="section-eyebrow" style={{ "--c": "#1D9E75" }}>
            Let's build something
          </p>
          <h2 id="contact-title" className="section-title">
            Get in Touch
          </h2>
          <p className="contact-body">
            I'm actively looking for frontend or fullstack developer roles —
            especially at companies building things that matter. Say hi, send a
            meme, or just tell me about your team.
          </p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="contact-name" className="sr-only">
              Your name
            </label>
            <input
              id="contact-name"
              name="name"
              className="contact-input"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              required
            />
            <label htmlFor="contact-email" className="sr-only">
              Your email
            </label>
            <input
              id="contact-email"
              name="email"
              className="contact-input"
              type="email"
              autoComplete="email"
              placeholder="your@email.com"
              required
            />
            <label htmlFor="contact-message" className="sr-only">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              className="contact-input"
              rows={5}
              placeholder="What's on your mind?"
              required
            />
            <button
              type="submit"
              className="grad-btn send-btn"
              disabled={formStatus === "sending"}>
              {formStatus === "sending" ? "Sending…" : "Send message"}
            </button>
            <p className="form-status" role="status">
              {formStatus === "sent" &&
                "Thanks! Your message was sent — I'll get back to you soon."}
              {formStatus === "error" && (
                <>
                  Sorry, something went wrong. Please email me directly at{" "}
                  <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
                </>
              )}
            </p>
          </form>
          <div className="social-links">
            {[
              { label: "GitHub", url: "https://github.com/audreyclarkdev" },
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/audrey-clark-dev",
              },
              { label: "Email", url: `mailto:${EMAIL}`, hoverLabel: EMAIL },
            ].map((l) =>
              l.hoverLabel ? (
                // Shows the address on hover or keyboard focus, so visitors
                // without an email app can still copy it
                <a
                  key={l.label}
                  href={l.url}
                  aria-label={`${l.label}: ${l.hoverLabel}`}
                  className="social-link">
                  <span className="social-label" aria-hidden="true">
                    {l.label}
                  </span>
                  <span className="social-hover-label" aria-hidden="true">
                    {l.hoverLabel}
                  </span>
                </a>
              ) : (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="social-link">
                  {l.label}
                </a>
              ),
            )}
          </div>
          {/* Phones and tablets can't hover, so show the address there */}
          <p className="contact-email">{EMAIL}</p>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>Built with React · Audrey Clark © 2026</span>
      </footer>
    </div>
  );
}
