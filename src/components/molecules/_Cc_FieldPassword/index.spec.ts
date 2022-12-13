import { mount, Wrapper } from '@vue/test-utils'
import Cc_FieldPassword from './index.vue'
import Vuetify from 'vuetify'

describe('Cc_FieldPassword', () => {
  let wrapper: Wrapper<Vue, Element>, vuetify: Vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Cc_FieldPassword, {
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
    test('未入力の場合、「パスワードは必須です。」が表示されること', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('blur')
      expect(wrapper.text()).toContain('パスワードは必須です。')
    })
    test('toggleShow', async () => {
      const input = wrapper.find('input')
      const showPassButton = wrapper.find('button')
      expect(input.attributes().type).toBe('password')
      await showPassButton.trigger('click')
      expect(input.attributes().type).toBe('text')
      await showPassButton.trigger('click')
      expect(input.attributes().type).toBe('password')
    })
    /**
     * パスワードのバリデーションはE2Eでテストする
     */
    // describe('パスワードのバリデーション', () => {})
  })
})
