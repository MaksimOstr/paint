import { globalApi } from '../api/globalApi'
import { AuthRequest } from "@/lib/types/auth.types";



export const userService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        updateUser: builder.mutation<AuthRequest, FormData>({
            query: (body) => ({
                url: 'user/updateUser',
                method: 'PATCH',
                body,
            }),
            invalidatesTags: ['User'],
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    localStorage.setItem('accessToken', data.access_token);
                    
                    dispatch(globalApi.util.invalidateTags(['User']));
                } catch (err) {
                    console.error(err);
                }
            },
        }),
    })
})

export const { useUpdateUserMutation } = userService