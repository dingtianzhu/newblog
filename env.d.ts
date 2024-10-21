/// <reference types="vite/client" />
declare global {
  interface Window {
    localStorage: Storage
  }
}
