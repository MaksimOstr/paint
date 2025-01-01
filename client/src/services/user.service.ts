import { globalApi } from "@/api/globalApi";
import { IUpdateForm } from "@/app/main/profile/settings/form/formType";


export const userService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        updateUser: builder.mutation<void,  IUpdateForm>({
            query: (body) => ({
                url: 'user/updateUser',
                method: 'PATCH',
                body
            })
        })
    })
})

export const { useUpdateUserMutation } = userService