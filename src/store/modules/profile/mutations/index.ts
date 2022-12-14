import { MutationTree } from 'vuex'
import { ProfileState, Cc_User } from '../types'

const mutations: MutationTree<ProfileState> = {
  SET_LOGIN_USER(state, user: Cc_User) {
    state.loginUser = user
  }
}

export default mutations
