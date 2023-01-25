import { ActionTree } from 'vuex'
import { ProfileState } from '../types'
import { RootState } from '@/store/types'

const actions: ActionTree<ProfileState, RootState> = {
  setLoginUser: ({ commit }, user) => {
    commit('SET_LOGIN_USER', user)
  },
  setPublicData: ({ commit }, publicData) => {
    commit('SET_PUBLIC_DATA', publicData)
  }
}

export default actions
