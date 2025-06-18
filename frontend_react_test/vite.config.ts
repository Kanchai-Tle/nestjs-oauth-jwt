import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200, // Frontend จะรันที่พอร์ต 4200 (หรือพอร์ตที่คุณต้องการ)
    proxy: {
      '/api': { // ถ้า Frontend เรียก /api มันจะถูก Proxy ไปที่ Backend
        target: 'http://localhost:3000', // URL ของ NestJS Backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // ลบ /api ออกก่อนส่งไป Backend
      },
    },
  },
});