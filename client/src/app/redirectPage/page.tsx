'use client'

import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'

export const Page = () => {

    const { push } = useRouter()
    const urlParams = useSearchParams()

    useEffect(() => {
        const token = urlParams.get("token");
        if (token) {
          localStorage.setItem('accessToken', token)
          push('/main')
        }
      }, [push, urlParams]);

  return (
    <Box
        width='100vw'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
    >
        <Typography variant='h6'>
            Processing authentication...
        </Typography>
    </Box>
  )
}

export default Page