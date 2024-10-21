/**
 * @name Config
 * @description proxy代理项目配置
 */
export const proxy = {
  '/api': {
    target: 'http://localhost',
    changeOrigin: true,
    rewrite: (path: any) => path.replace(/^\/api/, 'api')
  }
}
