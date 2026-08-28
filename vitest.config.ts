import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'node',

        setupFiles: ['./setup-test.ts'],

        include: ['**/*.{test,spec}.{js,ts}'],
        exclude: ['node_modules', 'dist'],

        globals: true,

        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
    },
});