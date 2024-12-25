'use client'

import { IAuthForm } from '@/types/auth.types'
import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { formSchema } from './formSchema'



export const Form: React.FC = () => {
    const { control, handleSubmit, formState: { errors } } = useForm<IAuthForm>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(formSchema),
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IAuthForm> = (data) => console.log(data)

  return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack display='flex' justifyContent='center' alignItems='center' spacing={2}>
                <Controller
                    control={control}
                    name='username'
                    rules= {{ required: true }}
                    render={({ field }) => (
                        <TextField
                            helperText={errors.username?.message}
                            error={ !!errors.username }
                            size='medium'
                            {...field}
                            fullWidth
                            variant='outlined' 
                            placeholder='Enter username'/>
                    )}
                />
                <Controller
                    control={control}
                    name='password'
                    rules= {{ required: true }}
                    render={({ field }) => (
                        <TextField
                            helperText={errors.password?.message}
                            error={ !!errors.password }
                            {...field}
                            size='medium'
                            variant='outlined' 
                            fullWidth  
                            placeholder='Enter your password'/>
                    )}
                />
                
                <Button size='large' fullWidth variant='outlined' type='submit'>Sing In</Button>
            </Stack>
        </form>
  )
}
