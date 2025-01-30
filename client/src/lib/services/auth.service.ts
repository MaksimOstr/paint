import { globalApi } from '../api/globalApi'
import { AuthRequest, IUserAuth } from '@/lib/types/auth.types'
import { IUser } from '@/lib/types/user.types'




export const authService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        login: builder.mutation<AuthRequest, IUserAuth>({
            query: (body) => ({
                url: `auth/login`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['User']
        }),
        getUserProfile: builder.query<IUser, void>({
            query: () => 'auth/profile',
            providesTags: ['User'],
        }),
        logout: builder.mutation<void, void>({
            query: () => 'auth/logout',
        })
    })
})

export const { useLoginMutation, useGetUserProfileQuery, useLogoutMutation } = authService
