"use client";

import { Box, Divider, Link, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Form } from "./form/Form";
import { formBodyProps } from "./auth.styles";
import { GoogleAuthButton } from "./components/googleAuthButton";


export const Auth = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={formBodyProps} elevation={6}>
        <Typography mb={3} variant="h4" textAlign="center">
          SignIn
        </Typography>
        <Stack spacing={1}>
          <Stack spacing={2}>
            <Form />
            <Stack
              spacing={1}
              direction="row"
              display="flex"
              justifyContent="center"
            >
              <Typography variant="body2">Dont you have an account?</Typography>
              <Link variant="body2" href="/signUp">Sign up</Link>
            </Stack>
          </Stack>
          <Stack spacing={1.5}>
            <Divider>
              <Typography margin="0 7px" variant="body2" color="textSecondary">
                OR
              </Typography>
            </Divider>
            <GoogleAuthButton />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
