import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@controls": path.resolve(
        __dirname,
        "src/common/components/controls/index.ts"
      ),
      "@others": path.resolve(
        __dirname,
        "src/common/components/others/index.ts"
      ),
      "@layouts": path.resolve(
        __dirname,
        "src/common/components/layouts/index.ts"
      ),
      "@constants": path.resolve(__dirname, "src/common/constants"),
      "@enums": path.resolve(__dirname, "src/common/enums"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@routes": path.resolve(__dirname, "src/routes/index.tsx"),
      "@axios": path.resolve(__dirname, "src/utils/axios"),
      "@funcs": path.resolve(__dirname, "src/utils/funcs"),
      "@hooks": path.resolve(__dirname, "src/utils/hooks"),
      "@react-query": path.resolve(__dirname, "src/utils/react-query"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@interfaces": path.resolve(__dirname, "src/types"), //Dùng interface tránh chữ type của Typescript
    },
  },
});
