import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const repoBase = '/game_2048/'

export default defineConfig(({ command }) => ({
    base: command === 'build' ? repoBase : '/',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: false,
            base: "/game_2048/",
        })
    ]
}))
