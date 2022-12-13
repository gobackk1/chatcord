import { mount, Wrapper } from '@vue/test-utils'
import Cc_FieldEmail from './index.vue'
import Vuetify from 'vuetify'

describe('Cc_FieldEmail', () => {
  let wrapper: Wrapper<Vue, Element>, vuetify: Vuetify
  beforeEach(() => {
    vuetify = new Vuetify()
    wrapper = mount(Cc_FieldEmail, {
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
      const emitted = wrapper.emitted()
      if (emitted.input === undefined) {
        throw new Error('failed')
      } else {
        expect(emitted.input.length).toBe(1)
        expect(emitted.input[0][0]).toBe('test')
      }
    })
    test('未入力の場合、「メールアドレスは必須です。」が表示されること', async () => {
      const input = wrapper.find('input')
      await input.trigger('focus')
      await input.trigger('blur')
      expect(wrapper.text()).toContain('メールアドレスは必須です。')
    })
    /**
     * メールアドレスのバリデーションはE2Eでテストする
     */
    // describe('メールアドレスのバリデーション', () => {})
  })
})
