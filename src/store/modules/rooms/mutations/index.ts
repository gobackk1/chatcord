import { MutationTree } from 'vuex'
import { RoomsState, Cc_Room } from '../types'

const mutations: MutationTree<RoomsState> = {
  ADD_ROOM(state, payload: Cc_Room) {
    state.rooms.push(payload)
  }
}

export default mutations
