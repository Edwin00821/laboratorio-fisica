import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

config();

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    // globals: true,
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, '.next', '.husky', '.contentlayer'],
  },
});
