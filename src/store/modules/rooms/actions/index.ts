import { ActionTree } from 'vuex'
import { RoomsState } from '../types'
import { RootState } from '@/store/types'
import { firestoreAxios } from '@/plugins/axios'

const actions: ActionTree<RoomsState, RootState> = {
  async createRoom({ commit }, name: string): Promise<void> {
    await firestoreAxios.post('/rooms', {
      name
    })
    commit('ADD_ROOM', { name })
    try {
      console.log('')
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default actions
