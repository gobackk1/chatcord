import { MutationTree } from 'vuex'
import { ProfileState, UserType } from '../types'

const mutations: MutationTree<ProfileState> = {
  SET_LOGIN_USER(state, user: UserType) {
    state.loginUser = user
  },
  SET_PUBLIC_DATA(state, publicData) {
    state.publicData = publicData
  }
}

export default mutations
