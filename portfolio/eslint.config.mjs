// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  rules: {
    // Prettier bilan ziddiyatni oldini olish (Prettier <img /> teglariga self-closing qo'yadi)
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'any',
        },
      },
    ],
  },
});
