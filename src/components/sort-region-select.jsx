import * as React from 'react';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';

const SortRegionSelect = ({
  pagination,
  setPagination,
  setCountries,
  fetchAll
}) => {
  const [region, setRegion] = React.useState('All');

  const fetchByRegion = async (value) => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    const region = data.filter((country) => country.region === value);

    setCountries(region);
  };

  const handleFilterRegion = (event) => {
    event.target.value === 'All' ? fetchAll({
      from: pagination.from,
      to: pagination.to
    }).then((response) => {
      setCountries(response.countries);
      setPagination({ ...pagination, count: response.count })
    })
      : fetchByRegion(event.target.value);

    setRegion(event.target.value);
  };

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
