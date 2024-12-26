'use client'

import { Button, Stack, TextField } from '@mui/material'
import React from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import { formSchema } from './formSchema'
import { IUserAuth } from '@/types/auth.types'
import { useLoginMutation } from '@/services/auth.service'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/hooks/rtkHooks'
import { setAccessToken } from '@/slices/auth.slice'



export const Form: React.FC = () => {

    const { push } = useRouter()
    const [login] = useLoginMutation()
    const dispatch = useAppDispatch()

    const { control, handleSubmit, formState: { errors } } = useForm<IUserAuth>({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: yupResolver(formSchema),
        mode: 'onChange'
    })

    const onSubmit: SubmitHandler<IUserAuth> = async (data) => {
        login(data)
        .unwrap()
        .then(result => {
            dispatch(setAccessToken(result.access_token))
            push('/')
        })
        .catch(error => {
            console.log(error)
        })
    }

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
