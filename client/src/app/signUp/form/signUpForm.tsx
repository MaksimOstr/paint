'use client'

import { IAuthForm } from "@/types/auth.types";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./formSchema";
import { ISignUpForm } from "@/types/signUp.types";

export const Form: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpForm>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IAuthForm> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Controller
          control={control}
          name="username"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              helperText={errors.username?.message}
              error={!!errors.username}
              size="medium"
              {...field}
              fullWidth
              variant="outlined"
              placeholder="Enter username"
            />
          )}
        />
        <Stack direction="row" spacing={1} width="100%">
          <Controller
            control={control}
            name="password"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                helperText={errors.password?.message}
                error={!!errors.password}
                {...field}
                size="medium"
                variant="outlined"
                fullWidth
                placeholder="Enter your password"
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                helperText={errors.confirmPassword?.message}
                error={!!errors.confirmPassword}
                {...field}
                size="medium"
                variant="outlined"
                fullWidth
                placeholder="Repeat your password"
              />
            )}
          />
        </Stack>

        <Button size="large" fullWidth variant="outlined" type="submit">
          Sing Up
        </Button>
      </Stack>
    </form>
  );
};
