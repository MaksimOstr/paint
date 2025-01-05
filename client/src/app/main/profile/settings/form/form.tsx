'use client';

import { Avatar, Button, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useGetUserProfileQuery } from "@/services/auth.service";
import { IUpdateForm } from "./formType";
import { useUpdateUserMutation } from "@/services/user.service";
import { toast } from "react-toastify";

export const Form: React.FC = () => {
  const { data } = useGetUserProfileQuery();
  const [updateUser] = useUpdateUserMutation();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdateForm>({
    defaultValues: {
      username: "",
      profileLogo: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      username: data?.username,
    });
  }, [data, reset]);
  
  const handleFileChange = (fileList: FileList | null) => {
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const previewURL = URL.createObjectURL(file);
      setAvatarPreview(previewURL);
      setValue("profileLogo", fileList);
    }
  };

  const onSubmit: SubmitHandler<IUpdateForm> = (submitData) => {

    const formData = new FormData();
    formData.append("username", submitData.username);
    if (submitData.profileLogo && submitData.profileLogo.length !== 0) {
      const previewURL = URL.createObjectURL(submitData.profileLogo[0]);
      setAvatarPreview(previewURL);
      formData.append("profileLogo", submitData.profileLogo[0]);
    }
    
    updateUser(formData)
      .unwrap()
      .catch(() => {
        toast.error("An error has occurred!");
      })
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} display="flex" alignItems="start">
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
        <Stack direction='row' alignItems='center' spacing={2}>
          {avatarPreview ? (
            <Avatar
              src={avatarPreview}
              alt="Avatar Preview"
              sx={{
                width: 70,
                height: 70,
              }}
            />
          ) : (
            ""
          )}
          <input
            type="file"
            onChange={(e) => handleFileChange(e.target.files)}
            accept="image/*"
          />
        </Stack>
        <Button size="large" variant="outlined" type="submit">
          Change
        </Button>
      </Stack>
    </form>
  );
};
