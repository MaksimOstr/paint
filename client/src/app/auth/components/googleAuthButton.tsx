'use client'

import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

export const GoogleAuthButton = () => {
  const { push } = useRouter();

  return (
    <Button
      onClick={() => push("http://localhost:4000/api/auth/google/login")}
      size="large"
      variant="outlined"
      startIcon={
        <Box component="img" src="googleIcon.png" width="20px" height="20px" />
      }
    >
      Log in via Google
    </Button>
  );
};
