import { globalApi } from '@/api/globalApi'
import { AuthRequest, IUser, IUserAuth } from '@/types/auth.types'




export const authService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        login: builder.mutation<AuthRequest, IUserAuth>({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body
            }),
        }),
        getUserProfile: builder.query<IUser, void>({
            query: () => 'auth/profile'
        })
    })
})

export const { useLoginMutation, useGetUserProfileQuery } = authService
