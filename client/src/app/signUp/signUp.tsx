import { Box, Paper, Stack, Typography } from "@mui/material";
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
      </Paper>
    </Box>
  );
};
