import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

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
  "Express.js",
  "SQL",
  "MongoDB",
  "PostgreSQL",
  "HTML & CSS",
  "Tailwind CSS",
  "Bootstrap",
  "jQuery",
  "WordPress",
  "Git & GitHub",
  "Jest",
  "Manual QA Testing",
  "Test Planning",
  "Agile / Scrum",
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Blinkk.io LLC",
    period: "Nov 2024 - Present",
    color: "#534AB7",
    dot: "#AFA9EC",
    bullets: [
      "Built and shipped a responsive marketing site for Blinkk.io with HTML, CSS, and JavaScript, applying UI/UX and responsive web design practices",
      "Designed and developed a multi-page WordPress book review and e-commerce blog for a paid client, designed their full brand identity, and optimized for SEO (romanceloverblog.com)",
      "Replaced a legacy manual tracking system with Asana and led weekly strategic planning with the owner, improving task visibility across client work",
    ],
  },
  {
    role: "Software QA Engineer Lead",
    company: "Markful",
    url: "https://www.markful.com/",
    period: "Dec 2022 - Jun 2024",
    color: "#D85A30",
    dot: "#F0997B",
    bullets: [
      "Promoted to Lead within first 6 months",
      "Developed and owned the testing strategy for a customer-facing e-commerce platform, writing test plans, test cases, and scripts that caught defects before release, utilizing TestRail, BrowserStack, and spreadsheet to track testing efforts",
      "Partnered with the Senior Developer/DevOps lead on release validation, keeping live deployments stable with minimal production disruption",
      "Trained and mentored QA team members; built the testing systems and training materials the team worked from",
      "Translated requirements between technical and non-technical stakeholders to keep product delivery on track",
      "Executed manual test cases, tracked defects, and ran regression testing for internal and customer-facing web applications",
      "Led testing for new cart and checkout pages through to successful deployment and a significantly improved user checkout experience",
    ],
  },
  {
    role: "Web Designer",
    company: "Fearless Influence",
    url: "https://fearlessinfluence.com/",
    period: "Feb 2022 - Sep 2022",
    color: "#1D9E75",
    dot: "#5DCAA5",
    bullets: [
      "Built dynamic websites for 4 organizations using WordPress, Elementor, and Divi, replacing outdated sites with responsive, search-friendly builds",
      "Managed social media for 3-4 clients, growing cross-platform engagement and optimizing YouTube SEO",
    ],
  },
  {
    role: "Help Desk Technician 1",
    company: "William Jessup University",
    url: "https://jessup.edu/",
    period: "Jun 2020 - Dec 2020",
    color: "#534AB7",
    dot: "#534AB7",
    bullets: [
      "Provided IT support for 1,700 students and 150 staff, handling roughly 40 tickets per week",
      "Managed Active Directory user accounts; installed and configured workstations and maintained university WordPress landing pages",
    ],
  },
  {
    role: "Executive Assistant and Bookkeeper",
    company: "All Points Welding",
    period: "Sep 2014 - Sep 2017",
    color: "#D85A30",
    dot: "#F5C4B3",
    bullets: [
      "Replaced legacy manual systems with digital administration platform, cutting recurring data-entry work and reconciliation errors",
      "Automated invoice and payroll processing, eliminating hours of manual work each month",
      "Launched the company website and social media presence, generating the first digital inbound lead flow",
      "Managed QuickBooks records, bank reconciliations, payroll, tax prep collaboration, and office IT infrastructure",
    ],
  },
];

const PROJECTS = [
  {
    name: "DogDex",
    desc: "A mobile-first full-stack web appplication for dog lovers who want to discover, track, and learn about dog breeds they encounter in real life. Inspired by bird-watching and pokemon's pokedex.",
    tech: [
      "React",
      "React Router",
      "Node.js",
      "Express.js",
      "MongoDB",
      "RESTful API",
      "Cloudinary",
      "Clerk",
      "Netlify",
      "Vercel",
    ],
    repo: "https://github.com/audreyclarkdev/dogdex",
    live: "https://dogdex.live/",
    image: "project-assets/Signed-In-Home.png",
    imageAlt: "The home page of DogDex if the user is signed in",
    accent: "#534AB7",
  },
  {
    name: "Giphy Searcher App",
    desc: "A responsive React app that lets you browse trending GIFs and search for any topic using the Giphy API.",
    tech: ["React", "React Hooks", "CSS", "Netlify"],
    repo: "https://github.com/audreyclarkdev/Giphy-App/tree/main",
    live: "https://audrey-giphy-app.netlify.app/",
    image: "project-assets/trending-home-higher-quality.gif",
    imageAlt: "The home page shows the 20 current top trending GIFs upon load",
    accent: "#1B5FA8",
  },
  {
    name: "Dog Facts",
    desc: "An interactive website that shares random dog facts.",
    tech: ["JavaScript", "RESTful API", "GitHub Pages"],
    repo: "https://github.com/audreyclarkdev/dog-facts",
    live: "https://audreyclarkdev.github.io/dog-facts/",
    image: "project-assets/DogFactsAPI.png",
    imageAlt: "",
    accent: "#0B7377",
  },
  {
    name: "FEQ Dictionary App",
    desc: "An open-source group project with the Front End Queens community featuring word search plus font and light/dark theme switching. I built the light/dark mode toggle and handled deployment.",
    tech: ["CSS", "HTML", "JavaScript", "Open Source"],
    repo: "https://github.com/audreyclarkdev/feq_dictionary_app",
    live: "https://feq-dictionary.netlify.app/",
    image: "",
    imageAlt: "",
    accent: "#D85A30",
  },
  {
    name: "Contact List - Next.js",
    desc: "A contact list evaluation project built in Next.js, practicing component architecture, routing, and state management.",
    tech: ["Next.js", "JavaScript", "React"],
    repo: "https://github.com/audreyclarkdev/contact-list-nextjs",
    live: "",
    image: "",
    imageAlt: "",
    accent: "#1D9E75",
  },
];

const EDUCATION = [
  {
    school: "Austin Community College",
    degree: "Software Developer Bootcamp",
    field: "Computer Software Engineering",
    period: "Mar 2026 - Sep 2026",
    color: "#534AB7",
  },
  {
    school: "Bethel School of Technology",
    degree: "Full Stack Certificate",
    field: "Java, SpringBoot, React, JavaScript",
    period: "Jan 2021 - Sep 2021",
    color: "#1D9E75",
  },
  {
    school: "William Jessup University",
    degree: "Bachelor of Arts",
    field: "Intercultural Studies",
    honor: "Summa Cum Laude",
    period: "Jan 2012 - Dec 2014",
    color: "#185FA5",
  },
  {
    school: "Folsom Lake College",
    degree: "Associates of Arts",
    field: "Math and Science, with an emphasis in Computer Science",
    honor: "Highest Honors",
    period: "Aug 2009 - May 2011",
    color: "#4FD1D1",
  },
];

// The Education section shows two columns, each with its own small header
const EDUCATION_GROUPS = [
  { title: "Programming Bootcamps", items: EDUCATION.slice(0, 2) },
  { title: "Degrees", items: EDUCATION.slice(2) },
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
    <>
      <Analytics />
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
                onClick={() =>
                  setTheme((t) => (t === "light" ? "dark" : "light"))
                }>
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
              Former humanitarian, executive admin, and QA lead — now a
              full-stack developer powered by coffee, dog cuddles, and a genuine
              belief that technology should make people's lives better.
            </p>
            <p className="hero-body">
              I spent 7 years working alongside nonprofits around the world
              before trading passport stamps for pull requests. That journey
              gave me something most devs don't have: the communication skills,
              empathy, and systems-thinking to bridge the gap between people and
              products.
            </p>
            <p className="hero-body">
              Outside of code, I'm working on my strength and conditioning with
              my gym community, playing cozy games with a psychological thriller
              audiobook in my ears, or hanging out with my husband and our
              German Shepherd dawghter, Emma. 🐾
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
            <p className="section-eyebrow" style={{ "--c": "#2F80D8" }}>
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
            <p className="section-eyebrow" style={{ "--c": "#14A3A8" }}>
              What I've built
            </p>
            <h2 id="projects-title" className="section-title">
              Projects
            </h2>
            <div className="proj-grid">
              {PROJECTS.map((p, i) => (
                // Each row pairs a project card with its image; every other
                // row is flipped so the image sits on the left
                <div
                  key={p.name + i}
                  className={`proj-row${i % 2 === 1 ? " flipped" : ""}`}
                  style={{ "--card-accent": p.accent }}>
                  <article className="proj-card">
                    <h3 className="proj-name">{p.name}</h3>
                    <p className="proj-desc">{p.desc}</p>
                    <div className="proj-tags">
                      {p.tech.map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    {/* Each button only appears once its address is filled in */}
                    {(p.repo || p.live) && (
                      <div className="proj-links">
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${p.name}: GitHub repo`}
                            className="proj-btn proj-btn-repo">
                            GitHub repo <span aria-hidden="true">↗</span>
                          </a>
                        )}
                        {p.live && (
                          <a
                            href={p.live}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${p.name}: live site`}
                            className="proj-btn proj-btn-live">
                            Live site <span aria-hidden="true">↗</span>
                          </a>
                        )}
                      </div>
                    )}
                  </article>
                  {/* Shows a placeholder until the project's image is filled in */}
                  <div className="proj-media">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.imageAlt || `Screenshot of ${p.name}`}
                        loading="lazy"
                      />
                    ) : (
                      <span className="proj-media-empty" aria-hidden="true">
                        Preview coming soon
                      </span>
                    )}
                  </div>
                </div>
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
              {EDUCATION_GROUPS.map((group) => (
                <div key={group.title} className="edu-column">
                  <h3 className="edu-group-title">{group.title}</h3>
                  {group.items.map((e) => (
                    <div
                      key={e.school}
                      className="edu-card"
                      style={{ borderLeft: `3px solid ${e.color}` }}>
                      <div className="edu-school">{e.school}</div>
                      <div className="edu-degree" style={{ "--c": e.color }}>
                        {e.degree}
                      </div>
                      <div className="edu-field">{e.field}</div>
                      {e.honor && <div className="edu-honor">{e.honor}</div>}
                      <div className="edu-period">{e.period}</div>
                    </div>
                  ))}
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
              especially at companies building things that matter. Say hi, send
              a meme, or just tell me about your team.
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
    </>
  );
}
