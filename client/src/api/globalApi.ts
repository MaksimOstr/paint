import { RootState } from '@/store'
import { AuthRequest } from '@/types/auth.types'
import { Action, PayloadAction } from '@reduxjs/toolkit'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta, QueryReturnValue } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'




const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    credentials: 'include',
    prepareHeaders(headers) {
        const token = localStorage.getItem('accessToken')
        if(token) {
            headers.set('authorization', `Bearer ${token}`)
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
      // store the new token
      localStorage.setItem('accessToken', refreshResult.data.access_token)
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE
}

export const globalApi = createApi({
    reducerPath: 'globalApi',
    baseQuery: baseQueryWithReauth,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractRehydrationInfo(action, { reducerPath }): any {
      if (isHydrateAction(action)) {
        return action.payload[reducerPath]
      }
    },
    endpoints: () => ({})
})