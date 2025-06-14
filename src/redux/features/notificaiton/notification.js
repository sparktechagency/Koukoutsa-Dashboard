import { baseApi } from "../../baseApi/baseApi";


const notificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getNotification: builder.query({
            query: () => {
                return {
                    url: "/notification/all",
                };
            },
            providesTags: ["Notification"],
        }),
        readNotification: builder.mutation({
            query: (id) => {
                return {
                    url: `/notification/${id}`,
                    method: "PATCH",
                };
            },
            invalidatesTags: ["Notification"],
        }),
    }),
});

export const { useGetNotificationQuery, useReadNotificationMutation } = notificationApi;