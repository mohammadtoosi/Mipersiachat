import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const chatApi = createApi({
    reducerPath: "chatFetch",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://dash.viras.ir:8500",
    }),
    endpoints: (builder) => ({
        getChat: builder.query({
            query: () => `/chat/chat/`,
        }),
    }),
});

export const { useGetChatQuery } = chatApi;