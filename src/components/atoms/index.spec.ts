import { mount } from '@vue/test-utils'
import CcButton from './button.vue'
import Vuetify from 'vuetify'

describe('HelloWorld.vue', () => {
  test('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = mount(CcButton, {
      vuetify: new Vuetify(),
      propsData: { text: msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
