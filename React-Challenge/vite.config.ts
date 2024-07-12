import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import sassDts from 'vite-plugin-sass-dts';

export default defineConfig({
  plugins: [tsconfigPaths(), sassDts(), react()],
});
