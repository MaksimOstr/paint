import { globalApi } from "@/api/globalApi";
import { IDrawing } from "@/types/drawing.types";

export const drawingService = globalApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        saveDrawing: builder.mutation<IDrawing, FormData>({
            query: (body) => ({
                url: 'drawing/save',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Drawing']
        }),
        getDrawings: builder.query<IDrawing[], void>({
            query: () => '/drawing',
            providesTags: ['Drawing']
        }),

        deleteDrawing: builder.mutation<void, { id: string }>({
            query: (body) => ({
                url: 'drawing/delete',
                method: 'DELETE',
                body
            }),
            invalidatesTags: ['Drawing']
        })
    })
})

export const {  useSaveDrawingMutation, useGetDrawingsQuery, useDeleteDrawingMutation } = drawingService