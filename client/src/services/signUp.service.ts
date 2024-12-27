import { globalApi } from "@/api/globalApi";
import { IUserAuth } from "@/types/auth.types";

export const signUpService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createAccount: builder.mutation<void, IUserAuth>({
            query: (body) => ({
                url: 'user/create',
                method: 'POST',
                body
            })
        })
    })
})

export const { useCreateAccountMutation } = signUpService