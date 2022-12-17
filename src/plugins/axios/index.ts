import axios, { AxiosRequestTransformer, AxiosResponseTransformer } from 'axios'
import { AUTH_API_ORIGIN, FIREBASE_CONFIG, FIRESTORE_API_ORIGIN } from '@/constant'
import Firebase from '@/plugins/firebase'

const authAxios = axios.create({
  baseURL: `${AUTH_API_ORIGIN}/`
})

const firestoreAxios = axios.create({
  baseURL: `${FIRESTORE_API_ORIGIN}/v1/projects/${FIREBASE_CONFIG.projectId}/databases/(default)/`,
  transformRequest: [
    /**
     * NOTE:
     * JSONがObjectにならないよう、defaults.transformRequest より前に実行する。
     */
    (data: any) => {
      if (data === undefined) return
      console.log('transformRequest data', data)
      if (data.structuredQuery) {
        return data
      } else {
        const fields: { [key: string]: { [key: string]: any } } = {}
        for (const [key, value] of Object.entries<any>(data)) {
          const valueType = getType(value)

          if (valueType === 'mapValue') {
            // NOTE: ※1
            for (const [innerKey, innerValue] of Object.entries<any>(value)) {
              const innerValueType = getType(innerValue)
              fields[key] = {
                [`${valueType}`]: {
                  fields: {
                    [innerKey]: {
                      [innerValueType]: innerValue
                    }
                  }
                }
              }
            }
          } else {
            fields[key] = {
              [`${valueType}`]: value
            }
          }
        }
        return { fields }
      }
    },
    ...(axios.defaults.transformRequest as AxiosRequestTransformer[])
  ],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
    (data: any) => {
      console.log('transformResponse data', data)
      if (Array.isArray(data)) {
        if (data.length === 1 && data[0].readTime) {
          // NOTE: クエリ結果が空で readTime しか入ってない場合はリターンする
          return []
        } else {
          return data.map(({ document }: any) => transformResponseDocument(document))
        }
      } else if (data.documents) {
        return data.documents.map((document: any) => transformResponseDocument(document))
      } else if (!Object.keys(data).length) {
        return data
      } else {
        return transformResponseDocument(data)
      }
    }
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
  if (value === 'REQUEST_TIME') return 'timestampValue'
  if (typeof value === 'number') return 'numberValue'
  if (typeof value === 'object') return 'mapValue'
  return 'stringValue'
}

const transformResponseDocument = (document: any) => {
  const doc: { [key: string]: any } = { ...document }

  doc.id = document.name.match(/.*\/(.*)$/)[1]
  delete doc.name

  for (const [key, value] of Object.entries<any>(document.fields)) {
    if (value.mapValue) {
      // NOTE: ※1
      for (const [innerKey, innerValue] of Object.entries<any>(value.mapValue.fields)) {
        doc[key] = {
          [innerKey]: Object.values(innerValue)[0]
        }
      }
    } else {
      doc[key] = Object.values(value)[0]
    }
  }
  delete doc.fields

  return doc
}

/**
 * ※1: mapは１段目のみ対応。
 */

export { authAxios, firestoreAxios }
