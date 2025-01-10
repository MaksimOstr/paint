'use client'

import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import SettingsInputHdmiIcon from '@mui/icons-material/SettingsInputHdmi';
import { useRouter } from 'next/navigation';

export const CreateLobbyButton = () => {

  const { push } = useRouter()

  return (
    <Tooltip title = 'Create or join to a lobby.'>
        <IconButton onClick={() => push('/main/lobby')} color='secondary' size='large' sx={{ position: 'absolute', right: '30px', bottom: '30px' }}>
            <SettingsInputHdmiIcon sx={{ fontSize: '40px' }}/>
        </IconButton>
    </Tooltip>
  )
}
