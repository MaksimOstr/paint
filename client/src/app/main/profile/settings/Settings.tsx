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
      <Paper>
        <img src='https://lh3.googleusercontent.com/a/ACg8ocLi-iaE1Elyx_qG3V-mv-aqteSRitMT9qcmFPeYaWxWvbAlwQ=s96-c'/>
        <Form/>
      </Paper>
    </Box>
  )
}
