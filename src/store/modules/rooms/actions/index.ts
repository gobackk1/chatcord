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
          [`_${rootGetters['profile/uid']}`]: 'admin'
        }
      }
      const { data } = await firestoreAxios.post('documents/rooms', room)
      commit('ADD_ROOM', data)
    } catch (error) {
      throw new Error(error.message)
    }
  },
  async fetchRooms({ commit, rootGetters }): Promise<void> {
    try {
      const structuredQuery = {
        from: [
          {
            collectionId: 'rooms'
          }
        ],
        where: {
          fieldFilter: {
            field: {
              fieldPath: `members._${rootGetters['profile/uid']}`
            },
            op: 'IN',
            value: {
              arrayValue: {
                values: [{ stringValue: 'admin' }, { stringValue: 'member' }]
              }
            }
          }
        }
      }

      const response = await firestoreAxios.post('documents:runQuery', { structuredQuery })
      if (!response.data.length) return
      response.data.forEach((data: RoomType) => {
        commit('ADD_ROOM', data)
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default actions
