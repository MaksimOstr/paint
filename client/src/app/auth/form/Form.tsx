"use client";

import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "./formSchema";
import { IUserAuth } from "@/lib/types/auth.types";
import { useLoginMutation } from "@/lib/services/auth.service";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export const Form: React.FC = () => {
  const { push } = useRouter();
  const [login] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserAuth>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IUserAuth> = async (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        localStorage.setItem("accessToken", res.access_token);
        toast.success("You've successfully logged in!");
        push("/main");
      })
      .catch(() => {
        toast.error("Incorrect email or password!");
      });
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
          name="email"
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              helperText={errors.email?.message}
              error={!!errors.email}
              size="medium"
              {...field}
              fullWidth
              variant="outlined"
              placeholder="Enter an email"
            />
          )}
        />
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
        <Button size="large" fullWidth variant="outlined" type="submit">
          Sing In
        </Button>
      </Stack>
    </form>
  );
};
