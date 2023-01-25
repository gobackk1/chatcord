import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import state from './state'
import { profile } from './modules/profile'
import { rooms } from './modules/rooms'
import { RootState } from './types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state,
  modules: {
    profile,
    rooms
  }
}

export default new Vuex.Store<RootState>(store)
