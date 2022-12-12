import MyButton from './button.vue'

export default {
  title: 'my/Button',
  component: MyButton
}

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MyButton },
  template: '<my-button text="check" />'
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
// Primary.args = {
//   primary: true,
//   label: 'Button'
// }
