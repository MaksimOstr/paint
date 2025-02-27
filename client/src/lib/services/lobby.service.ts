import { globalApi } from '../api/globalApi'
import { ISaveLobbyCanvas } from "@/lib/types/drawing.types";
import { ICreateRoomResponse } from "@/lib/types/room.types";

export const lobbyService = globalApi.injectEndpoints({
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
        getLobbyCanvas: builder.query<{filePath: string}, string>({
            query: (body) => `lobby/getCanvas/${body}`
        })
    })
})


export const { useCreateRoomMutation, useSaveLobbyCanvasMutation, useLazyGetLobbyCanvasQuery } = lobbyService