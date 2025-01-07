import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://apis.ccbp.in",
    prepareHeaders: (headers) => {
      const cookieToken = Cookies.get("jwt_token");
      if (cookieToken) {
        headers.set("Authorization", `Bearer ${cookieToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Get"],
  endpoints: (build) => ({
    videosInHome: build.query({
      query: (searchInput = "") => ({
        url: `/videos/all?search=${searchInput}`,
        method: "GET",
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

export const { useVideosInHomeQuery } = api;
