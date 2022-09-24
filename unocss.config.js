import {
  defineConfig,
  presetUno,
  presetIcons,
  // presetWebFonts,
  presetAttributify,
  presetTypography,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { breakpointsQuasar } from '@vueuse/core';

export default defineConfig({
  theme: {
    breakpoint: breakpointsQuasar,
    colors: {
      primary: '#e96d27',
      // primary: '#FF5200',
      secondary: '#5d5d5b',
      // secondary: '#00AEFF',
      accent: '#AEFF00',
      saccent: '#1C8CE6',
      paccent: '#FFEDD5',
      pdark: '#62412e',
      pdark1: '#442',
      dark: '#1D1D1D',
      'ineed-text': '#282828',
      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037',
    },
  },
  shortcuts: [['test', 'border-1px border-red-800']],
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetIcons({ scale: 1 }),
    // presetWebFonts(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
