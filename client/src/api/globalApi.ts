import { AuthRequest } from '@/types/auth.types'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../shared/constants'


const baseQuery = fetchBaseQuery({
    baseUrl: `${API_URL}/api`,
    credentials: 'include',
    prepareHeaders(headers) {
        console.log('отработало и токен изменился')
        const token = localStorage.getItem('accessToken')
        if(token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery('auth/refresh', api, extraOptions) as QueryReturnValue<AuthRequest, FetchBaseQueryError, FetchBaseQueryMeta>
    if (refreshResult.data) {

      localStorage.setItem('accessToken', refreshResult.data.access_token)

      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const globalApi = createApi({
    reducerPath: 'globalApi',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
    tagTypes: ['User']
})