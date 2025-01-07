import { Box } from '@mui/material'
import React from 'react'
import { SavedArts } from './savedArts'

export const Page = () => {
  return (
    <Box
        width='100%'
        height='100%'
        mt={3}
    >
        <SavedArts/>
    </Box>
  )
}

export default Page
