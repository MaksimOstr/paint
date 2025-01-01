import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { Form } from "./form/signUpForm";
import { formBodyProps } from "./signUp.styles";

export const SignUp = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Paper sx={formBodyProps} elevation={6}>
        <Stack spacing={3}>
          <Typography variant="h4" textAlign="center">
            SignUp
          </Typography>
          <Form />
        </Stack>
        <Stack
              mt={3}
              spacing={1}
              direction="row"
              display="flex"
              justifyContent="center"
            >
              <Typography variant="body2">You already have an account?</Typography>
              <Link variant="body2" href="/auth">Sign in</Link>
            </Stack>
      </Paper>
    </Box>
  );
};
