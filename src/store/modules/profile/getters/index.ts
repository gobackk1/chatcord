import { GetterTree } from 'vuex'
import { ProfileState } from '../types'
import { RootState } from '@/store/types'

const getters: GetterTree<ProfileState, RootState> = {
  uid({ loginUser }): string {
    return loginUser ? loginUser.uid : ''
  }
}

export default getters
