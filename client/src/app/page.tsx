"use client";

import ThemeToggleButton from "@/components/ui/ThemeToggle";
import { Box, Button } from "@mui/material";
import { useAppDispatch } from "@/hooks/rtkHooks";
import { setAccessToken } from "@/slices/auth.slice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      dispatch(setAccessToken(token));
      window.location.href = "http://localhost:3000";
    }
  }, []);

  return (
    <Box>
      <ThemeToggleButton />
      <Button variant="outlined">creaste</Button>
    </Box>
  );
}
