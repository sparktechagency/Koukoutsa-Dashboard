import { baseApi } from "../../baseApi/baseApi";


const subScriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubScription: builder.query({
            query: () => ({
                url: `/subscription`, // ✅ Fixed API URL
                method: "GET",
            }),
            providesTags: ["Subscription"],
        }),
        createSubScription: builder.mutation({
            query: (formData) => ({
                url: `/subscription`, // ✅ Fixed API URL
                method: "POST",
                body: formData,

            }),
            invalidatesTags: ["Subscription"],
        }),
        updateScription: builder.mutation({
            query: ({ id, data }) => ({
                url: `/subscription/${id}`, // ✅ Fixed API URL
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["Subscription"],
        }),

        deleteSubScription: builder.mutation({
            query: (id) => ({
                url: `/subscription/${id}`, // ✅ Fixed API URL
                method: "DELETE",
            }),
            invalidatesTags: ["Subscription"],
        }),
    }),
});

export const { useGetSubScriptionQuery, useCreateSubScriptionMutation, useUpdateScriptionMutation, useDeleteSubScriptionMutation } = subScriptionApi;
