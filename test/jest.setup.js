// jsdom-global は最初に宣言しないとエラーになる
require('jsdom-global')()

// https://github.com/vuejs/vue-test-utils/issues/974
global.requestAnimationFrame = cb => cb()

const Vue = require('vue')
const Vuetify = require('vuetify')

// TypeScriptを使う場合は localVue を使わない
Vue.use(Vuetify)
