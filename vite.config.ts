import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/kakaomapTest/", // <= 레포 이름과 일치해야 해!
  plugins: [react()],
});
