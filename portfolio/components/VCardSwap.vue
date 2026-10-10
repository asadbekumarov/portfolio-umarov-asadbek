<script setup lang="ts">
type GSAP = typeof import('gsap').default;
let gsap: GSAP | null = null;

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
  itemCount:        number;
}

const props = withDefaults(defineProps<Props>(), {
  width:            380,
  height:           260,
  cardDistance:     40,
  verticalDistance: 50,
  delay:            2600,
  pauseOnHover:     true,
  skewAmount:       5,
  easing:           'linear',
});

const emit = defineEmits<{
  (e: 'card-click', idx: number): void;
}>();

// ── Refs ─────────────────────────────────────────────────────────
const containerRef = ref<HTMLDivElement | null>(null);
const cardEls = ref<HTMLElement[]>([]);
const isReady = ref(true);
const isPointerFine = ref(false);

const setCardEl = (el: unknown, i: number) => {
  if (el instanceof HTMLElement) {
    cardEls.value[i] = el;
  }
};

const config = computed(() =>
  props.easing === 'elastic'
    ? {
        ease:           'elastic.out(0.6, 0.9)',
        durDrop:        1.2,
        durMove:        1.2,
        durReturn:      1.2,
        promoteOverlap: 0.85,
        returnDelay:    0.05,
      }
    : {
        ease:           'power2.inOut',
        durDrop:        0.55,
        durMove:        0.55,
        durReturn:      0.55,
        promoteOverlap: 0.65,
        returnDelay:    0.08,
      },
);

interface Slot { x: number; y: number; z: number; zIndex: number; }

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x:      i * distX,
  y:      -i * distY,
  z:      -i * distX * 1.5,
  zIndex: total - i,
});

const getCardTransform = (i: number): Record<string, string | number> => {
  const total = props.itemCount;
  const slot = makeSlot(i, props.cardDistance, props.verticalDistance, total);
  return {
    transform: `translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) translate(-50%, -50%) skewY(${props.skewAmount}deg)`,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
  };
};

const placeNow = (el: HTMLElement, slot: Slot, skew: number) => {
  if (!gsap) {
    el.style.transform = `translate3d(${slot.x}px, ${slot.y}px, ${slot.z}px) translate(-50%, -50%) skewY(${skew}deg)`;
    el.style.zIndex = `${slot.zIndex}`;
    return;
  }
  gsap.set(el, {
    x:              slot.x,
    y:              slot.y,
    z:              slot.z,
    xPercent:       -50,
    yPercent:       -50,
    skewY:          skew,
    transformOrigin:'center center',
    zIndex:         slot.zIndex,
    force3D:        true,
  });
};

// ── GSAP animation (continuous reliable loop) ────────────────────
let tlRef:       any = null;
let swapTimer:   ReturnType<typeof setTimeout> | null = null;
let isSwapping   = false;
const order      = ref<number[]>([]);

const scheduleNext = (delayMs?: number) => {
  if (swapTimer) clearTimeout(swapTimer);
  swapTimer = setTimeout(() => {
    swap();
  }, delayMs ?? props.delay);
};

const swap = () => {
  if (!gsap || isSwapping) return;
  if (order.value.length < 2) return;

  const [front, ...rest] = order.value;
  const elFront = cardEls.value[front];
  if (!elFront) return;

  isSwapping = true;
  const cfg   = config.value;
  const total = cardEls.value.length;
  const tl    = gsap.timeline({
    onComplete: () => {
      isSwapping = false;
      scheduleNext();
    }
  });
  tlRef = tl;

  const dropDist = typeof props.height === 'number' ? props.height * 1.35 : 420;

  // 1. Birinchi kartni pastga tushir
  tl.to(elFront, {
    y:        `+=${dropDist}`,
    opacity:  0.8,
    duration: cfg.durDrop,
    ease:     cfg.ease,
  });

  // 2. Qolganlarni oldinga siljit
  tl.addLabel('promote', `-=${cfg.durDrop * cfg.promoteOverlap}`);
  rest.forEach((idx, i) => {
    const el = cardEls.value[idx];
    if (!el) return;
    const slot = makeSlot(i, props.cardDistance, props.verticalDistance, total);
    tl.set(el, { zIndex: slot.zIndex }, 'promote');
    tl.to(
      el,
      { x: slot.x, y: slot.y, z: slot.z, opacity: 1, duration: cfg.durMove, ease: cfg.ease },
      `promote+=${i * 0.08}`,
    );
  });

  // 3. Birinchi kartni orqa slotga qaytar
  const backSlot = makeSlot(total - 1, props.cardDistance, props.verticalDistance, total);
  tl.addLabel('return', `promote+=${cfg.durMove * cfg.returnDelay}`);
  tl.call(() => {
    gsap.set(elFront, { zIndex: backSlot.zIndex });
    order.value = [...rest, front];
  }, undefined, 'return');
  tl.to(
    elFront,
    { x: backSlot.x, y: backSlot.y, z: backSlot.z, opacity: 1, duration: cfg.durReturn, ease: cfg.ease },
    'return',
  );
};

// ── Hover & Touch interaction ─────────────────────────────────────
const onMouseEnter = () => {
  if (!props.pauseOnHover || !isPointerFine.value) return;
  if (swapTimer) clearTimeout(swapTimer);
  tlRef?.pause();
};

const onMouseLeave = () => {
  if (!props.pauseOnHover || !isPointerFine.value) return;
  tlRef?.play();
  scheduleNext();
};

let touchStartX = 0;
let touchStartY = 0;

const onTouchStart = (e: TouchEvent) => {
  if (!e.touches[0]) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  if (props.pauseOnHover && swapTimer) clearTimeout(swapTimer);
};

const onTouchEnd = (e: TouchEvent) => {
  if (!e.changedTouches[0]) return;
  const deltaX = e.changedTouches[0].clientX - touchStartX;
  const deltaY = e.changedTouches[0].clientY - touchStartY;

  // Agar gorizontal swipe sezilarli bo'lsa (> 45px)
  if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
    swap();
  } else {
    scheduleNext();
  }
};

// ── Tab visibility interaction ───────────────────────────────────
const handleVisibilityChange = () => {
  if (typeof document === 'undefined') return;
  if (document.hidden) {
    if (swapTimer) clearTimeout(swapTimer);
    tlRef?.pause();
  } else {
    tlRef?.play();
    scheduleNext();
  }
};

// ── Reactivity on prop changes ───────────────────────────────────
watch(
  () => [props.cardDistance, props.verticalDistance, props.skewAmount, props.itemCount],
  () => {
    const total = cardEls.value.length;
    order.value.forEach((idx, i) => {
      const el = cardEls.value[idx];
      if (el) {
        placeNow(el, makeSlot(i, props.cardDistance, props.verticalDistance, total), props.skewAmount);
      }
    });
  },
);

// ── Lifecycle ────────────────────────────────────────────────────
onMounted(() => {
  const total = cardEls.value.length;
  order.value = Array.from({ length: total }, (_, i) => i);

  isPointerFine.value = typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Kartlarni dastlabki toza transform bilan joylashtiramiz
  cardEls.value.forEach((el, i) =>
    placeNow(el, makeSlot(i, props.cardDistance, props.verticalDistance, total), props.skewAmount),
  );

  const initGSAP = async () => {
    try {
      const { default: gsapModule } = await import('gsap');
      gsap = gsapModule;

      cardEls.value.forEach((el, i) =>
        placeNow(el, makeSlot(i, props.cardDistance, props.verticalDistance, total), props.skewAmount),
      );

      const prefersReducedMotion = typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion) {
        scheduleNext(5000);
      }
    } catch (e) {
      console.error('GSAP import error:', e);
    }
  };

  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    (window as any).requestIdleCallback(initGSAP, { timeout: 2500 });
  } else {
    setTimeout(initGSAP, 1200);
  }

  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }
});

onUnmounted(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  }
  if (swapTimer) clearTimeout(swapTimer);
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
    class="relative overflow-visible touch-pan-y"
    :style="{ ...containerStyle, perspective: '900px' }"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <div
      v-for="i in itemCount"
      :key="i - 1"
      :ref="(el) => setCardEl(el as HTMLElement, i - 1)"
      :style="{ ...containerStyle, ...getCardTransform(i - 1) }"
      class="absolute top-1/2 left-1/2 rounded-2xl border border-slate-700/60 bg-[#0a101d]
             [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]
             overflow-hidden cursor-pointer shadow-2xl shadow-black/80
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      @click="emit('card-click', i - 1)"
    >
      <slot :index="i - 1" />
    </div>
  </div>
</template>
