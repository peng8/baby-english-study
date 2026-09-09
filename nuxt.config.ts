// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  devServer: { port: 3030 },
  nitro: {
    preset: 'node-server',
    // 数据全在前端，无 server/api：全站预渲染为静态 HTML，
    // TTFB 从 SSR 的数百毫秒降为毫秒级，且 CDN 可直接缓存 HTML
    prerender: {
      crawlLinks: true,
      routes: ['/', '/flashcards', '/songs', '/review', '/parent', '/games'],
    },
  },
  app: {
    head: {
      title: 'Ann宝宝英语乐园',
      htmlAttrs: { lang: 'zh-CN' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no' },
        { name: 'theme-color', content: '#FFF7EC' },
        { name: 'description', content: '3-4 岁幼儿英语启蒙：闪卡磨耳朵、亲子小游戏、儿歌资源' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
