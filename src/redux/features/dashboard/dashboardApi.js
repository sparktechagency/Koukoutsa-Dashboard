import { baseApi } from "../../baseApi/baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatusAll: builder.query({
      query: () => ({
        url: "/users/dashboard/status",
        method: "GET",
      }),
    }),
    getDashboardStatus: builder.query({
      query: () => ({
        url: "/get-dashboard-data",
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getIncomeRatio: builder.query({
      query: (year) => ({
        url: `/paymnet/income-statistics`,
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),
    getAllResentUsers: builder.query({
      query: () => ({
        url: "/users/recent/users",
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),


    getUserAndIncome: builder.query({
      query: () => ({
        url: "/paymnet/totaluser-and-totalIncome",
        method: "GET",
      }),
      transformResponse: (response) => response,
    }),


  }),
});

export const { useGetDashboardStatusAllQuery, useGetDashboardStatusQuery, useGetIncomeRatioQuery, useGetAllResentUsersQuery , useGetUserAndIncomeQuery } =
  dashboardApi;
