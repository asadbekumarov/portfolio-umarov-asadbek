<script setup lang="ts">
import {
  Mail,
  Phone,
  Linkedin,
  Send,
  ExternalLink,
  Copy,
  Check,
  MessageSquare,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-vue-next';
import { contacts } from '~/data';
import type { ContactCard } from '~/types';

const { t } = useI18n();

const copiedKey = ref<string | null>(null);
let copyTimeout: ReturnType<typeof setTimeout> | null = null;

const telegramContact = computed(() => contacts.find((c) => c.icon === 'telegram'));

// Form state
const form = reactive({
  name: '',
  contact: '',
  subject: '',
  message: '',
  company_website: '', // honeypot
});

const isSubmitting = ref(false);
const isSuccess = ref(false);
const errorMessage = ref<string | null>(null);

const isExternal = (card: ContactCard): boolean => {
  return (
    Boolean(card.external) &&
    !card.href.startsWith('mailto:') &&
    !card.href.startsWith('tel:')
  );
};

const copyValue = async (card: ContactCard) => {
  if (typeof window === 'undefined' || !navigator?.clipboard) return;

  try {
    await navigator.clipboard.writeText(card.value);
    copiedKey.value = card.icon;

    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      copiedKey.value = null;
    }, 2000);
  } catch {
    // Fallback if clipboard API is blocked
  }
};

const handleSubmit = async () => {
  errorMessage.value = null;

  if (!form.name.trim() || !form.contact.trim() || !form.message.trim()) {
    errorMessage.value = t('contact.form.error_required');
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await $fetch<{ success: boolean }>('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        contact: form.contact.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        company_website: form.company_website,
      },
    });

    if (response?.success) {
      isSuccess.value = true;
      form.name = '';
      form.contact = '';
      form.subject = '';
      form.message = '';
      form.company_website = '';
    } else {
      errorMessage.value = t('contact.form.error_generic');
    }
  } catch (err: unknown) {
    const errorObj = err as {
      data?: { statusMessage?: string };
      message?: string;
    };
    errorMessage.value =
      errorObj?.data?.statusMessage ||
      errorObj?.message ||
      t('contact.form.error_generic');
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  isSuccess.value = false;
  errorMessage.value = null;
};

onUnmounted(() => {
  if (copyTimeout) clearTimeout(copyTimeout);
});
</script>

<template>
  <section
    id="contact"
    class="section-padding relative overflow-hidden scroll-mt-24 lg:scroll-mt-28"
    aria-labelledby="contact-heading"
  >
    <div class="section-container relative z-10">
      <!-- ── Section Header ── -->
      <div class="text-center mb-10 sm:mb-14 px-2">
        <!-- Section Label Badge -->
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0145f2]/10 border border-[#0145f2]/25 text-[#0145f2] text-xs font-semibold uppercase tracking-wider mb-3 scroll-animate"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-[#0145f2]" />
          <span>{{ $t('contact.label') }}</span>
        </div>

        <!-- Main Title -->
        <h2
          id="contact-heading"
          class="section-title text-3xl sm:text-4xl lg:text-5xl font-extrabold scroll-animate delay-100"
        >
          {{ $t('contact.title') }}
          <span class="gradient-text">{{ $t('contact.title_accent') }}</span>
        </h2>

        <!-- Subtitle -->
        <p
          class="mt-3.5 text-sm sm:text-base text-slate-400 max-w-xl mx-auto scroll-animate delay-150 leading-relaxed"
        >
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <!-- ── Bento Layout: Left Info Card + Right Contact Form ── -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <!-- ── Left Column: Direct Contact Card ── -->
        <div class="lg:col-span-5 scroll-animate delay-150">
          <div
            class="glass-card p-6 sm:p-8 rounded-2xl border border-white/[0.08] backdrop-blur-md flex flex-col justify-between h-full hover:border-[#0145f2]/30 transition-all duration-300 relative overflow-hidden shadow-xl shadow-black/20"
          >
            <div>
              <!-- Header -->
              <div class="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06]">
                <div
                  class="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0145f2]/10 border border-[#0145f2]/20 text-[#0145f2] flex-shrink-0"
                  aria-hidden="true"
                >
                  <Sparkles class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="text-lg font-bold text-white">
                    {{ $t('contact.direct_title') }}
                  </h3>
                  <p class="text-xs text-slate-400 mt-0.5">
                    {{ $t('contact.direct_desc') }}
                  </p>
                </div>
              </div>

              <!-- Contact Channels List -->
              <div class="space-y-3">
                <div
                  v-for="card in contacts"
                  :key="card.icon"
                  class="p-3.5 rounded-xl bg-slate-900/40 border border-white/[0.06] hover:border-[#0145f2]/30 hover:bg-[#0145f2]/[0.04] transition-all duration-200 flex items-center justify-between gap-3 group/item"
                >
                  <!-- Link info -->
                  <a
                    :href="card.href"
                    :target="isExternal(card) ? '_blank' : undefined"
                    :rel="isExternal(card) ? 'noopener noreferrer' : undefined"
                    class="flex items-center gap-3.5 flex-1 min-w-0"
                    :aria-label="`${$t(card.labelKey)}: ${card.value}`"
                  >
                    <div
                      class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-[#0145f2]/10 border border-[#0145f2]/20 text-[#0145f2] group-hover/item:scale-105 group-hover/item:bg-[#0145f2]/20 transition-all duration-200"
                      aria-hidden="true"
                    >
                      <Mail v-if="card.icon === 'email'" class="w-4 h-4" />
                      <Phone v-else-if="card.icon === 'phone'" class="w-4 h-4" />
                      <Linkedin v-else-if="card.icon === 'linkedin'" class="w-4 h-4" />
                      <Send v-else-if="card.icon === 'telegram'" class="w-4 h-4" />
                    </div>

                    <div class="flex-1 min-w-0">
                      <p class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        {{ $t(card.labelKey) }}
                      </p>
                      <p
                        class="text-sm font-semibold truncate text-slate-200 group-hover/item:text-[#0145f2] transition-colors"
                      >
                        {{ card.value }}
                      </p>
                    </div>
                  </a>

                  <!-- Action Buttons (Copy + External) -->
                  <div class="flex items-center gap-1 flex-shrink-0">
                    <!-- Copy Button -->
                    <button
                      type="button"
                      class="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors relative cursor-pointer"
                      :title="copiedKey === card.icon ? $t('contact.copied') : $t('contact.copy')"
                      :aria-label="`${$t('contact.copy')} ${card.value}`"
                      @click.stop="copyValue(card)"
                    >
                      <Check
                        v-if="copiedKey === card.icon"
                        class="w-4 h-4 text-emerald-400 animate-in fade-in zoom-in duration-150"
                        aria-hidden="true"
                      />
                      <Copy
                        v-else
                        class="w-4 h-4 opacity-60 group-hover/item:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />

                      <!-- Tooltip -->
                      <span
                        v-if="copiedKey === card.icon"
                        class="absolute -top-7 right-0 text-[10px] font-semibold bg-emerald-500 text-slate-950 px-2 py-0.5 rounded shadow pointer-events-none whitespace-nowrap animate-in fade-in zoom-in duration-150"
                      >
                        {{ $t('contact.copied') }}
                      </span>
                    </button>

                    <!-- External Arrow -->
                    <a
                      v-if="isExternal(card)"
                      :href="card.href"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-2 rounded-lg text-slate-500 hover:text-white transition-colors"
                      :aria-label="`${$t(card.labelKey)} (yangi oynada ochiladi)`"
                    >
                      <ExternalLink
                        class="w-4 h-4 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5 transition-transform duration-200"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer area: Response time + Telegram quick button -->
            <div class="mt-6 pt-5 border-t border-white/[0.06] space-y-3">
              <!-- Live response badge -->
              <div
                class="flex items-center gap-2.5 text-xs text-emerald-400 font-medium py-2.5 px-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
              >
                <span class="relative flex h-2 w-2" aria-hidden="true">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                  />
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
                  />
                </span>
                <span>{{ $t('contact.response_time') }}</span>
              </div>

              <!-- Telegram direct button -->
              <a
                v-if="telegramContact"
                :href="telegramContact.href"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary w-full justify-center py-3 text-sm group"
              >
                <Send class="w-4 h-4 text-sky-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span>{{ $t('contact.cta_telegram') }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- ── Right Column: Interactive Contact Form ── -->
        <div class="lg:col-span-7 scroll-animate delay-200">
          <div
            class="glass-card p-6 sm:p-8 rounded-2xl border border-white/[0.08] backdrop-blur-md flex flex-col justify-between h-full hover:border-[#0145f2]/30 transition-all duration-300 relative overflow-hidden shadow-xl shadow-black/20"
          >
            <!-- Ambient Blue Glow -->
            <div
              class="pointer-events-none absolute -top-24 -right-24 w-52 h-52 bg-[#0145f2]/10 blur-3xl rounded-full"
              aria-hidden="true"
            />

            <!-- Form Header -->
            <div class="flex items-center gap-3 mb-6 pb-5 border-b border-white/[0.06] relative z-10">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center bg-[#0145f2]/10 border border-[#0145f2]/20 text-[#0145f2] flex-shrink-0"
                aria-hidden="true"
              >
                <MessageSquare class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-white">
                  {{ $t('contact.form.title') }}
                </h3>
                <p class="text-xs text-slate-400 mt-0.5">
                  {{ $t('contact.form.subtitle') }}
                </p>
              </div>
            </div>

            <!-- ── Success State View ── -->
            <div
              v-if="isSuccess"
              class="py-12 px-4 text-center flex flex-col items-center justify-center flex-1 space-y-5 animate-in fade-in zoom-in duration-300 relative z-10"
            >
              <div
                class="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                aria-hidden="true"
              >
                <CheckCircle2 class="w-8 h-8" />
              </div>

              <div class="space-y-1.5 max-w-md mx-auto">
                <h4 class="text-xl font-bold text-white">
                  {{ $t('contact.form.success_title') }}
                </h4>
                <p class="text-sm text-slate-300 leading-relaxed">
                  {{ $t('contact.form.success_desc') }}
                </p>
              </div>

              <div class="pt-2 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  class="btn-primary w-full sm:w-auto px-6 py-2.5 text-sm cursor-pointer"
                  @click="resetForm"
                >
                  {{ $t('contact.form.send_another') }}
                </button>

                <a
                  v-if="telegramContact"
                  :href="telegramContact.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-secondary w-full sm:w-auto px-6 py-2.5 text-sm"
                >
                  <Send class="w-4 h-4 text-sky-400" />
                  <span>{{ $t('contact.cta_telegram') }}</span>
                </a>
              </div>
            </div>

            <!-- ── Active Form ── -->
            <form
              v-else
              class="space-y-4 flex-1 flex flex-col justify-between relative z-10"
              @submit.prevent="handleSubmit"
            >
              <!-- Honeypot (bot trap) -->
              <input
                v-model="form.company_website"
                type="text"
                name="company_website"
                tabindex="-1"
                autocomplete="off"
                class="hidden"
                aria-hidden="true"
              >

              <!-- Error Alert -->
              <div
                v-if="errorMessage"
                class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm flex items-center gap-2.5"
                role="alert"
              >
                <AlertCircle class="w-4 h-4 flex-shrink-0" />
                <span>{{ errorMessage }}</span>
              </div>

              <div class="space-y-4">
                <!-- Name & Contact inputs (2 cols on sm+) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Name -->
                  <div>
                    <label
                      for="contact-name"
                      class="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      {{ $t('contact.form.name_label') }}
                      <span class="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      v-model="form.name"
                      type="text"
                      required
                      maxlength="100"
                      :placeholder="$t('contact.form.name_placeholder')"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1e]/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#0145f2] focus:ring-2 focus:ring-[#0145f2]/20 transition-all"
                    >
                  </div>

                  <!-- Contact (Phone or Telegram) -->
                  <div>
                    <label
                      for="contact-info"
                      class="block text-xs font-semibold text-slate-300 mb-1.5"
                    >
                      {{ $t('contact.form.contact_label') }}
                      <span class="text-rose-400">*</span>
                    </label>
                    <input
                      id="contact-info"
                      v-model="form.contact"
                      type="text"
                      required
                      maxlength="100"
                      :placeholder="$t('contact.form.contact_placeholder')"
                      class="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1e]/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#0145f2] focus:ring-2 focus:ring-[#0145f2]/20 transition-all"
                    >
                  </div>
                </div>

                <!-- Subject / Project type -->
                <div>
                  <label
                    for="contact-subject"
                    class="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    {{ $t('contact.form.subject_label') }}
                  </label>
                  <input
                    id="contact-subject"
                    v-model="form.subject"
                    type="text"
                    maxlength="150"
                    :placeholder="$t('contact.form.subject_placeholder')"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1e]/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#0145f2] focus:ring-2 focus:ring-[#0145f2]/20 transition-all"
                  >
                </div>

                <!-- Message -->
                <div>
                  <label
                    for="contact-message"
                    class="block text-xs font-semibold text-slate-300 mb-1.5"
                  >
                    {{ $t('contact.form.message_label') }}
                    <span class="text-rose-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    v-model="form.message"
                    rows="4"
                    required
                    maxlength="3000"
                    :placeholder="$t('contact.form.message_placeholder')"
                    class="w-full px-3.5 py-2.5 rounded-xl bg-[#070e1e]/80 border border-white/10 text-slate-100 text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#0145f2] focus:ring-2 focus:ring-[#0145f2]/20 transition-all resize-none"
                  />
                </div>
              </div>

              <!-- Submit button -->
              <div class="pt-2">
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="btn-primary w-full justify-center py-3.5 text-sm sm:text-base font-semibold shadow-[0_4px_20px_rgba(1,69,242,0.35)] hover:shadow-[0_6px_25px_rgba(1,69,242,0.55)] group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  <Loader2
                    v-if="isSubmitting"
                    class="w-4 h-4 sm:w-5 sm:h-5 animate-spin"
                  />
                  <Send
                    v-else
                    class="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span>
                    {{
                      isSubmitting
                        ? $t('contact.form.submitting')
                        : $t('contact.form.submit')
                    }}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
