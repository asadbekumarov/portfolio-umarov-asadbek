<script setup lang="ts">
const { t } = useI18n()
import { MapPin, Briefcase, Clock, Code2, Linkedin, Github, ExternalLink, CheckCircle2 } from 'lucide-vue-next'

const techBadges = [
  { name: 'React.js',     color: '#61dafb' },
  { name: 'Next.js',      color: '#ffffff' },
  { name: 'TypeScript',   color: '#3178c6' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'RTK Query',    color: '#a78bfa' },
]

const bentoStats = [
  { value: '1+',   labelUz: 'Yillik amaliy tajriba',        suffix: '' },
  { value: '5K+',  labelUz: 'Telegram WebApp tranzaksiyasi', suffix: '' },
  { value: '100%', labelUz: 'Clean code & responsiv arxitektura', suffix: '' },
]

const quickInfoItems = [
  { icon: 'location',     labelUz: 'Joylashuv',    valueUz: "Toshkent, O'zbekiston" },
  { icon: 'status',       labelUz: 'Holat',         valueUz: 'Ishga tayyor' },
  { icon: 'availability', labelUz: 'Ish formati',   valueUz: 'Masofaviy va Ofis' },
  { icon: 'focus',        labelUz: "Yo'nalish",     valueUz: 'Frontend & Mobile' },
]
</script>

<template>
  <section
    id="about"
    class="section-padding relative"
    aria-labelledby="about-heading"
  >
    <div class="section-container">

      <!-- ═══════════════════════════════════════
           12-col grid layout
           ═══════════════════════════════════════ -->
      <div class="about-grid">

        <!-- ── LEFT: bio text + quick info (col-span-7) ── -->
        <div class="about-left">

          <!-- Section label & heading -->
          <div class="mb-8 scroll-animate">
            <span class="section-label mb-3">{{ t('about.label') }}</span>
            <h2 id="about-heading" class="section-title mt-2">
              {{ t('about.title') }}
              <span class="gradient-text"> {{ t('about.title_accent') }}</span>
            </h2>
          </div>

          <!-- Bio text -->
          <div class="space-y-4 text-[0.9375rem] leading-relaxed text-slate-400 scroll-animate delay-100">
            <p>
              Dasturlashga bo'lgan ishtiyoqim real muammolarni hal qiluvchi, tezkor va qulay
              interfeyslar yaratishga qaratilgan. <strong class="text-slate-200 font-semibold">React.js, Next.js</strong>
              va <strong class="text-slate-200 font-semibold">TypeScript</strong> yordamida ishlab chiqarishga
              tayyor ilovalar quraman — qoralama bosqichidan production joylashuvigacha.
            </p>
            <p>
              Haqiqiy foydalanuvchilarga xizmat qiluvchi
              <strong class="text-slate-200 font-semibold">e-commerce platforma</strong> va
              <strong class="text-slate-200 font-semibold">5 000+ buyurtmani</strong> qayta ishlagan
              multi-xizmat Telegram WebApp ilovasini yaratdim. Asosiy e'tiborimni toza arxitektura,
              moslashuvchan dizayn va real ishlash unumdorligiga qarataman.
            </p>
          </div>

          <!-- Tech badges -->
          <div class="flex flex-wrap gap-2 mt-6 scroll-animate delay-150">
            <span
              v-for="badge in techBadges"
              :key="badge.name"
              class="tech-badge-inline"
              :style="{ '--dot': badge.color }"
            >
              <span class="tech-dot" aria-hidden="true" />
              {{ badge.name }}
            </span>
          </div>

          <!-- Quick info -->
          <div class="bento-card mt-6 scroll-animate delay-200">
            <p class="bento-card-title">Qisqacha ma'lumot</p>
            <ul class="space-y-3 mt-4">
              <li
                v-for="item in quickInfoItems"
                :key="item.icon"
                class="quick-info-row"
              >
                <MapPin        v-if="item.icon === 'location'"     class="qi-icon" :stroke-width="1.75" aria-hidden="true" />
                <Briefcase     v-else-if="item.icon === 'status'"       class="qi-icon" :stroke-width="1.75" aria-hidden="true" />
                <Clock         v-else-if="item.icon === 'availability'" class="qi-icon" :stroke-width="1.75" aria-hidden="true" />
                <Code2         v-else-if="item.icon === 'focus'"        class="qi-icon" :stroke-width="1.75" aria-hidden="true" />
                <span class="qi-label">{{ item.labelUz }}</span>
                <span class="qi-value">{{ item.valueUz }}</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- ── RIGHT: photo + stats + social (col-span-5) ── -->
        <div class="about-right">

          <!-- Photo -->
          <div class="bento-photo scroll-animate delay-100">
            <img
              src="/user.jpg"
              alt="Asadbek Umarov"
              class="w-full h-full object-cover object-center"
              loading="lazy"
              width="400"
              height="500"
            />
          </div>

          <!-- Stats row -->
          <div class="stats-row scroll-animate delay-200">
            <div
              v-for="stat in bentoStats"
              :key="stat.value"
              class="bento-card bento-stat"
            >
              <p class="stat-value">{{ stat.value }}</p>
              <p class="stat-label">{{ stat.labelUz }}</p>
            </div>
          </div>

          <!-- Social -->
          <div class="bento-card scroll-animate delay-300">
            <p class="bento-card-title">Ijtimoiy tarmoqlar</p>
            <div class="flex flex-col gap-3 mt-4">
              <a
                href="https://www.linkedin.com/in/asadbek-umarov-ab9385376"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn group"
                aria-label="LinkedIn profilini ko'rish"
              >
                <span class="social-icon-wrap social-li">
                  <Linkedin class="w-4 h-4" :stroke-width="2" aria-hidden="true" />
                </span>
                <span class="flex-1 min-w-0">
                  <span class="social-name">LinkedIn</span>
                  <span class="social-sub">asadbek-umarov</span>
                </span>
                <ExternalLink class="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" :stroke-width="2" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/asadbekumarov"
                target="_blank"
                rel="noopener noreferrer"
                class="social-btn group"
                aria-label="GitHub profilini ko'rish"
              >
                <span class="social-icon-wrap social-gh">
                  <Github class="w-4 h-4" :stroke-width="2" aria-hidden="true" />
                </span>
                <span class="flex-1 min-w-0">
                  <span class="social-name">GitHub</span>
                  <span class="social-sub">asadbekumarov</span>
                </span>
                <ExternalLink class="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" :stroke-width="2" aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ─── 12-col grid ────────────────────────────── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: start;
}
@media (min-width: 1024px) {
  .about-grid {
    grid-template-columns: 7fr 5fr;
    gap: 2.5rem;
  }
}

.about-left  { display: flex; flex-direction: column; }
.about-right { display: flex; flex-direction: column; gap: 0.875rem; }

/* ─── Base card ──────────────────────────────── */
.bento-card {
  background: rgba(3, 15, 29, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 1.125rem;
  padding: 1.5rem;
  transition: border-color 0.2s ease;
}
.bento-card:hover {
  border-color: rgba(255, 255, 255, 0.13);
}

/* Photo — no padding, full width, aspect ratio */
.bento-photo {
  width: 100%;
  overflow: hidden;
  border-radius: 1.125rem;
  border: 1px solid rgba(255, 255, 255, 0.07);
  aspect-ratio: 4 / 3;
}
@media (min-width: 1024px) {
  .bento-photo { aspect-ratio: 4 / 5; }
}

/* Stats row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.875rem;
}

/* ─── Stat card ──────────────────────────────── */
.bento-stat {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.25rem;
}
.stat-value {
  font-family: "Space Grotesk", "Inter", system-ui, sans-serif;
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 800;
  color: #0145F2;
  line-height: 1;
  letter-spacing: -0.02em;
}
.stat-label {
  font-size: 0.8rem;
  color: #4a6a96;
  line-height: 1.4;
  max-width: 16ch;
}

/* ─── Tech badge inline ──────────────────────── */
.tech-badge-inline {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.65rem;
  border-radius: 0.5rem;
  font-size: 0.8rem;
  font-weight: 500;
  color: #94a8c4;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition: border-color 0.2s, background 0.2s;
}
.tech-badge-inline:hover {
  border-color: rgba(1, 69, 242, 0.3);
  background: rgba(1, 69, 242, 0.06);
}
.tech-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dot);
  flex-shrink: 0;
}

/* ─── Card title ─────────────────────────────── */
.bento-card-title {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #3d5a7a;
}

/* ─── Quick info ─────────────────────────────── */
.quick-info-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.qi-icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  color: #0145F2;
  opacity: 0.7;
}
.qi-label {
  font-size: 0.8rem;
  color: #4a6a96;
  white-space: nowrap;
  flex-shrink: 0;
}
.qi-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: #c5d4ef;
  margin-left: auto;
  text-align: right;
}

/* ─── Social buttons ─────────────────────────── */
.social-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.2s, background 0.2s;
}
.social-btn:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
}
.social-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 0.5rem;
  flex-shrink: 0;
}
.social-li {
  background: rgba(1, 69, 242, 0.12);
  color: #82aaff;
}
.social-gh {
  background: rgba(255, 255, 255, 0.06);
  color: #c5d4ef;
}
.social-name {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #c5d4ef;
}
.social-sub {
  display: block;
  font-size: 0.73rem;
  color: #4a6a96;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
