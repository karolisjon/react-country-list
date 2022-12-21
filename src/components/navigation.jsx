import * as React from 'react';
import { Box } from '@mui/material';

const Navigation = ({ children }) => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      {children}
    </Box>
  )
}

export default Navigation;
