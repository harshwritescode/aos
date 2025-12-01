import React, { useState, useEffect } from "react";

// Animation definitions
const animations = {
  "Fade animations": [
    "fade",
    "fade-up",
    "fade-down",
    "fade-left",
    "fade-right",
    "fade-up-right",
    "fade-up-left",
    "fade-down-right",
    "fade-down-left",
  ],
  "Flip animations": ["flip-up", "flip-down", "flip-left", "flip-right"],
  "Slide animations": ["slide-up", "slide-down", "slide-left", "slide-right"],
  "Zoom animations": [
    "zoom-in",
    "zoom-in-up",
    "zoom-in-down",
    "zoom-in-left",
    "zoom-in-right",
    "zoom-out",
    "zoom-out-up",
    "zoom-out-down",
    "zoom-out-left",
    "zoom-out-right",
  ],
};

// HeaderMenu Component
function HeaderMenu({ setSelectedAnimation }) {
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <header
      style={{
        position: "relative",
        zIndex: 100,
        padding: "1rem 2rem",
        background: "rgba(0,0,0,0.7)",
        color: "white",
        backdropFilter: "blur(10px)",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem", fontWeight: "bold" }}>
        Animation Showcase
      </h1>

      <nav style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {Object.keys(animations).map((category) => (
          <div
            key={category}
            className="dropdown"
            style={{ position: "relative" }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenu(openMenu === category ? null : category);
              }}
              style={{
                background: openMenu === category ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "0.6rem 1.2rem",
                cursor: "pointer",
                borderRadius: "8px",
                whiteSpace: "nowrap",
                color: "white",
                fontWeight: "600",
                fontSize: "0.95rem",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                if (openMenu !== category) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                if (openMenu !== category) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                }
              }}
            >
              {category}
            </button>

            {openMenu === category && (
              <ul
                style={{
                  position: "absolute",
                  top: "3rem",
                  left: 0,
                  background: "rgba(0,0,0,0.95)",
                  listStyle: "none",
                  padding: "0.5rem 0",
                  margin: 0,
                  borderRadius: "8px",
                  minWidth: "220px",
                  maxHeight: "350px",
                  overflowY: "auto",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  zIndex: 9999,
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {animations[category].map((anim) => (
                  <li
                    key={anim}
                    style={{
                      padding: "0.7rem 1.2rem",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "all 0.2s",
                      whiteSpace: "nowrap",
                      fontSize: "0.9rem",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(100,150,255,0.3)";
                      e.currentTarget.style.paddingLeft = "1.5rem";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.paddingLeft = "1.2rem";
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedAnimation(anim);
                      setOpenMenu(null);
                    }}
                  >
                    {anim}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </header>
  );
}

// ParticlesBackground Component
function ParticlesBackground() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(255,255,255,0.6)",
            borderRadius: "50%",
            animation: `float ${p.duration}s infinite ease-in-out ${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-40px) translateX(-10px); }
          75% { transform: translateY(-20px) translateX(5px); }
        }
      `}</style>
    </div>
  );
}

// Main App Component
export default function App() {
  const [selectedAnimation, setSelectedAnimation] = useState("");
  const [animationKey, setAnimationKey] = useState(0);

  // Reset animation when selection changes
  useEffect(() => {
    if (selectedAnimation) {
      setAnimationKey((prev) => prev + 1);
    }
  }, [selectedAnimation]);

  return (
    <>
      <style>{`
        /* Fade Animations */
        @keyframes fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-left {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-right {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-up-right {
          from { opacity: 0; transform: translate(-50px, 50px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes fade-up-left {
          from { opacity: 0; transform: translate(50px, 50px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes fade-down-right {
          from { opacity: 0; transform: translate(-50px, -50px); }
          to { opacity: 1; transform: translate(0, 0); }
        }
        @keyframes fade-down-left {
          from { opacity: 0; transform: translate(50px, -50px); }
          to { opacity: 1; transform: translate(0, 0); }
        }

        /* Flip Animations */
        @keyframes flip-up {
          from { opacity: 0; transform: perspective(2500px) rotateX(-100deg); }
          to { opacity: 1; transform: perspective(2500px) rotateX(0); }
        }
        @keyframes flip-down {
          from { opacity: 0; transform: perspective(2500px) rotateX(100deg); }
          to { opacity: 1; transform: perspective(2500px) rotateX(0); }
        }
        @keyframes flip-left {
          from { opacity: 0; transform: perspective(2500px) rotateY(-100deg); }
          to { opacity: 1; transform: perspective(2500px) rotateY(0); }
        }
        @keyframes flip-right {
          from { opacity: 0; transform: perspective(2500px) rotateY(100deg); }
          to { opacity: 1; transform: perspective(2500px) rotateY(0); }
        }

        /* Slide Animations */
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-down {
          from { transform: translateY(-100%); }
          to { transform: translateY(0); }
        }
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-right {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }

        /* Zoom Animations */
        @keyframes zoom-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes zoom-in-up {
          from { opacity: 0; transform: scale(0.5) translateY(50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes zoom-in-down {
          from { opacity: 0; transform: scale(0.5) translateY(-50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes zoom-in-left {
          from { opacity: 0; transform: scale(0.5) translateX(50px); }
          to { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes zoom-in-right {
          from { opacity: 0; transform: scale(0.5) translateX(-50px); }
          to { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes zoom-out {
          from { opacity: 0; transform: scale(1.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes zoom-out-up {
          from { opacity: 0; transform: scale(1.5) translateY(50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes zoom-out-down {
          from { opacity: 0; transform: scale(1.5) translateY(-50px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes zoom-out-left {
          from { opacity: 0; transform: scale(1.5) translateX(50px); }
          to { opacity: 1; transform: scale(1) translateX(0); }
        }
        @keyframes zoom-out-right {
          from { opacity: 0; transform: scale(1.5) translateX(-50px); }
          to { opacity: 1; transform: scale(1) translateX(0); }
        }

        /* Apply animations */
        .animated {
          animation-duration: 1s;
          animation-fill-mode: both;
        }
        ${Object.values(animations).flat().map(anim => `
          .${anim} {
            animation: ${anim} 1s ease-out;
          }
        `).join('\n')}
      `}</style>

      <div style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
        <ParticlesBackground />
        <HeaderMenu setSelectedAnimation={setSelectedAnimation} />

        <div
          style={{
            position: "relative",
            zIndex: 10,
            margin: "2rem auto",
            border: "3px solid rgba(255,255,255,0.3)",
            borderRadius: "16px",
            color: "white",
            textAlign: "center",
            width: "80%",
            maxWidth: "800px",
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            background: "rgba(0,0,0,0.3)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            padding: "2rem",
          }}
          key={animationKey}
          className={selectedAnimation}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>✨</div>
          <div style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            {selectedAnimation ? selectedAnimation : "Select an animation"}
          </div>
          <div style={{ fontSize: "1rem", opacity: 0.8, marginTop: "1rem" }}>
            {selectedAnimation ? "Animation applied successfully!" : "Choose from the menu above"}
          </div>
        </div>
      </div>
    </>
  );
}