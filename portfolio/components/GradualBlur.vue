<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, watch } from 'vue';

export interface GradualBlurProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
  preset?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'subtle'
    | 'intense'
    | 'smooth'
    | 'sharp'
    | 'header'
    | 'footer'
    | 'sidebar'
    | 'page-header'
    | 'page-footer';
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  target?: 'parent' | 'page';
  className?: string;
  style?: Record<string, any> | string;
}

const props = withDefaults(defineProps<GradualBlurProps>(), {
  position: undefined,
  strength: undefined,
  height: undefined,
  width: undefined,
  divCount: undefined,
  exponential: undefined,
  zIndex: undefined,
  animated: undefined,
  duration: undefined,
  easing: undefined,
  opacity: undefined,
  curve: undefined,
  responsive: undefined,
  mobileHeight: undefined,
  tabletHeight: undefined,
  desktopHeight: undefined,
  mobileWidth: undefined,
  tabletWidth: undefined,
  desktopWidth: undefined,
  preset: undefined,
  gpuOptimized: undefined,
  hoverIntensity: undefined,
  target: undefined,
  className: '',
  style: () => ({}),
});

const emit = defineEmits<{
  (e: 'animationComplete'): void;
}>();

const DEFAULT_CONFIG = {
  position: 'bottom' as const,
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false as boolean | 'scroll',
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear' as const,
  responsive: false,
  target: 'parent' as const,
  className: '',
  style: {} as Record<string, any>,
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },

  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },

  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },

  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },

  'page-header': {
    position: 'top',
    height: '10rem',
    target: 'page',
    strength: 3,
  },
  'page-footer': {
    position: 'bottom',
    height: '10rem',
    target: 'page',
    strength: 3,
  },
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: (p) => p,
  bezier: (p) => p * p * (3 - 2 * p),
  'ease-in': (p) => p * p,
  'ease-out': (p) => 1 - Math.pow(1 - p, 2),
  'ease-in-out': (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
};

const getGradientDirection = (position: string): string => {
  const directions: Record<string, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right',
  };
  return directions[position] || 'to bottom';
};

const containerRef = ref<HTMLDivElement | null>(null);
const isHovered = ref(false);
const isVisible = ref(true);
const windowWidth = ref(1200);

const resolvedConfig = computed(() => {
  const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
  
  // Filter undefined props
  const definedProps: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value !== undefined) {
      definedProps[key] = value;
    }
  }

  return {
    ...DEFAULT_CONFIG,
    ...presetConfig,
    ...definedProps,
  };
});

// Responsive dimensions
const responsiveHeight = computed(() => {
  const cfg = resolvedConfig.value;
  if (!cfg.responsive) return cfg.height;
  const w = windowWidth.value;
  if (w <= 480 && cfg.mobileHeight) return cfg.mobileHeight;
  if (w <= 768 && cfg.tabletHeight) return cfg.tabletHeight;
  if (w <= 1024 && cfg.desktopHeight) return cfg.desktopHeight;
  return cfg.height;
});

const responsiveWidth = computed(() => {
  const cfg = resolvedConfig.value;
  if (!cfg.responsive) return cfg.width;
  const w = windowWidth.value;
  if (w <= 480 && cfg.mobileWidth) return cfg.mobileWidth;
  if (w <= 768 && cfg.tabletWidth) return cfg.tabletWidth;
  if (w <= 1024 && cfg.desktopWidth) return cfg.desktopWidth;
  return cfg.width;
});

// IntersectionObserver for animated="scroll"
let observer: IntersectionObserver | null = null;
let animTimeout: ReturnType<typeof setTimeout> | null = null;

const setupObserver = () => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
  if (resolvedConfig.value.animated === 'scroll' && containerRef.value && typeof IntersectionObserver !== 'undefined') {
    isVisible.value = false;
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          if (animTimeout) clearTimeout(animTimeout);
          const dur = parseFloat(resolvedConfig.value.duration || '0.3') * 1000;
          animTimeout = setTimeout(() => {
            emit('animationComplete');
          }, dur);
        } else {
          isVisible.value = false;
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.value);
  } else {
    isVisible.value = true;
  }
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  const handleResize = () => {
    windowWidth.value = window.innerWidth;
  };
  window.addEventListener('resize', handleResize, { passive: true });

  setupObserver();

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    if (observer) observer.disconnect();
    if (animTimeout) clearTimeout(animTimeout);
  });
});

watch(
  () => resolvedConfig.value.animated,
  () => {
    setupObserver();
  }
);

// Blur divs computation
const blurDivs = computed(() => {
  const divs: Array<{ key: number; style: Record<string, any> }> = [];
  const cfg = resolvedConfig.value;
  const count = Math.max(1, cfg.divCount || 5);
  const increment = 100 / count;
  const currentStrength =
    isHovered.value && cfg.hoverIntensity
      ? cfg.strength * cfg.hoverIntensity
      : cfg.strength;

  const curveFunc = CURVE_FUNCTIONS[cfg.curve] || CURVE_FUNCTIONS.linear;

  for (let i = 1; i <= count; i++) {
    let progress = i / count;
    progress = curveFunc(progress);

    let blurValue: number;
    if (cfg.exponential) {
      blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
    } else {
      blurValue = 0.0625 * (progress * count + 1) * currentStrength;
    }

    const p1 = Math.round((increment * i - increment) * 10) / 10;
    const p2 = Math.round(increment * i * 10) / 10;
    const p3 = Math.round((increment * i + increment) * 10) / 10;
    const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

    let gradient = `transparent ${p1}%, black ${p2}%`;
    if (p3 <= 100) gradient += `, black ${p3}%`;
    if (p4 <= 100) gradient += `, transparent ${p4}%`;

    const direction = getGradientDirection(cfg.position);

    const divStyle: Record<string, any> = {
      maskImage: `linear-gradient(${direction}, ${gradient})`,
      WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
      backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
      WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
      opacity: cfg.opacity,
      transition:
        cfg.animated && cfg.animated !== 'scroll'
          ? `backdrop-filter ${cfg.duration} ${cfg.easing}, -webkit-backdrop-filter ${cfg.duration} ${cfg.easing}`
          : undefined,
    };

    if (cfg.gpuOptimized) {
      divStyle.transform = 'translateZ(0)';
      divStyle.willChange = 'backdrop-filter';
    }

    divs.push({ key: i, style: divStyle });
  }

  return divs;
});

// Container style
const containerStyle = computed(() => {
  const cfg = resolvedConfig.value;
  const isVertical = ['top', 'bottom'].includes(cfg.position);
  const isHorizontal = ['left', 'right'].includes(cfg.position);
  const isPageTarget = cfg.target === 'page';

  const baseStyle: Record<string, any> = {
    position: isPageTarget ? 'fixed' : 'absolute',
    pointerEvents: cfg.hoverIntensity ? 'auto' : 'none',
    opacity: isVisible.value ? 1 : 0,
    transition: cfg.animated ? `opacity ${cfg.duration} ${cfg.easing}` : undefined,
    zIndex: isPageTarget ? (cfg.zIndex || 1000) + 100 : (cfg.zIndex || 1000),
    ...(typeof cfg.style === 'object' ? cfg.style : {}),
  };

  if (isVertical) {
    baseStyle.height = responsiveHeight.value;
    baseStyle.width = responsiveWidth.value || '100%';
    baseStyle[cfg.position] = 0;
    baseStyle.left = 0;
    baseStyle.right = 0;
  } else if (isHorizontal) {
    baseStyle.width = responsiveWidth.value || responsiveHeight.value;
    baseStyle.height = '100%';
    baseStyle[cfg.position] = 0;
    baseStyle.top = 0;
    baseStyle.bottom = 0;
  }

  return baseStyle;
});
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'gradual-blur relative isolate pointer-events-none',
      resolvedConfig.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent',
      resolvedConfig.className
    ]"
    :style="containerStyle"
    @mouseenter="resolvedConfig.hoverIntensity ? (isHovered = true) : undefined"
    @mouseleave="resolvedConfig.hoverIntensity ? (isHovered = false) : undefined"
  >
    <div class="relative w-full h-full">
      <div
        v-for="div in blurDivs"
        :key="div.key"
        class="absolute inset-0 pointer-events-none"
        :style="div.style"
      />
    </div>
    <div v-if="$slots.default" class="relative">
      <slot />
    </div>
  </div>
</template>

<style>
.gradual-blur {
  transition: opacity 0.3s ease-out;
}
.gradual-blur-parent {
  overflow: hidden;
}
</style>
