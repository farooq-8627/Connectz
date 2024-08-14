import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
	},
	build: {
		chunkSizeWarningLimit: 1000, // Increase the limit to 1000 KB
	},
});
