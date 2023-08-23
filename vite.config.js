import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 3000,
  // },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      // '@store': path.resolve(__dirname, './src/store'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  plugins: [react()],
});
