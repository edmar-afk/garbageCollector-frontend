import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			registerType: "prompt",
			includeAssets: ["favicon.ico", "apple-touch-icon.png"],
			manifest: {
				name: "Cooking App",
				short_name: "Cooking App",
				description: "A Progressive App for Cooking Recipes",
				start_url: "/",
				display: "standalone",
				background_color: "#ffffff",
				theme_color: "#0f172a",
				icons: [
					{
						src: "pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
});
