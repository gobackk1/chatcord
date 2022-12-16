import axios, { AxiosRequestTransformer } from 'axios'
import { AUTH_API_ORIGIN, FIREBASE_CONFIG, FIRESTORE_API_ORIGIN } from '@/constant'
import Firebase from '@/plugins/firebase'

const authAxios = axios.create({
  baseURL: `${AUTH_API_ORIGIN}/`
})

const firestoreAxios = axios.create({
  baseURL: `${FIRESTORE_API_ORIGIN}/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/documents/`,
  transformRequest: [
    /**
     * NOTE:
     * JSONがObjectにならないよう、defaults.transformRequest より前に実行する。
     */
    (data: any) => {
      const fields: { [key: string]: { [key: string]: any } } = {}
      for (const [key, value] of Object.entries<any>(data)) {
        const valueType = getType(value)
        fields[key] = {
          [`${valueType}`]: value
        }
      }
      return { fields }
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[])
  ]
})
firestoreAxios.interceptors.request.use(
  async config => {
    const token = await Firebase.getToken()
    config.headers!.Authorization = `Bearer ${token}`
    return config
  },
  error => {
    return new Error(error.message)
  }
)

const getType = (value: any) => {
  if (typeof value === 'number') return 'numberValue'
  return 'stringValue'
}

export { authAxios, firestoreAxios }
