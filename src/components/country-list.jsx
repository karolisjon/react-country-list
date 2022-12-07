import * as React from 'react';
import { Box, Container, Typography } from '@mui/material'

const CountryList = () => {
  const [countries, setCountries] = React.useState([]);

  const fetchAll = async () => {
    const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area');
    const data = await response.json();

    setCountries(data);
  }

  React.useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Container maxWidth='lg'>
      <Box>
        {countries.map(({ name, region, area, independent}) => (
          <Box sx={{
            my: 2,
            p: 2,
            backgroundColor: 'rgb(238 234 251)',
            borderRadius: 1
          }}>
            <Typography>Name: {name}</Typography>
            <Typography>Region: {region}</Typography>
            <Typography>Area: {area}</Typography>
            <Typography>Independent: {independent}</Typography>
          </Box>
        ))}
      </Box>
    </Container >
  )
}

export default CountryList;
