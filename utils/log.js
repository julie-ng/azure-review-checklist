export default {
  frontend: function (args) {
    // eslint-disable-next-line nuxt/prefer-import-meta
    if (process.client) {
      console.log(args)
    }
  }
}