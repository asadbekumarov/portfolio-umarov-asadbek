<script setup lang="ts">
/**
 * VCardSwap — Vue 3 port of React Bits CardSwap
 *
 * React API dan farqlar:
 *  - children (ReactNode) → scoped slot + items prop
 *  - useRef → ref / templateRef array
 *  - useEffect → onMounted + onUnmounted
 *  - useMemo → computed
 *  - cloneElement → v-for + :ref callback
 *
 * GSAP logikasi asl React komponent bilan bir xil:
 *  - makeSlot() — x/y/z/zIndex hisoblash
 *  - placeNow() — gsap.set() bilan boshlang'ich joylashuv
 *  - swap() — birinchi kartni pastga olib, qolganlarni oldinga siljitadi,
 *    so'ngra birinchini orqaga qaytaradi
 */

import gsap from 'gsap';

// ── Props ───────────────────────────────────────────────────────
interface Props {
  width?:           number | string;
  height?:          number | string;
  cardDistance?:    number;
  verticalDistance?:number;
  delay?:           number;
  pauseOnHover?:    boolean;
  skewAmount?:      number;
  easing?:          'linear' | 'elastic';
  itemCount:        number; // items.length ni bilish uchun (slot bazasida)
}

const props = withDefaults(defineProps<Props>(), {
  width:            500,
  height:           400,
  cardDistance:     60,
  verticalDistance: 70,
  delay:            5000,
  pauseOnHover:     false,
  skewAmount:       6,
  easing:           'elastic',
});

const emit = defineEmits<{
  (e: 'card-click', idx: number): void;
}>();

// ── Refs ─────────────────────────────────────────────────────────
const containerRef = ref<HTMLDivElement | null>(null);
// :ref callback ile dinamik to'plangan element referenslari
const cardEls = ref<HTMLElement[]>([]);

const setCardEl = (el: unknown, i: number) => {
  if (el instanceof HTMLElement) {
    cardEls.value[i] = el;
  }
};

// ── Config — asl React komponent bilan bir xil ───────────────────
const config = computed(() =>
  props.easing === 'elastic'
    ? {
        ease:           'elastic.out(0.6,0.9)',
        durDrop:        2,
        durMove:        2,
        durReturn:      2,
        promoteOverlap: 0.9,
        returnDelay:    0.05,
      }
    : {
        ease:           'power1.inOut',
        durDrop:        0.8,
        durMove:        0.8,
        durReturn:      0.8,
        promoteOverlap: 0.45,
        returnDelay:    0.2,
      },
);

// ── Helper functions — React kaydan to'g'ridan-to'g'ri ko'chirilgan ─
interface Slot { x: number; y: number; z: number; zIndex: number; }

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x:      i * distX,
  y:      -i * distY,
  z:      -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x:             slot.x,
    y:             slot.y,
    z:             slot.z,
    xPercent:      -50,
    yPercent:      -50,
    skewY:         skew,
    transformOrigin:'center center',
    zIndex:        slot.zIndex,
    force3D:       true,
  });

// ── GSAP animation ────────────────────────────────────────────────
let tlRef:       gsap.core.Timeline | null = null;
let intervalId:  ReturnType<typeof setInterval> | null = null;
const order      = ref<number[]>([]);

const swap = () => {
  if (order.value.length < 2) return;

  const [front, ...rest] = order.value;
  const elFront = cardEls.value[front];
  if (!elFront) return;

  const cfg   = config.value;
  const total = cardEls.value.length;
  const tl    = gsap.timeline();
  tlRef = tl;

  // 1. Birinchi kartni pastga tushir
  tl.to(elFront, {
    y:        '+=500',
    duration: cfg.durDrop,
    ease:     cfg.ease,
  });

  // 2. Qolganlarni oldinga siljit (overlap bilan)
  tl.addLabel('promote', `-=${cfg.durDrop * cfg.promoteOverlap}`);
  rest.forEach((idx, i) => {
    const el   = cardEls.value[idx];
    if (!el) return;
    const slot = makeSlot(i, props.cardDistance, props.verticalDistance, total);
    tl.set(el, { zIndex: slot.zIndex }, 'promote');
    tl.to(
      el,
      { x: slot.x, y: slot.y, z: slot.z, duration: cfg.durMove, ease: cfg.ease },
      `promote+=${i * 0.15}`,
    );
  });

  // 3. Birinchi kartni orqaga qaytir
  const backSlot = makeSlot(total - 1, props.cardDistance, props.verticalDistance, total);
  tl.addLabel('return', `promote+=${cfg.durMove * cfg.returnDelay}`);
  tl.call(() => gsap.set(elFront, { zIndex: backSlot.zIndex }), undefined, 'return');
  tl.to(
    elFront,
    { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: cfg.durReturn, ease: cfg.ease },
    'return',
  );

  // 4. Tartibni yangilash
  tl.call(() => { order.value = [...rest, front]; });
};

// ── Lifecycle ────────────────────────────────────────────────────
onMounted(() => {
  // Barcha kartlarni boshlang'ich joyiga qo'yamiz
  const total = cardEls.value.length;
  order.value = Array.from({ length: total }, (_, i) => i);

  cardEls.value.forEach((el, i) =>
    placeNow(el, makeSlot(i, props.cardDistance, props.verticalDistance, total), props.skewAmount),
  );

  // Birinchi swap ni biroz kechiktirib boshlayiz
  swap();
  intervalId = setInterval(swap, props.delay);

  // Hover pause/resume
  if (props.pauseOnHover && containerRef.value) {
    const node = containerRef.value;
    const pause = () => {
      tlRef?.pause();
      if (intervalId) clearInterval(intervalId);
    };
    const resume = () => {
      tlRef?.play();
      intervalId = setInterval(swap, props.delay);
    };
    node.addEventListener('mouseenter', pause);
    node.addEventListener('mouseleave', resume);
  }
});

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId);
  tlRef?.kill();
});

// ── Computed width/height style ───────────────────────────────────
const containerStyle = computed(() => ({
  width:  typeof props.width  === 'number' ? `${props.width}px`  : props.width,
  height: typeof props.height === 'number' ? `${props.height}px` : props.height,
}));
</script>

<template>
  <div
    ref="containerRef"
    class="relative overflow-visible"
    :style="{ ...containerStyle, perspective: '900px' }"
  >
    <!--
      Har bir slot item uchun wrapper div.
      :ref callback — GSAP uchun element referensini saqlaydi.
      absolute top-1/2 left-1/2 — asl React Card className bilan mos.
    -->
    <div
      v-for="i in itemCount"
      :key="i - 1"
      :ref="(el) => setCardEl(el as HTMLElement, i - 1)"
      :style="containerStyle"
      class="absolute top-1/2 left-1/2 rounded-xl border border-white/10 bg-black
             [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]
             overflow-hidden cursor-pointer"
      @click="emit('card-click', i - 1)"
    >
      <!-- Scoped slot: parent kontent yuboradi -->
      <slot :index="i - 1" />
    </div>
  </div>
</template>
