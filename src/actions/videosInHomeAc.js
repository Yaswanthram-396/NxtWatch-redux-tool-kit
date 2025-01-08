import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import LoginPage from "../LoginPage";

// const cookieToken = Cookies.get("jwt_token");
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apis.ccbp.in",
    // prepareHeaders: (headers) => {
    //   if (cookieToken) {
    //     headers.set("Authorization", `Bearer ${cookieToken}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ["Get"],
  endpoints: (build) => ({
    LoginPage: build.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: JSON.stringify(credentials),
      }),
      // Handle successful response
      transformResponse: (response) => {
        if (response.jwt_token) {
          Cookies.set("jwt_token", response.jwt_token, { expires: 0.1 });
        }
        return response;
      },
      // Better error handling
      transformErrorResponse: (error) => ({
        status: error.status,
        data: error.data || { error_msg: "An unexpected error occurred" },
      }),
    }),
    videosInHome: build.query({
      query: (result) => ({
        url: `/videos/all?search=${result.searchInput}`,
        method: "GET",
        // headers.set("Authorization", `Bearer ${cookieToken}`);
        headers: {
          Authorization: `Bearer ${result.cookieToken}`,
        },
      }),
      transformResponse: (response) => {
        return {
          data: response,
        };
      },
      transformErrorResponse: (error) => {
        return {
          error: error.status,
        };
      },
    }),
    videosInTrending: build.query({
      query: (cookieToken) => ({
        url: "videos/trending",
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      }),
      transformResponse: (response) => {
        return {
          data: response,
        };
      },
      transformErrorResponse: (error) => {
        return {
          error: error.status,
        };
      },
    }),
    videosInGaming: build.query({
      query: (cookieToken) => ({
        url: "videos/gaming",
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`,
        },
      }),
      transformResponse: (response) => {
        return {
          data: response,
        };
      },
      transformErrorResponse: (error) => {
        return {
          error: error.status,
        };
      },
    }),
  }),
});

export const {
  useVideosInHomeQuery,
  useVideosInTrendingQuery,
  useVideosInGamingQuery,
  useLoginPageMutation,
} = api;
