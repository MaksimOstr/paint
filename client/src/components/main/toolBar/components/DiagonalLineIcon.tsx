import React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

export const DiagonalLineIcon = () => {
  return (
    <SvgIcon viewBox="0 0 24 24">
      <line 
        x1="4" y1="20" 
        x2="20" y2="4" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </SvgIcon>
  );
}