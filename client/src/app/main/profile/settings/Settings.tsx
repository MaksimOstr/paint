import { Box, Paper } from '@mui/material'
import React from 'react'
import { Form } from './form/form'

export const Settings = () => {
  return (
    <Box
      width='100%'
      height='100%'
      display='flex'
      justifyContent='center'
      alignItems='center'
    >
      <Paper sx={{ p: 2, borderRadius: '15px' }} elevation={6}>
        <Form/>
      </Paper>
    </Box>
  )
}
