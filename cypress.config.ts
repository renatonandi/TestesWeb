import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    username: 'seu_usuario_aqui',
    password: 'sua_senha_aqui'
  },

  chromeWebSecurity: false,
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:8080',
  },
});
