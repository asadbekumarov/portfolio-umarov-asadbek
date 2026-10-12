# 🚀 Asadbek Umarov — Personal Portfolio

Zamonaviy, yuqori tezlikda ishlovchi va to'liq moslashuvchan shaxsiy portfolio veb-sayti. Loyiha **Nuxt 3**, **Vue 3**, **TypeScript** va **Tailwind CSS** yordamida ishlab chiqilgan.

[![Live Website](https://img.shields.io/badge/Live%20Demo-portfolio--umarov--asadbek.vercel.app-blue?style=for-the-badge&logo=vercel)](https://portfolio-umarov-asadbek.vercel.app)
[![Nuxt 3](https://img.shields.io/badge/Nuxt%203-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue%203-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🔗 Sayt havolasi (Live Demo)

- **Asosiy havola:** [https://portfolio-umarov-asadbek.vercel.app](https://portfolio-umarov-asadbek.vercel.app)
- **Muallif:** Asadbek Umarov ([GitHub](https://github.com/asadbekumarov) / [LinkedIn](https://www.linkedin.com/in/asadbek-umarov/) / [Telegram](https://t.me/Asad_umarov))

---

## 📸 Skrinshot / Preview

<div align="center">
  <!-- Skrinshot rasmi (og-image.png yoki skrinshot yo'li) -->
  <img src="./public/og-image.png" alt="Asadbek Umarov Portfolio Preview" width="100%" style="border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</div>

> *Eslatma: Loyiha skrinshotini yangilash uchun rasm faylini `./public/og-image.png` manziliga joylashtiring.*

---

## 🛠 Texnologiyalar Steki (Tech Stack)

| Yo'nalish | Texnologiya | Tavsif |
| :--- | :--- | :--- |
| **Framework** | [Nuxt 3](https://nuxt.com/) | SSR/SSG qo'llab-quvvatlovchi zamonaviy Vue freymvorki |
| **Core** | [Vue 3](https://vuejs.org/) (Composition API) | Reaktiv va modulli komponentlar |
| **Til** | [TypeScript](https://www.typescriptlang.org/) | Qat'iy tiplashtirish va xavfsiz kod arxitekturasi |
| **Stillar** | [Tailwind CSS](https://tailwindcss.com/) | Zamonaviy va moslashuvchan (responsive) utility-first dizayn |
| **Animatsiyalar** | [GSAP](https://gsap.com/) | Silliq va interaktiv veb-animatsiyalar |
| **Ko'p tillilik** | [@nuxtjs/i18n](https://v8.i18n.nuxtjs.org/) | O'zbek va Ingliz tillarini to'liq qo'llab-quvvatlash |
| **SEO & Meta** | [nuxt-schema-org](https://nuxtseo.com/schema-org/), Nuxt Fonts | Qidiruv tizimlari (Google SEO), JSON-LD va boy meta teglari |
| **Ikonkalar** | [Lucide Vue Next](https://lucide.dev/), Simple Icons | Yengil vektorli zamonaviy ikonka to'plamlari |
| **Format & Sifat** | ESLint, Prettier, vue-tsc | Toza kod standarti va avtomatik tekshiruv |

---

## 📁 Papka Tuzilishi (Project Structure)

```text
portfolio/
├── assets/             # Stillar, shriftlar va lokal media resurslar
│   ├── css/            # Global Tailwind va CSS sozlamalari
│   └── images/         # Loyiha va umumiy veb-rasmlar (webp)
├── components/         # Qayta ishlatiluvchi Vue komponentlari
│   ├── layout/         # Navbar, Footer, Container kabi skelet komponentlar
│   ├── sections/       # Hero, About, Skills, Experience, Projects, Contact
│   └── ui/             # Tugmalar, kartalar, modallar, Lightbox
├── composables/        # Reaktiv biznes logika (Vue composables)
├── data/               # Statik ma'lumotlar (loyihalar ro'yxati, tajriba, ko'nikmalar)
├── i18n/               # Ko'p tillilik konfiguratsiyasi va tarjima fayllari
│   └── locales/        # uz.json va en.json lug'atlari
├── pages/              # Nuxt fayl-asosli marshrutlari (Routing)
│   ├── index.vue       # Asosiy sahifa
│   └── case-studies/   # Maxsus loyiha tahlillari sahifalari
├── public/             # Brauzer orqali to'g'ridan-to'g'ri o'qiladigan statik fayllar
│   ├── og-image.png    # Open Graph ijtimoiy tarmoq banneri (Preview)
│   ├── resume.pdf      # Yuklab olinuvchi rezyume
│   └── robots.txt      # Qidiruv tizimi botlari ko'rsatmalari
├── types/              # TypeScript interfeyslari va tip ta'riflari
├── nuxt.config.ts      # Nuxt konfiguratsiyasi (modullar, SEO, i18n)
├── tailwind.config.ts  # Tailwind ranglar palitrasi va mavzular
└── package.json        # Loyiha skriptlari va qaramliklari (dependencies)
```

---

## 💻 Mahalliy Muhitda Ishga Tushirish (Local Setup)

### 1. Talablar
- [Node.js](https://nodejs.org/) (v18.x yoki v20.x tavsiya etiladi)
- Paket boshqaruvchi: `npm`, `pnpm` yoki `yarn`

### 2. Repozitoriyni klonlash
```bash
git clone https://github.com/asadbekumarov/portfolio-umarov-asadbek.git
cd portfolio-umarov-asadbek
```

### 3. Paketlarni o'rnatish
```bash
npm install
# yoki: pnpm install
```

### 4. Dasturchi rejimida ishga tushirish (Dev Server)
```bash
npm run dev
```
Brauzeringizda **[http://localhost:3000](http://localhost:3000)** manzilini oching.

### 5. Qo'shimcha Foydali Buyruqlar
```bash
# Kod sifatini tekshirish (Lint)
npm run lint

# Lint xatoliklarini avtomatik tuzatish
npm run lint:fix

# TypeScript turlarini tekshirish
npm run typecheck

# Kod formatini to'g'rilash (Prettier)
npm run format

# Production uchun build yig'ish
npm run build

# Yig'ilgan loyihani lokal sinash
npm run preview
```

---

## ☁️ Vercel orqali Deploy Qilish

Loyiha Vercel platformasiga to'liq moslashtirilgan. Deploy qilishning 2 xil qulay usuli mavjud:

### 1-usul: Vercel Dashboard (GitHub orqali — Tavsiya etiladi)

1. [Vercel](https://vercel.com) ga kiring va **"Add New Project"** tugmasini bosing.
2. O'zingizning `asadbekumarov/portfolio-umarov-asadbek` repozitoriyangizni import qiling.
3. Loyiha sozlamalarida quyidagilarni tasdiqlang:
   - **Framework Preset:** `Nuxt.js`
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.output/public`
4. **"Deploy"** tugmasini bosing. Har bir yangi `git push` qilganingizda Vercel saytni avtomatik yangilaydi (CI/CD).

### 2-usul: Vercel CLI orqali (Terminaldan)

```bash
# Vercel vositasini ishga tushirish
npx vercel

# Production versiyasini deploy qilish
npx vercel --prod
```

---

## 📄 Litsenziya

Ushbu loyiha ochiq manbali bo'lib, shaxsiy portfoliosini yaratmoqchi bo'lgan har qanday dasturchi namuna sifatida foydalanishi mumkin.
MIT License asosida tarqatiladi.
