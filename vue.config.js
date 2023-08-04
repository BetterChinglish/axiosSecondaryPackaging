const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  resolve: {
    alias: {
      'assets': '@/assets',
      'components': '@/components',
      'views': '@/views',
      'network': '@/network',
      'utils': '@/utils',

      

    }
  }
})
