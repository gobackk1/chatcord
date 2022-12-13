import { mount, Wrapper } from '@vue/test-utils'
import Cc_FieldUserName from './index.vue'
import Vuetify from 'vuetify'

describe('Cc_FieldUserName', () => {
  let wrapper: Wrapper<Vue, Element>, vuetify: Vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Cc_FieldUserName, {
      vuetify,
      attachTo: document.body
    })
  })
  describe('props', () => {
    test('value', async () => {
      const input = wrapper.find('input')
      await input.setValue('test')
      expect((input.element as HTMLInputElement).value).toBe('test')
    })
  })
  describe('event', () => {
    test('emit', async () => {
      const input = wrapper.find('input')
      await input.setValue('test')
      expect(wrapper.emitted().input!.length).toBe(1)
      expect(wrapper.emitted().input![0][0]).toBe('test')
    })
    test('未入力の場合、「ユーザー名は必須です。」が表示されること', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('blur')
      expect(wrapper.text()).toContain('ユーザー名は必須です。')
    })
  })
})
