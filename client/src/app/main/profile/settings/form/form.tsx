"use client";

import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetUserProfileQuery } from "@/services/auth.service";
import { IUpdateForm } from "./formType";
import { useUpdateUserMutation } from "@/services/user.service";


export const Form: React.FC = () => {
  
  const { data } = useGetUserProfileQuery()
  const [updateUser] = useUpdateUserMutation()

  const {

    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateForm>({
    defaultValues: {
      username: "",
      profileLogo: null
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      username: data?.username
    })
  }, [data, reset])

  const onSubmit: SubmitHandler<IUpdateForm> = async (data) => {
    console.log(data)
    updateUser(data)
    .unwrap()
    .then(() => {
      console.log('успешно')
    })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        spacing={2}
        display='flex'
        alignItems='start'
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
              label={field.name}
              {...field}
              fullWidth
              variant="outlined"
              placeholder="Enter username"
            />
          )}
        />
        <Button size="large" variant="outlined" type="submit">
          Save
        </Button>
      </Stack>
    </form>
  );
};
