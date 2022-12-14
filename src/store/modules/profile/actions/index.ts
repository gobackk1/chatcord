import { ActionTree } from 'vuex'
import { ProfileState } from '../types'
import { RootState } from '@/store/types'

const actions: ActionTree<ProfileState, RootState> = {
  setLoginUser: ({ commit }, user) => {
    commit('SET_LOGIN_USER', user)
  }
}

export default actions
