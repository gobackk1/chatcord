import axios from 'axios'
import { AUTH_API_ORIGIN } from '@/constant'

const authAxios = axios.create({
  baseURL: `${AUTH_API_ORIGIN}/`
})

export { authAxios }
