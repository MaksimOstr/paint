import { globalApi } from "@/api/globalApi";
import { ICreateRoomResponse, IDeleteRoomRequest } from "@/types/room.types";

export const roomService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createRoom: builder.mutation<ICreateRoomResponse, void>({
            query: () => ({
                url: '/room/create',
                method: 'POST'
            })
        }),
        
        deleteRoom: builder.mutation<void, IDeleteRoomRequest>({
            query: (body) => ({
                url: '/room/delete',
                method: 'DELETE',
                body
            })
        })
    })
})


export const { useCreateRoomMutation, useDeleteRoomMutation } = roomService