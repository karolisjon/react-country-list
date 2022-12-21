import * as React from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const SortNameSelect = ({ sort, handleSortNameMethods }) => {

  return (
    <FormControl sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      '&:nth-of-type(1)': { mr: 2 }
    }}>
      <Typography sx={{ mr: 1 }}>SORT NAME</Typography>
      <Select
        variant='standard'
        value={sort}
        onChange={handleSortNameMethods}
        sx={{ minWidth: 140, my: 2 }}
      >
        <MenuItem value='ascendingName'>A to Z</MenuItem>
        <MenuItem value='descendingName'>Z to A</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortNameSelect;
