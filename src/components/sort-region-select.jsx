import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import * as React from 'react';

const SortRegionSelect = ({ region, handleFilterRegion }) => {
  return (
    <FormControl sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      '&:nth-of-type(1)': { mr: 2 }
    }}>
      <Typography sx={{ mr: 1 }}>FILTER REGION</Typography>
      <Select
        variant='standard'
        value={region}
        onChange={handleFilterRegion}
        sx={{ minWidth: 140, my: 2 }}
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Africa">Africa</MenuItem>
        <MenuItem value="Americas">Americas</MenuItem>
        <MenuItem value="Antarctic">Antarctic</MenuItem>
        <MenuItem value="Antarctic Ocean">Antarctic Ocean</MenuItem>
        <MenuItem value="Asia">Asia</MenuItem>
        <MenuItem value="Europe">Europe</MenuItem>
        <MenuItem value="Oceania">Oceania</MenuItem>
        <MenuItem value="Polar">Polar</MenuItem>
      </Select>
    </FormControl>
  )
}

export default SortRegionSelect;
