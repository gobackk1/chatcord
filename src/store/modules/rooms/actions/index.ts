import { ActionTree } from 'vuex'
import { RoomsState, RoomType } from '../types'
import { RootState } from '@/store/types'
import { firestoreAxios } from '@/plugins/axios'

const actions: ActionTree<RoomsState, RootState> = {
  async createRoom({ commit, rootGetters }, name: string): Promise<void> {
    try {
      const room: Partial<RoomType> = {
        name,
        displayName: name,
        members: {
          [rootGetters['profile/uid']]: 'admin'
        }
      }
      const { data } = await firestoreAxios.post('/rooms', room)
      commit('ADD_ROOM', data)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async fetchRooms({ commit }): Promise<void> {
    try {
      const response = await firestoreAxios.get('/rooms')

      response.data.forEach((data: RoomType) => {
        commit('ADD_ROOM', data)
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default actions
