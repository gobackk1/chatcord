// jsdom-global は最初に宣言しないとエラーになる
require('jsdom-global')()

const Vue = require('vue')
const Vuetify = require('vuetify')

Vue.use(Vuetify)
