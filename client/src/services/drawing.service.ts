import { globalApi } from "@/api/globalApi";
import { ISaveDrawing } from "@/types/drawing.types";

export const drawingService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        saveDrawing: builder.mutation<void, ISaveDrawing>({
            query: (body) => ({
                url: 'drawing/save',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Drawing']
        }),
        getDrawings: builder.query<void, void>({
            query: () => '/drawing',
            providesTags: ['Drawing']
        })
    })
})

export const {  useSaveDrawingMutation, useGetDrawingsQuery } = drawingService