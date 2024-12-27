"use client";

import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./formSchema";
import { ISignUpForm } from "@/types/signUp.types";
import { useCreateAccountMutation } from "@/services/signUp.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const Form: React.FC = () => {

  const [createUser] = useCreateAccountMutation()
  const { push } = useRouter()
  
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

  const onSubmit: SubmitHandler<ISignUpForm> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...userData } = data
    createUser(userData)
    .unwrap()
    .then(() => {
      toast.success('New user was successfully registered!')
      push('/auth')
    })
    .catch(err => {
      toast.error(err.data.message)
    })
  };

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
