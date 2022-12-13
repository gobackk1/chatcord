import { User } from 'firebase/auth'

export interface ProfileState {
  loginUser: User | null
}

export type Cc_User = User | null
