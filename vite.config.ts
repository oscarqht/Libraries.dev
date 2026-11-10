import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  define: {
    __VOICE_SURFACE__: JSON.stringify(true),
  },
  resolve: {
    alias: {
      'border-beam': resolve(__dirname, 'packages/border-beam/src/index.ts'),
      'thinking-orbs': resolve(__dirname, 'packages/thinking-orbs/src/index.ts'),
      'bot-avatars': resolve(__dirname, 'packages/bot-avatars/src/index.ts'),
      'liquid-gooey': resolve(__dirname, 'packages/liquid-gooey/src/index.ts'),
      'voice-glow': resolve(__dirname, 'packages/voice-glow/src/index.ts'),
      'metal-fx': resolve(__dirname, 'packages/metal-fx/src/index.ts'),
      'img-fx': resolve(__dirname, 'packages/img-fx/src/index.ts'),
    },
  },
});
