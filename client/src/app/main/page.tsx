"use client";

import { useGetUserProfileQuery } from "@/services/auth.service";
import { Box } from "@mui/material";
import React, { useEffect } from "react";

export const Page = () => {
    
  const { data, isLoading } = useGetUserProfileQuery();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem('accessToken', token)
      window.location.href = "http://localhost:3000/main";
    }
  }, []);

  return <Box>{isLoading ? "" : data?.username}</Box>;
};

export default Page;
