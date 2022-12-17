import { MutationTree } from 'vuex'
import { RoomsState, RoomType } from '../types'

const mutations: MutationTree<RoomsState> = {
  ADD_ROOM(state, payload: RoomType) {
    state.rooms.push(payload)
  }
}

export default mutations
