import { User } from 'firebase/auth'

export interface ProfileState {
  loginUser: User | null
  publicData: any
}

export type UserType = User | null
