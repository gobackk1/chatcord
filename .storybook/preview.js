// import "!style-loader!css-loader!sass-loader!../../src/styles/property.scss"
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { options } from '../src/plugins/vuetify.ts'

Vue.use(Vuetify)
const vuetify = new Vuetify(options)

export const decorators = [
  (story, context) => {
    const wrapped = story(context)
    return Vue.extend({
      vuetify,
      components: { wrapped },
      template: `
        <v-app>
          <wrapped />
        </v-app>
      `
    })
  }
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: 'fullscreen'
}
