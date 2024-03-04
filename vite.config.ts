import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react(), dts(
    {
      insertTypesEntry: true,
    }
  )],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "UI hrnet plugin DatePicker",
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "tailwindcss",
        "date-fns",
        "clsx",
        "usehooks-ts",
        "react/jsx-runtime",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          tailwindcss: "tailwindcss",
          "date-fns": "date-fns",
          clsx: "clsx",
          "usehooks-ts": "usehooks-ts",
        },
      },
    },

    sourcemap: true,
    emptyOutDir: true,
  },
});
