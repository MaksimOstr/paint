import { globalApi } from '@/api/globalApi'
import { AuthRequest, IUserAuth } from '@/types/auth.types'




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
    })
})

export const { useLoginMutation } = authService
