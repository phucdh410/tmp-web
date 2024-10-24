import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    }),
  ],
  publicDir: "public",
  resolve: {
    alias: {
      "@controls": path.resolve(
        __dirname,
        "src/common/components/controls/index.ts"
      ),
      "@layouts": path.resolve(
        __dirname,
        "src/common/components/layouts/index.ts"
      ),
      "@others": path.resolve(
        __dirname,
        "src/common/components/others/index.ts"
      ),
      "@components": path.resolve(__dirname, "src/common/components"),
      "@constants": path.resolve(__dirname, "src/common/constants"),
      "@assets": path.resolve(__dirname, "src/common/assets"),
      "@enums": path.resolve(__dirname, "src/common/enums"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@apis": path.resolve(__dirname, "src/apis"),
      "@routes": path.resolve(__dirname, "src/routes/index.tsx"),
      "@axios": path.resolve(__dirname, "src/utils/axios"),
      "@funcs": path.resolve(__dirname, "src/utils/funcs"),
      "@hooks": path.resolve(__dirname, "src/utils/hooks"),
      "@react-query": path.resolve(__dirname, "src/utils/react-query"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@interfaces": path.resolve(__dirname, "src/types"), //Dùng interface tránh chữ type của Typescript
    },
  },
  assetsInclude: ["**/*.lottie"],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
