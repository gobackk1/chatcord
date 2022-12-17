import { User } from 'firebase/auth'

export interface ProfileState {
  loginUser: User | null
}

export type UserType = User | null
