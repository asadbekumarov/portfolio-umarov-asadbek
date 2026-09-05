<script setup lang="ts">
const { t } = useI18n()

const scrollToSection = (hash: string): void => {
  const el = document.querySelector(hash)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const techStack = [
  { name: 'React.js',      icon: 'react'      },
  { name: 'Next.js',       icon: 'nextjs'     },
  { name: 'TypeScript',    icon: 'typescript' },
  { name: 'Tailwind CSS',  icon: 'tailwind'   },
  { name: 'React Native',  icon: 'mobile'     },
]

</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center overflow-hidden hero-bg"
    aria-label="Introduction"
  >
    <div class="section-container relative z-10 w-full py-28 sm:py-32">
      <div class="hero-grid">

        <!-- ═══════════════════════════════
             LEFT — Text / CTA
             ═══════════════════════════════ -->
        <div class="hero-left">


          <!-- H1 -->
          <h1 class="hero-title">
            <span class="hero-name">{{ t('hero.name') }} {{ t('hero.surname') }}</span>
            <span class="hero-role">{{ t('hero.role') }}</span>
          </h1>

          <!-- Subtext -->
          <p class="hero-sub hero-tagline">
            {{ t('hero.tagline') }}
          </p>

          <!-- Tech badges with icons -->
          <ul class="tech-list hero-tech" aria-label="Tech stack">
            <li v-for="tech in techStack" :key="tech.name" class="tech-badge">
              <!-- React icon -->
              <svg v-if="tech.icon === 'react'" class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="2.25" fill="currentColor" stroke="none" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" transform="rotate(120 12 12)" />
              </svg>
              <!-- Next.js icon -->
              <svg v-else-if="tech.icon === 'nextjs'" class="tech-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                <path d="M8 16V8l8 8V8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <!-- TypeScript icon -->
              <svg v-else-if="tech.icon === 'typescript'" class="tech-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5" />
                <path d="M13 12h3.5M14.75 12v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M7 12h3v1.5a1.5 1.5 0 1 1-3 0V12Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <!-- Tailwind icon -->
              <svg v-else-if="tech.icon === 'tailwind'" class="tech-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 13c1-4 3.5-6 7-6s5 2.5 4 5c1-2.5 3.5-3.5 5-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M3 18c1-4 3.5-6 7-6s5 2.5 4 5c1-2.5 3.5-3.5 5-2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <!-- Mobile icon -->
              <svg v-else-if="tech.icon === 'mobile'" class="tech-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="7" y="2" width="10" height="20" rx="2" />
                <circle cx="12" cy="18" r="0.5" fill="currentColor" />
              </svg>
              {{ tech.name }}
            </li>
          </ul>

          <!-- CTA buttons — clear hierarchy -->
          <div class="cta-row hero-ctas">
            <a href="#projects" class="btn-primary" @click.prevent="scrollToSection('#projects')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              {{ t('hero.cta_view') }}
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              download="Asadbek_Umarov_Resume.pdf"
              class="btn-secondary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {{ t('footer.download_cv') }}
            </a>
          </div>
        </div>

        <!-- ═══════════════════════════════
             RIGHT — Terminal code block
             ═══════════════════════════════ -->
        <div class="hero-right hero-code-wrap">
          <div class="terminal-card">
            <!-- Window chrome -->
            <div class="terminal-bar">
              <span class="dot dot-red"   aria-hidden="true" />
              <span class="dot dot-amber" aria-hidden="true" />
              <span class="dot dot-green" aria-hidden="true" />
              <span class="terminal-file">profile.ts</span>
            </div>
            <!-- Code -->
            <pre class="terminal-body" aria-label="Code sample"><code><span class="c-comment">// profile.ts — TypeScript</span>

<span class="c-keyword">const</span> <span class="c-var">profile</span> <span class="c-op">=</span> <span class="c-brace">{</span>
  <span class="c-prop">name</span><span class="c-op">:</span> <span class="c-str">'Asadbek'</span><span class="c-op">,</span>
  <span class="c-prop">age</span><span class="c-op">:</span> <span class="c-num">19</span><span class="c-op">,</span>
  <span class="c-prop">phone</span><span class="c-op">:</span> <span class="c-str">'77 268 7865'</span><span class="c-op">,</span>
<span class="c-brace">}</span>

<span class="c-fn">console</span><span class="c-op">.</span><span class="c-method">log</span><span class="c-paren">(</span><span class="c-tpl">`Name: <span class="c-interp">${</span><span class="c-var">profile</span><span class="c-op">.</span><span class="c-prop">name</span><span class="c-interp">}</span>`</span><span class="c-paren">)</span>
<span class="c-fn">console</span><span class="c-op">.</span><span class="c-method">log</span><span class="c-paren">(</span><span class="c-tpl">`Age: <span class="c-interp">${</span><span class="c-var">profile</span><span class="c-op">.</span><span class="c-prop">age</span><span class="c-interp">}</span>`</span><span class="c-paren">)</span>
<span class="c-fn">console</span><span class="c-op">.</span><span class="c-method">log</span><span class="c-paren">(</span><span class="c-tpl">`Phone: <span class="c-interp">${</span><span class="c-var">profile</span><span class="c-op">.</span><span class="c-prop">phone</span><span class="c-interp">}</span>`</span><span class="c-paren">)</span></code></pre>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── Background ─── */
.hero-bg {
  background-color: #030f1d;
}

/* ─── Grid ─── */
.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;
}
@media (min-width: 1024px) {
  .hero-grid { grid-template-columns: 3fr 2fr; gap: 4rem; }
}

/* ─── Status badge ─── */
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #a3e6b5;
  background: rgba(34, 197, 94, 0.08);
  border: 1px solid rgba(34, 197, 94, 0.2);
  width: fit-content;
  margin-bottom: 1.5rem;
}
.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse-dot 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0   rgba(34, 197, 94, 0.45); }
  50%       { box-shadow: 0 0 0 5px rgba(34, 197, 94, 0);   }
}

/* ─── Typography ─── */
.hero-title {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 1.25rem;
}
.hero-name {
  font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  color: #f0f4ff;
  letter-spacing: -0.02em;
  line-height: 1;
}
.hero-role {
  font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
  font-size: clamp(1.125rem, 2.5vw, 1.5rem);
  font-weight: 500;
  color: #0145F2;
  letter-spacing: -0.01em;
  line-height: 1.3;
}
.hero-sub {
  font-size: clamp(0.9375rem, 1.6vw, 1.0625rem);
  line-height: 1.7;
  color: #7a8ea8;
  max-width: 54ch;
  margin-bottom: 1.75rem;
}

/* ─── Tech badges ─── */
.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}
.tech-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #94a8c4;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}
.tech-badge:hover {
  border-color: rgba(1, 69, 242, 0.35);
  color: #c5d4ef;
  background: rgba(1, 69, 242, 0.07);
}
.tech-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: #5580b8;
}

/* ─── CTA row ─── */
.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

/* ─── Terminal card ─── */
.terminal-card {
  border-radius: 0.875rem;
  background: #0a1628;
  border: 1px solid rgba(255, 255, 255, 0.07);
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(1, 69, 242, 0.06),
    0 24px 48px -12px rgba(0, 0, 0, 0.55);
}
.terminal-bar {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.65rem 1rem;
  background: #0d1c35;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
.dot-red   { background: #ff5f57; }
.dot-amber { background: #febc2e; }
.dot-green { background: #28c840; }
.terminal-file {
  margin-left: 0.5rem;
  font-size: 0.75rem;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  color: #4a6a96;
}
.terminal-body {
  margin: 0;
  padding: 1.25rem;
  font-family: "JetBrains Mono", "Fira Code", ui-monospace, monospace;
  font-size: 0.78rem;
  line-height: 1.75;
  color: #8aacce;
  white-space: pre;
  overflow-x: auto;
}
.terminal-body code { display: block; }
.terminal-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: #0d1c35;
}
.stat-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #4a6a96;
}

/* ─── Entrance animations ─── */
.hero-badge     { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both; }
.hero-title     { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.13s both; }
.hero-tagline   { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.21s both; }
.hero-tech      { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.27s both; }
.hero-ctas      { animation: fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.33s both; }
.hero-code-wrap { animation: fadeUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s both; }

/* ─── Syntax highlight tokens ─── */
.c-comment { color: #546e7a; font-style: italic; }   /* grey  — comment      */
.c-keyword  { color: #c792ea; }                       /* purple — const/let   */
.c-var      { color: #82aaff; }                       /* blue  — variable     */
.c-prop     { color: #80cbc4; }                       /* teal  — property key */
.c-str      { color: #c3e88d; }                       /* green — string       */
.c-num      { color: #f78c6c; }                       /* orange — number      */
.c-fn       { color: #82aaff; }                       /* blue  — console      */
.c-method   { color: #82aaff; }                       /* blue  — log          */
.c-tpl      { color: #c3e88d; }                       /* green — template lit */
.c-interp   { color: #89ddff; }                       /* cyan  — ${ }         */
.c-op       { color: #89ddff; }                       /* cyan  — = : .        */
.c-brace    { color: #ffcb6b; }                       /* amber — { }          */
.c-paren    { color: #89ddff; }                       /* cyan  — ( )          */
</style>
