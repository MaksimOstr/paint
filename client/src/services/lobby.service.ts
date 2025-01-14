import { globalApi } from "@/api/globalApi";
import { ISaveLobbyCanvas } from "@/types/drawing.types";
import { ICreateRoomResponse } from "@/types/room.types";

export const roomService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createRoom: builder.mutation<ICreateRoomResponse, void>({
            query: () => ({
                url: '/lobby/create',
                method: 'POST'
            })
        }),
        saveLobbyCanvas: builder.mutation<void, ISaveLobbyCanvas>({
            query: (body) => ({
                url: 'lobby/image',
                method: 'POST',
                body: body.formData,
                headers: {
                    'roomId': body.roomId
                }
            })
        }),
        getLobbyCanvas: builder.query<string, string>({
            query: (body) => `lobby/getCanvas/${body}`
        })
    })
})


export const { useCreateRoomMutation, useSaveLobbyCanvasMutation, useLazyGetLobbyCanvasQuery } = roomService