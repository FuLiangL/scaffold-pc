// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from 'chai'
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallowMount } from '@vue/test-utils'
// eslint-disable-next-line import/no-unresolved
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    })
    expect(wrapper.text()).to.include(msg)
  })
})
