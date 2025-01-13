'use client'

import { Paper, Stack } from '@mui/material'
import React from 'react'
import ThemeToggleButton from './ThemeToggle'
import UserProfileMenu from './userPorfileMenu'
import { useAppSelector } from '@/hooks/rtkHooks'

export const LayoutComponent = () => {

  const roomId = useAppSelector(state => state.lobby.roomId)

  return (
    <Paper elevation={6} sx={{ position: 'absolute', right: '20px', top: '20px', borderRadius: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Stack spacing={1.5} direction='row' display='flex' alignItems='center' alignContent='center'>
                <ThemeToggleButton/>
               { roomId ? '' : <UserProfileMenu/> }
        </Stack>
    </Paper>
  )
}
