'use client'

import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { Form } from './form/Form'
import { formBodyProps } from './auth.styles'
import { useRouter } from 'next/navigation'


export const Auth = () => {

  const { push } = useRouter()

  return (
    <Box
        width='100vw'
        height='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
    >
        <Paper 
            sx={formBodyProps}
            elevation={6}
            
        >
            <Stack spacing={3}>
              <Typography variant='h4' textAlign='center'>
                SignIn
              </Typography>
            <Form/>
              <Stack>
                <Stack spacing={1.5}>
                <Divider>
                  <Typography margin='0 10px' variant='body2' color='textSecondary'>
                    OR
                  </Typography>
                </Divider>
                <Button 
                  onClick={() => push('http://localhost:4000/api/auth/google/login')}
                  size='large'
                  variant='outlined'
                  startIcon={
                    <Box 
                      component='img'
                      src='googleIcon.png'
                      width='20px'
                      height='20px'/>
                  }>
                  Log in via Google
                </Button>
                </Stack>
              </Stack>
            </Stack>

        </Paper>
    </Box>
  )
}
