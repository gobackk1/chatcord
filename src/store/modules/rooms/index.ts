import { Module } from 'vuex'
import state from './state'
import { RoomsState } from './types'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { RootState } from '@/store/types'

const namespaced = true

export const rooms: Module<RoomsState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
